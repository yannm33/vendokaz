import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const PROMOTION_END_DATE_STRING = "2025-08-31T23:59:59Z"; 
const MAX_FREE_LISTINGS_PARTICULIER = 10; 
const MAX_FREE_LISTINGS_PROMO_PARTICULIER = 10;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sitePromotionEndDate] = useState(new Date(PROMOTION_END_DATE_STRING));
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const processUserData = (dbUser, promoEndDate) => {
    if (!dbUser) return null;
    
    let processedUser = { ...dbUser };
    
    if (!processedUser.avatar_url || (!processedUser.avatar_url.startsWith('http') && !processedUser.avatar_url.startsWith('data:image'))) {
      processedUser.avatar_url = `https://avatar.vercel.sh/${processedUser.auth_id?.slice(-5) || processedUser.id?.slice(-5) || 'default'}.png?text=${(processedUser.name || 'VK').substring(0,2).toUpperCase()}`;
    }
    
    const userPromoEndDate = dbUser.promotion_end_date ? new Date(dbUser.promotion_end_date) : promoEndDate;
    const isPromoStillActiveForUser = dbUser.account_type === 'particulier' && new Date() < userPromoEndDate;
    
    processedUser.promotion_active = isPromoStillActiveForUser;
    processedUser.promotion_end_date = userPromoEndDate.toISOString();

    if (processedUser.account_type === 'particulier') {
      processedUser.max_free_listings = isPromoStillActiveForUser ? MAX_FREE_LISTINGS_PROMO_PARTICULIER : MAX_FREE_LISTINGS_PARTICULIER;
    } else { 
      processedUser.max_free_listings = 0; 
      processedUser.promotion_active = false; 
    }
    return processedUser;
  };

  const fetchAndSetUser = async (authUserId) => {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', authUserId)
      .single();

    if (userError && userError.code !== 'PGRST116') { 
      console.error('Error fetching user data:', userError);
      return null;
    }
    if (userData) {
      const processed = processUserData(userData, sitePromotionEndDate);
      setUser(processed);
      return processed;
    }
    return null;
  };
  
  const createOrUpdateUserProfile = async (authUser, name, avatarUrl, accountType) => {
    const { data: existingProfile, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', authUser.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking for existing profile:', fetchError);
      return { error: "Erreur lors de la vérification du profil." };
    }

    const isPromoApplicable = accountType === 'particulier' && new Date() < sitePromotionEndDate;
    const defaultName = name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || `Utilisateur ${authUser.id.slice(0,5)}`;
    let finalAvatarUrl = avatarUrl || authUser.user_metadata?.avatar_url;
    if (!finalAvatarUrl || (!finalAvatarUrl.startsWith('http') && !finalAvatarUrl.startsWith('data:image'))) {
      finalAvatarUrl = `https://avatar.vercel.sh/${authUser.id.slice(-5)}.png?text=${(defaultName).substring(0,2).toUpperCase()}`;
    }
    
    const profileData = {
      auth_id: authUser.id,
      email: authUser.email,
      name: defaultName,
      avatar_url: finalAvatarUrl,
      account_type: accountType || 'particulier',
      promotion_active: isPromoApplicable,
      promotion_end_date: sitePromotionEndDate.toISOString(),
      max_free_listings: (accountType === 'particulier' ? (isPromoApplicable ? MAX_FREE_LISTINGS_PROMO_PARTICULIER : MAX_FREE_LISTINGS_PARTICULIER) : 0),
      favorites: existingProfile?.favorites || [],
      listings_ids: existingProfile?.listings_ids || [],
      free_listings_used: existingProfile?.free_listings_used || 0,
    };

    if (existingProfile) {
      const { data: updatedProfile, error: updateError } = await supabase
        .from('users')
        .update(profileData)
        .eq('auth_id', authUser.id)
        .select()
        .single();
      
      if (updateError) {
        console.error('Error updating user profile:', updateError);
        return { error: "Erreur lors de la mise à jour du profil." };
      }
      const processed = processUserData(updatedProfile, sitePromotionEndDate);
      setUser(processed);
      return processed;
    } else {
      const { data: newProfile, error: insertError } = await supabase
        .from('users')
        .insert(profileData)
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting new user profile:', insertError);
        if (insertError.code === '23505') { 
          return fetchAndSetUser(authUser.id);
        }
        return { error: "Erreur lors de la création du profil." };
      }
      const processed = processUserData(newProfile, sitePromotionEndDate);
      setUser(processed);
      return processed;
    }
  };

  const fetchInitialUnreadCount = async (userId) => {
    if (!userId) return 0;
    const { data, error } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('read', false)
      .neq('sender_id', userId) // Messages not sent by the current user
      .in('conversation_id', (
        supabase.from('conversations')
          .select('id')
          .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
      ).data?.map(c => c.id) || []); // Messages in user's conversations

    if (error) {
      console.error("Error fetching initial unread count:", error);
      return 0;
    }
    return data ? data.length : 0;
  };

  useEffect(() => {
    const initializeUser = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setLoading(false);
        return;
      }

      if (session?.user) {
        const userProfile = await fetchAndSetUser(session.user.id);
        if (userProfile) {
          const count = await fetchInitialUnreadCount(userProfile.id);
          setUnreadMessagesCount(count);
        }
      }
      setLoading(false);
    };

    initializeUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);
      if (event === 'SIGNED_IN' && session?.user) {
        const userProfile = await fetchAndSetUser(session.user.id);
        if (userProfile) {
          const count = await fetchInitialUnreadCount(userProfile.id);
          setUnreadMessagesCount(count);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUnreadMessagesCount(0);
      } else if (event === 'USER_UPDATED' && session?.user) {
        await fetchAndSetUser(session.user.id);
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [sitePromotionEndDate]);
  
  const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Login error:", error);
      return { error: error.message };
    }
    if (data.user) {
      const userProfile = await fetchAndSetUser(data.user.id);
      if (userProfile) {
        const count = await fetchInitialUnreadCount(userProfile.id);
        setUnreadMessagesCount(count);
      }
      return userProfile || { error: "Profil utilisateur non trouvé après connexion." };
    }
    return { error: "Utilisateur non trouvé après tentative de connexion." };
  };

  const signupUser = async (name, email, password, avatarUrl = '', accountType = 'particulier') => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          full_name: name,
          avatar_url: avatarUrl, 
        }
      }
    });

    if (authError) {
      console.error("Supabase Auth Signup error:", authError);
      if (authError.message.includes("User already registered") || authError.message.includes("already exists")) {
        return { error: "Un utilisateur avec cet email est déjà enregistré. Essayez de vous connecter." };
      }
      return { error: authError.message };
    }

    if (authData.user) {
      const profileResult = await createOrUpdateUserProfile(authData.user, name, avatarUrl, accountType);
      if (profileResult && !profileResult.error) {
        setUnreadMessagesCount(0); // New user, no unread messages
      }
      return profileResult;
    }
    return { error: "Erreur inconnue lors de l'inscription (auth)." };
  };

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
      toast({ title: "Erreur de déconnexion", description: error.message, variant: "destructive" });
    } else {
      setUser(null);
      setUnreadMessagesCount(0);
    }
  };
  
  const updateUser = async (updates) => {
    if (!user || !user.id) return;
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user:', error);
      toast({ title: "Erreur", description: "Impossible de mettre à jour le profil.", variant: "destructive" });
    } else if (updatedUser) {
      setUser(processUserData(updatedUser, sitePromotionEndDate));
    }
  };

  const addToFavorites = async (listingId) => {
    if (user && user.id && (!user.favorites || !user.favorites.includes(listingId))) {
      const updatedFavorites = [...(user.favorites || []), listingId];
      await updateUser({ favorites: updatedFavorites });
      return true;
    }
    return false;
  };

  const removeFromFavorites = async (listingId) => {
    if (user && user.id && user.favorites) {
      const updatedFavorites = user.favorites.filter(id => id !== listingId);
      await updateUser({ favorites: updatedFavorites });
    }
  };

  const isFavorite = (listingId) => {
    return user?.favorites?.includes(listingId) || false;
  };

  const getCurrentMaxFreeListings = () => {
    if (!user) { 
        return new Date() < sitePromotionEndDate ? MAX_FREE_LISTINGS_PROMO_PARTICULIER : MAX_FREE_LISTINGS_PARTICULIER;
    }
    if (user.account_type === 'professionnel') return 0;

    const userPromoEndDate = user.promotion_end_date ? new Date(user.promotion_end_date) : sitePromotionEndDate;
    const isPromoStillActiveForUser = user.promotion_active && new Date() < userPromoEndDate;
    return isPromoStillActiveForUser ? MAX_FREE_LISTINGS_PROMO_PARTICULIER : MAX_FREE_LISTINGS_PARTICULIER;
  };

  const canCreateFreeListing = () => {
    if (!user) return false;
    if (user.account_type === 'professionnel') return false;
    return (user.free_listings_used || 0) < getCurrentMaxFreeListings();
  };

  const incrementFreeListingsUsed = async () => {
    if (user && user.id && user.account_type === 'particulier') {
      await updateUser({ free_listings_used: (user.free_listings_used || 0) + 1 });
    }
  };

  const addUserListing = async (listingId) => {
    if (user && user.id) {
      const updatedListings = [...(user.listings_ids || []), listingId];
      await updateUser({ listings_ids: updatedListings });
    }
  };

  const updateUserProfile = async (profileData) => {
    if(user && user.id) {
      const newName = profileData.name || user.name;
      let newAvatarUrl = profileData.avatarUrl || user.avatar_url;

      if (newAvatarUrl && !newAvatarUrl.startsWith('http') && !newAvatarUrl.startsWith('data:image')) {
        try {
          new URL(newAvatarUrl); 
        } catch (_) { 
          newAvatarUrl = `https://avatar.vercel.sh/${user.auth_id.slice(-5)}.png?text=${newName ? newName.substring(0,2).toUpperCase() : 'VK' }`;
        }
      } else if (!newAvatarUrl) { 
         newAvatarUrl = `https://avatar.vercel.sh/${user.auth_id.slice(-5)}.png?text=${newName ? newName.substring(0,2).toUpperCase() : 'VK' }`;
      }
      
      await updateUser({
        name: newName,
        avatar_url: newAvatarUrl,
      });
    }
  };

  const isPromotionActiveForAnyone = () => {
    return new Date() < sitePromotionEndDate;
  };

  const getSitePromotionEndDate = () => {
    return sitePromotionEndDate.toISOString();
  };

  const incrementUnreadMessages = () => {
    setUnreadMessagesCount(prev => prev + 1);
  };

  const resetUnreadMessages = (count = 0) => {
    setUnreadMessagesCount(count);
  };

  const value = {
    user: user ? { ...user, unreadMessages: unreadMessagesCount } : null,
    loading,
    loginUser,
    signupUser,
    logoutUser,
    updateUser, 
    updateUserProfile, 
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    canCreateFreeListing,
    incrementFreeListingsUsed,
    addUserListing,
    getCurrentMaxFreeListings,
    isPromotionActive: () => { 
      const userPromoEndDate = user?.promotion_end_date ? new Date(user.promotion_end_date) : sitePromotionEndDate;
      return user?.account_type === 'particulier' && user?.promotion_active && new Date() < userPromoEndDate;
    },
    getPromotionEndDate: () => user?.promotion_end_date ? user.promotion_end_date : sitePromotionEndDate.toISOString(),
    isPromotionActiveForAnyone,
    getSitePromotionEndDate,
    incrementUnreadMessages,
    resetUnreadMessages,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};