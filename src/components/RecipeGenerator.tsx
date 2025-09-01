import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

const RecipeGenerator: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const recipes = [
    "With {ingredients}, you can make a delicious stir fry! Heat oil in a wok, add your ingredients with garlic and ginger, stir-fry for 5-7 minutes, and season with soy sauce and sesame oil.",
    "Try making pasta with {ingredients} and herbs. Boil pasta until al dente, sauté your ingredients with olive oil, garlic, and fresh herbs, then toss everything together with parmesan cheese.",
    "A hearty soup with {ingredients} would be perfect for dinner. Sauté onions and garlic, add your ingredients with vegetable or chicken broth, simmer for 20 minutes, and season to taste.",
    "Grill some {ingredients} with spices for a quick meal. Marinate your ingredients in olive oil, herbs, and spices for 30 minutes, then grill until perfectly cooked and serve with a fresh salad.",
    "Create a flavorful curry with {ingredients}. Sauté onions, add curry powder and your ingredients, simmer in coconut milk for 15 minutes, and serve over rice with fresh cilantro.",
    "Make a fresh salad featuring {ingredients}. Combine your ingredients with mixed greens, add a simple vinaigrette, top with nuts or seeds, and enjoy a healthy, refreshing meal."
  ];

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      alert('Please enter some ingredients!');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const personalizedRecipe = randomRecipe.replace('{ingredients}', ingredients);
    
    setRecipe(personalizedRecipe);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateRecipe();
    }
  };

  return (
    <section id="recipes" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Recipe Generator</h2>
            <p className="text-gray-600">What ingredients do you have available?</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. chicken, tomatoes, rice, garlic"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateRecipe}
              disabled={isLoading}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Recipe
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {recipe && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  Your Suggested Recipe
                </h3>
                <p className="text-gray-700 leading-relaxed">{recipe}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!recipe && !isLoading && (
            <div className="text-center py-12 text-gray-500">
              <ChefHat className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your personalized recipe will appear here...</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeGenerator;