import { useState } from 'react';
import { ChefHat, Sparkles, Clock, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeGenerator from './components/RecipeGenerator';
import AuthModal from './components/AuthModal';
import Header from './components/Header';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

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

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100 py-8 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-gray-600">
            ⚡ Built with React + AI | Hackathon Project © 2025 iRecipe
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;