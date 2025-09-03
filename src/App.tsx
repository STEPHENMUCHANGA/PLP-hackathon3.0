import { useState } from 'react';
import { ChefHat, Sparkles, Clock, Users, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeGenerator from './components/RecipeGenerator';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth';

function App() {
  const { loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-12 h-12 mx-auto text-orange-500 mb-4 animate-pulse" />
          <p className="text-gray-600">Loading iRecipe...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header onOpenAuth={openAuth} />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <ChefHat className="w-16 h-16 mx-auto text-orange-500 mb-4" />
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Turn Ingredients into 
              <span className="text-orange-500"> Instant Recipes</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your ingredients, and let iRecipe cook up something special for you with AI-powered suggestions.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
              <Sparkles className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">Smart recipe suggestions based on your available ingredients</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">Get recipe ideas in seconds, no more wondering what to cook</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
              <Users className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">For Everyone</h3>
              <p className="text-gray-600 text-sm">Perfect for beginners and experienced cooks alike</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Recipe Generator */}
      <RecipeGenerator />

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal 
            mode={authMode} 
            onClose={() => setShowAuthModal(false)} 
          />
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal onClose={() => setShowPaymentModal(false)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100 py-8 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPaymentModal(true)}
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              <Heart className="w-5 h-5" />
              Support SDG 2: Zero Hunger
            </motion.button>
            <p className="text-gray-600">
            ⚡ Built with React + AI | Hackathon Project © 2025 iRecipe
            </p>
            <p className="text-sm text-gray-500">
              🌱 Supporting sustainable food systems and ending hunger worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;