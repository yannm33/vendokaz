import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ListingDetail from '@/pages/ListingDetail';
import CreateListingPageWrapper from '@/pages/CreateListingPage';
import FavoritesPage from '@/pages/FavoritesPage';
import MessagesPage from '@/pages/MessagesPage';
import PaymentPage from '@/pages/PaymentPage';
import UserProfilePage from '@/pages/UserProfilePage';
import AuthPage from '@/pages/AuthPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import FaqPage from '@/pages/FaqPage';
import ContactPage from '@/pages/ContactPage';
import PricingPage from '@/pages/PricingPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage.jsx';
import PaymentCancelPage from '@/pages/PaymentCancelPage.jsx';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { ListingsProvider } from '@/contexts/ListingsContext';
import { MessagesProvider } from '@/contexts/MessagesContext';
import { supabase } from '@/lib/supabaseClient';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;
  }

  if (!user) {
    return <Navigate to="/auth?mode=login&redirect=/create" replace />;
  }
  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Optionally handle unauthenticated state if needed globally
      }
    };
    checkAuth();
  }, []);

  return (
    <UserProvider>
      <ListingsProvider>
        <MessagesProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/listing/:id" element={<ListingDetail />} />
                  <Route 
                    path="/create" 
                    element={
                      <ProtectedRoute>
                        <CreateListingPageWrapper />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/favorites" element={
                     <ProtectedRoute>
                        <FavoritesPage />
                      </ProtectedRoute>
                  } />
                  <Route path="/messages" element={
                    <ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/payment/success" element={<PaymentSuccessPage />} />
                  <Route path="/payment/cancel" element={<PaymentCancelPage />} />
                  <Route path="/profile/:userId" element={<UserProfilePage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                </Routes>
              </main>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </MessagesProvider>
      </ListingsProvider>
    </UserProvider>
  );
}

export default App;