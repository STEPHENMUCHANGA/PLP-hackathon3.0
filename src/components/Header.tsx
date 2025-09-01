import React from 'react';
import { ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAuth }) => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-orange-100"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChefHat className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">iRecipe</h1>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <a href="#home" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Home
            </a>
            <a href="#recipes" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Recipes
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenAuth('signin')}
              className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenAuth('signup')}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;