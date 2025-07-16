import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/use-toast';

const MessagesContext = createContext();

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

export const MessagesProvider = ({ children }) => {
  const { user } = useUser();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    if (!user || !user.id) {
      setConversations([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        messages (
          *,
          sender:users (id, name, avatar_url)
        )
      `)
      .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
      .order('last_message_time', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      toast({ title: "Erreur", description: "Impossible de charger les conversations.", variant: "destructive" });
    } else if (data) {
      setConversations(data.map(c => ({...c, messages: c.messages || []})));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (!user || !user.id) return;

    const conversationSubscription = supabase
      .channel('public:conversations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations', filter: `seller_id=eq.${user.id}` }, payload => {
        fetchConversations();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations', filter: `buyer_id=eq.${user.id}` }, payload => {
        fetchConversations();
      })
      .subscribe();

    const messageSubscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        // Check if the new message belongs to one of the current user's conversations
        const conversationExists = conversations.some(conv => conv.id === payload.new.conversation_id);
        if (conversationExists) {
          fetchConversations(); // Re-fetch all conversations to get updated messages and counts
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(conversationSubscription);
      supabase.removeChannel(messageSubscription);
    };
  }, [user, fetchConversations, conversations]);


  const startConversation = async (listingId, sellerId, buyerId, listingTitle) => {
    if (!user || !sellerId || !buyerId || sellerId === buyerId) {
      console.error("Invalid participants for conversation");
      return null;
    }

    // Check if conversation already exists
    const { data: existingConv, error: existingConvError } = await supabase
      .from('conversations')
      .select('*')
      .eq('listing_id', listingId)
      .eq('seller_id', sellerId)
      .eq('buyer_id', buyerId)
      .maybeSingle();

    if (existingConvError && existingConvError.code !== 'PGRST116') {
      console.error('Error checking for existing conversation:', existingConvError);
      return null;
    }
    if (existingConv) {
      return existingConv;
    }
    
    const { data: newConversation, error: insertError } = await supabase
      .from('conversations')
      .insert({
        listing_id: listingId,
        listing_title: listingTitle,
        seller_id: sellerId,
        buyer_id: buyerId,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error starting conversation:', insertError);
      toast({ title: "Erreur", description: "Impossible de démarrer la conversation.", variant: "destructive" });
      return null;
    }
    if (newConversation) {
      setConversations(prev => [newConversation, ...prev.filter(c => c.id !== newConversation.id)].sort((a,b) => new Date(b.last_message_time) - new Date(a.last_message_time)));
      return {...newConversation, messages: []};
    }
    return null;
  };

  const sendMessage = async (conversationId, senderId, content) => {
    if (!content.trim()) return null;

    const { data: newMessage, error: messageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content: content.trim(),
      })
      .select()
      .single();

    if (messageError) {
      console.error('Error sending message:', messageError);
      toast({ title: "Erreur", description: "Impossible d'envoyer le message.", variant: "destructive" });
      return null;
    }

    if (newMessage) {
      const { error: convUpdateError } = await supabase
        .from('conversations')
        .update({
          last_message: content.trim(),
          last_message_time: newMessage.timestamp,
        })
        .eq('id', conversationId);

      if (convUpdateError) {
        console.error('Error updating conversation last message:', convUpdateError);
      }
      
      // Update local state immediately
      setConversations(prevConvs => 
        prevConvs.map(conv => 
          conv.id === conversationId 
          ? { ...conv, messages: [...(conv.messages || []), newMessage], last_message: content.trim(), last_message_time: newMessage.timestamp } 
          : conv
        ).sort((a,b) => new Date(b.last_message_time) - new Date(a.last_message_time))
      );
      return newMessage;
    }
    return null;
  };

  const markConversationAsRead = async (conversationId, userId) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation || !userId) return;

    const messagesToMark = conversation.messages.filter(msg => msg.sender_id !== userId && !msg.read);
    if (messagesToMark.length === 0) return;

    const messageIdsToMark = messagesToMark.map(msg => msg.id);

    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .in('id', messageIdsToMark);

    if (error) {
      console.error('Error marking messages as read:', error);
    } else {
       setConversations(prevConvs => 
        prevConvs.map(conv => 
          conv.id === conversationId 
          ? { ...conv, messages: conv.messages.map(msg => messageIdsToMark.includes(msg.id) ? {...msg, read: true} : msg) } 
          : conv
        )
      );
    }
  };

  const getUserConversations = (userIdParam) => { // userIdParam is from context user.id
    if (!userIdParam) return [];
    return conversations
      .filter(conv => conv.seller_id === userIdParam || conv.buyer_id === userIdParam)
      .sort((a, b) => new Date(b.last_message_time) - new Date(a.last_message_time));
  };
  
  const getConversationById = (conversationId) => {
    return conversations.find(conv => conv.id === conversationId);
  };

  const getTotalUnreadCount = (userIdParam) => {
    if (!userIdParam) return 0;
    return conversations
      .filter(conv => conv.seller_id === userIdParam || conv.buyer_id === userIdParam)
      .reduce((total, conv) => {
        const unreadMessages = (conv.messages || []).filter(msg => 
          msg.sender_id !== userIdParam && !msg.read
        ).length;
        return total + unreadMessages;
      }, 0);
  };

  const value = {
    conversations,
    loading,
    startConversation,
    sendMessage,
    markConversationAsRead,
    getUserConversations,
    getConversationById,
    getTotalUnreadCount,
    refreshConversations: fetchConversations
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};