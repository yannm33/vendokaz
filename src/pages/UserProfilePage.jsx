import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Eye, Clock, User as UserIcon, Edit3, PlusCircle, Save, XCircle, UploadCloud, LogOut, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useListings } from '@/contexts/ListingsContext';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const UserProfileCard = ({ profileUser, isCurrentUserProfile, isEditing, editFormData, handleInputChange, handleAvatarFileChange, avatarPreview, startEditing, cancelEditing, saveProfile, isLoading }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden"
  >
    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full filter blur-xl"></div>
    <div className="absolute -bottom-16 -left-10 w-60 h-60 bg-white/5 rounded-full filter blur-lg"></div>
    
    <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
      <div className="relative flex-shrink-0">
        <img
          src={isEditing ? (avatarPreview || editFormData.avatar_url || profileUser?.avatar_url) : (profileUser?.avatar_url || `https://avatar.vercel.sh/${profileUser?.id}.png?text=${profileUser?.name ? profileUser.name.substring(0,2).toUpperCase() : 'VK'}`)}
          alt={profileUser?.name || 'Avatar utilisateur'}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg bg-white"
          onError={(e) => { e.target.onerror = null; e.target.src=`https://avatar.vercel.sh/${profileUser?.id}.png?text=${profileUser?.name ? profileUser.name.substring(0,2).toUpperCase() : 'VK' }`; }}
        />
        {isEditing && (
          <label htmlFor="avatarFile" className="absolute bottom-0 right-0 bg-white text-orange-500 p-2.5 rounded-full cursor-pointer shadow-md hover:bg-orange-100 transition-colors">
            <UploadCloud size={20} />
            <input type="file" id="avatarFile" accept="image/*" className="hidden" onChange={handleAvatarFileChange} disabled={isLoading} />
          </label>
        )}
      </div>

      <div className="flex-grow text-center sm:text-left">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleInputChange}
              className="text-3xl sm:text-4xl font-bold bg-transparent border-b-2 border-white/50 placeholder-white/70 focus:outline-none focus:border-white mb-3 w-full py-1"
              placeholder="Votre nom"
              disabled={isLoading}
            />
            <input
              type="url"
              name="avatar_url"
              value={editFormData.avatar_url.startsWith('data:image') ? '' : editFormData.avatar_url}
              onChange={handleInputChange}
              className="text-sm bg-transparent border-b border-white/30 placeholder-white/50 focus:outline-none focus:border-white w-full py-1 mb-4"
              placeholder="URL de l'avatar (optionnel)"
              disabled={isLoading}
            />
            <div className="flex space-x-3 justify-center sm:justify-start">
              <Button onClick={saveProfile} variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50 px-5 py-2.5" disabled={isLoading}>
                <Save size={18} className="mr-2" /> {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
              <Button onClick={cancelEditing} variant="ghost" className="text-white hover:bg-white/20 px-5 py-2.5" disabled={isLoading}>
                <XCircle size={18} className="mr-2" /> Annuler
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{profileUser?.name || 'Utilisateur VendOkaz'}</h1>
            <p className="text-lg opacity-90 mb-1">{profileUser?.email}</p>
            <p className="text-sm opacity-80 capitalize">Compte {profileUser?.account_type || 'Non spécifié'}</p>
            {isCurrentUserProfile && (
              <Button onClick={startEditing} variant="outline" className="mt-6 bg-white/20 border-white/50 text-white hover:bg-white/30 px-6 py-2.5 backdrop-blur-sm">
                <Edit3 size={18} className="mr-2.5" /> Modifier le profil
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  </motion.div>
);

const UserListingsGrid = ({ listings, isLoading }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="mt-12"
  >
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mes annonces ({listings.length})</h2>
    {isLoading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-pulse">
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    ) : listings.length === 0 ? (
      <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
        <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Aucune annonce publiée pour le moment.</p>
        <Button asChild variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
          <Link to="/create">
            <PlusCircle size={20} className="mr-2" /> Déposer une annonce
          </Link>
        </Button>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Link key={listing.id} to={`/listing/${listing.id}`} className="block group">
            <div className="listing-card bg-white transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
              <div className="relative">
                <img
                  src={listing.images && listing.images.length > 0 ? listing.images[0] : "https://images.unsplash.com/photo-1595872018818-97555653a011"}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://images.unsplash.com/photo-1595872018818-97555653a011"; }}
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2.5 py-1 rounded-md text-sm font-semibold backdrop-blur-sm">
                  {listing.price ? `${listing.price} €` : 'Gratuit'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1.5 line-clamp-2 h-12">
                  {listing.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-orange-400" />
                  {listing.location || 'Non spécifié'}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {new Date(listing.created_at).toLocaleDateString('fr-FR')}</span>
                  <span className="flex items-center"><Eye className="w-3 h-3 mr-1" /> {listing.views || 0}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </motion.div>
);


const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, updateUserProfile: updateUserContextProfile, logoutUser, loading: userLoading } = useUser();
  const { allListings: allListingsFromContext, loading: listingsLoading } = useListings();

  const [profileUser, setProfileUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', avatar_url: '' });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setPageLoading(true);
      if (!userId) {
        navigate('/');
        return;
      }

      const { data: userData, error: userFetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userFetchError || !userData) {
        console.error('Error fetching profile user:', userFetchError);
        toast({ title: "Erreur", description: "Profil utilisateur introuvable.", variant: "destructive" });
        navigate('/');
        setPageLoading(false);
        return;
      }
      
      setProfileUser(userData);
      
      if (currentUser && currentUser.id === userData.id) {
        setIsCurrentUserProfile(true);
        setEditFormData({ name: userData.name || '', avatar_url: userData.avatar_url || '' });
        setAvatarPreview(userData.avatar_url || '');
      } else {
        setIsCurrentUserProfile(false);
      }
      
      // Fetch listings for this profileUser
      if (userData.listings_ids && userData.listings_ids.length > 0 && allListingsFromContext.length > 0) {
        const filteredUserListings = allListingsFromContext.filter(listing => userData.listings_ids.includes(listing.id));
        setUserListings(filteredUserListings);
      } else {
        setUserListings([]);
      }
      setPageLoading(false);
    };

    if (!userLoading && !listingsLoading) {
        fetchProfileData();
    }

  }, [userId, currentUser, userLoading, listingsLoading, allListingsFromContext, navigate]);
  
  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
     if (e.target.name === 'avatar_url') {
      setAvatarPreview(e.target.value);
    }
  };
  
  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({ title: "Fichier trop volumineux", description: "L'avatar ne doit pas dépasser 2MB.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setEditFormData(prev => ({ ...prev, avatar_url: reader.result })); // Store as base64 data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditing = () => {
    if (profileUser) {
      setEditFormData({ name: profileUser.name || '', avatar_url: profileUser.avatar_url || '' });
      setAvatarPreview(profileUser.avatar_url || '');
    }
    setIsEditing(true);
  };
  const cancelEditing = () => {
    setIsEditing(false);
    if (profileUser) {
      setAvatarPreview(profileUser.avatar_url || '');
    }
  };

  const saveProfile = async () => {
    if (!editFormData.name.trim()) {
      toast({ title: "Nom requis", description: "Veuillez entrer un nom.", variant: "destructive" });
      return;
    }
    setIsSavingProfile(true);
    
    let finalAvatarUrl = editFormData.avatar_url;

    // If avatar_url is a data URL (newly uploaded file), upload it to Supabase Storage
    if (finalAvatarUrl && finalAvatarUrl.startsWith('data:image')) {
        try {
            const base64String = finalAvatarUrl.split(',')[1];
            const fileExt = finalAvatarUrl.substring(finalAvatarUrl.indexOf('/') + 1, finalAvatarUrl.indexOf(';base64'));
            const fileName = `avatar-${currentUser.id}-${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('avatars')
              .upload(filePath, Uint8Array.from(atob(base64String), c => c.charCodeAt(0)), {
                  contentType: `image/${fileExt}`,
                  upsert: true, // Overwrite if exists for simplicity, consider unique names always
              });

            if (uploadError) {
                throw uploadError;
            }
            
            // Get public URL for the uploaded file
            const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
            finalAvatarUrl = urlData.publicUrl;

        } catch (error) {
            console.error('Error uploading avatar:', error);
            toast({ title: "Erreur d'upload Avatar", description: error.message || "Impossible de téléverser l'avatar.", variant: "destructive" });
            setIsSavingProfile(false);
            return;
        }
    }

    await updateUserContextProfile({
      name: editFormData.name.trim(),
      avatarUrl: finalAvatarUrl, // Send Supabase Storage URL or existing URL
    });

    setProfileUser(prev => ({ ...prev, name: editFormData.name.trim(), avatar_url: finalAvatarUrl }));
    setIsSavingProfile(false);
    setIsEditing(false);
    toast({ title: "Profil mis à jour", description: "Vos informations ont été sauvegardées.", className: "bg-green-500 text-white" });
  };
  
  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
    toast({ title: "Déconnexion", description: "Vous avez été déconnecté." });
  };


  if (pageLoading || userLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-500">
          <UserIcon className="w-12 h-12 mx-auto mb-4 animate-pulse text-orange-300" />
          Chargement du profil...
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <UserIcon className="w-16 h-16 mx-auto mb-4 text-red-400" />
        <h1 className="text-2xl font-bold text-gray-800">Profil introuvable</h1>
        <p className="text-gray-600 mt-2">Désolé, l'utilisateur que vous cherchez n'existe pas.</p>
        <Button asChild className="mt-6 btn-primary">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <UserProfileCard 
        profileUser={profileUser}
        isCurrentUserProfile={isCurrentUserProfile}
        isEditing={isEditing}
        editFormData={editFormData}
        handleInputChange={handleInputChange}
        handleAvatarFileChange={handleAvatarFileChange}
        avatarPreview={avatarPreview}
        startEditing={startEditing}
        cancelEditing={cancelEditing}
        saveProfile={saveProfile}
        isLoading={isSavingProfile}
      />

      {isCurrentUserProfile && (
        <div className="mt-6 flex justify-end">
          <Button onClick={handleLogout} variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut size={18} className="mr-2"/> Se déconnecter
          </Button>
        </div>
      )}
      
      <UserListingsGrid listings={userListings} isLoading={listingsLoading} />
    </div>
  );
};

export default UserProfilePage;