import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Send, ArrowLeft, User, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useMessages } from '@/contexts/MessagesContext';
import { useListings } from '@/contexts/ListingsContext';
import { toast } from '@/components/ui/use-toast';

const MessagesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();
  const { 
    conversations: contextConversations, 
    sendMessage, 
    markConversationAsRead, 
    getConversationById: getContextConversationById, 
    loading: messagesLoading,
    refreshConversations 
  } = useMessages();
  const { getListingById, loading: listingsLoading } = useListings();
  
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const messageContainerRef = useRef(null);

  const memoizedRefreshConversations = useCallback(() => {
    if (user) {
      refreshConversations();
    }
  }, [user, refreshConversations]);

  useEffect(() => {
    memoizedRefreshConversations();
  }, [memoizedRefreshConversations]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const conversationIdFromUrl = params.get('conversationId') || location.state?.conversationId;

    if (conversationIdFromUrl && user && contextConversations.length > 0) {
      const conversation = getContextConversationById(conversationIdFromUrl);
      if (conversation) {
        setSelectedConversation(conversation);
        markConversationAsRead(conversation.id, user.id);
        if (location.state?.conversationId) {
          navigate(location.pathname, { replace: true, state: {} });
        }
      }
    }
  }, [location.state, location.search, getContextConversationById, markConversationAsRead, user, navigate, contextConversations]);


  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (user) {
      markConversationAsRead(conversation.id, user.id);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() || !selectedConversation || !user) return;

    await sendMessage(selectedConversation.id, user.id, messageText.trim());
    setMessageText('');
    setTimeout(scrollToBottom, 100); 
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return `Hier ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays <= 7) {
      return date.toLocaleDateString('fr-FR', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const getOtherParticipantDetails = (conversation) => {
    if (!user || !conversation) return { name: 'Chargement...', avatar_url: '' };
    return conversation.otherParticipant || { name: `Utilisateur inconnu`, avatar_url: '' };
  };

  const getUnreadCount = (conversation) => {
    if (!user || !conversation || !conversation.messages) return 0;
    return conversation.messages.filter(msg => 
      msg.sender_id !== user.id && !msg.read
    ).length;
  };

  if (userLoading || messagesLoading || listingsLoading) {
    return <div className="text-center py-10 font-poppins">Chargement des messages...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex-shrink-0"
      >
        <div className="flex items-center space-x-3 mb-2">
          <MessageCircle className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Messagerie</h1>
        </div>
        <p className="text-gray-600">
          {contextConversations.length} conversation{contextConversations.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex-grow flex flex-col min-h-0">
        <div className="flex h-full min-h-0">
          <div className={`w-full md:w-2/5 lg:w-1/3 border-r border-gray-200 flex flex-col ${selectedConversation && 'hidden md:flex'}`}>
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="font-semibold text-gray-900">Conversations</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {contextConversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Aucune conversation pour le moment.</p>
                  <p className="text-sm text-gray-400 mt-1">Contactez un vendeur pour démarrer une discussion.</p>
                </div>
              ) : (
                contextConversations.map((conversation) => {
                  const listing = getListingById(conversation.listing_id);
                  const unreadCount = getUnreadCount(conversation);
                  const otherParticipant = getOtherParticipantDetails(conversation);
                  
                  return (
                    <button
                      key={conversation.id}
                      onClick={() => handleSelectConversation(conversation)}
                      className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <img 
                          src={otherParticipant.avatar_url || `https://avatar.vercel.sh/${otherParticipant.id || 'default'}.png?text=${otherParticipant.name ? otherParticipant.name.substring(0,2).toUpperCase() : 'VK'}`}
                          alt={otherParticipant.name}
                          className="w-12 h-12 rounded-full object-cover bg-gray-200 flex-shrink-0"
                          onError={(e) => { e.target.onerror = null; e.target.src=`https://avatar.vercel.sh/${otherParticipant.id || 'default'}.png?text=VK`; }}
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="font-medium text-gray-900 truncate">
                              {otherParticipant.name}
                            </p>
                            {unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                {unreadCount}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 truncate mb-1">
                            {conversation.listing_title || listing?.title || 'Annonce supprimée'}
                          </p>
                          
                          {conversation.last_message && (
                            <p className={`text-xs truncate ${unreadCount > 0 ? 'font-semibold text-gray-700' : 'text-gray-500'}`}>
                              {conversation.last_message}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className={`flex-1 flex flex-col min-h-0 ${!selectedConversation && 'hidden md:flex'}`}>
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="md:hidden p-1 hover:bg-gray-200 rounded"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <img 
                      src={getOtherParticipantDetails(selectedConversation).avatar_url || `https://avatar.vercel.sh/${getOtherParticipantDetails(selectedConversation).id || 'default'}.png?text=${getOtherParticipantDetails(selectedConversation).name ? getOtherParticipantDetails(selectedConversation).name.substring(0,2).toUpperCase() : 'VK'}`}
                      alt={getOtherParticipantDetails(selectedConversation).name}
                      className="w-10 h-10 rounded-full object-cover bg-gray-200"
                      onError={(e) => { e.target.onerror = null; e.target.src=`https://avatar.vercel.sh/${getOtherParticipantDetails(selectedConversation).id || 'default'}.png?text=VK`; }}
                    />
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {getOtherParticipantDetails(selectedConversation).name}
                      </h3>
                      <Link to={`/listing/${selectedConversation.listing_id}`} className="text-sm text-orange-600 hover:underline truncate block max-w-xs">
                        {selectedConversation.listing_title}
                      </Link>
                    </div>
                  </div>
                </div>

                <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {(selectedConversation.messages || []).length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Commencez la conversation.</p>
                      <p className="text-sm text-gray-400 mt-1">Envoyez votre premier message à {getOtherParticipantDetails(selectedConversation).name}.</p>
                    </div>
                  ) : (
                    (selectedConversation.messages || []).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2.5 rounded-2xl shadow-sm ${
                          message.sender_id === user?.id 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-br-none' 
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                          <p className={`text-xs mt-1.5 ${
                            message.sender_id === user?.id ? 'text-orange-100 text-right' : 'text-gray-500 text-left'
                          }`}>
                            {formatMessageTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                  <div className="flex space-x-3 items-center">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Tapez votre message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md"
                    />
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-5 py-3 shadow-md hover:shadow-lg transition-all" disabled={!messageText.trim()}>
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Bienvenue dans votre messagerie
                  </h3>
                  <p className="text-gray-500 max-w-sm">
                    Sélectionnez une conversation dans la liste de gauche pour afficher les messages ou contactez un vendeur depuis une annonce pour démarrer une nouvelle discussion.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;