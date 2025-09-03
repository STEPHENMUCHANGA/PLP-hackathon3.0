import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, ChefHat, Globe, Clock, Users } from 'lucide-react';
import { generateRecipe, RecipeRequest } from '../services/recipeService';
import { useAuth } from '../hooks/useAuth';

const RecipeGenerator: React.FC = () => {
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState('');
  const [servings, setServings] = useState(2);
  const [prepTime, setPrepTime] = useState(30);
  const [region, setRegion] = useState('Global');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const regions = [
    { value: 'Global', label: '🌍 Global', flag: '🌍' },
    { value: 'Italian', label: '🇮🇹 Italian', flag: '🇮🇹' },
    { value: 'Asian', label: '🥢 Asian', flag: '🥢' },
    { value: 'Mexican', label: '🌮 Mexican', flag: '🌮' },
    { value: 'Indian', label: '🇮🇳 Indian', flag: '🇮🇳' },
    { value: 'Mediterranean', label: '🫒 Mediterranean', flag: '🫒' },
    { value: 'African', label: '🌍 African', flag: '🌍' },
  ];

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      alert('Please enter some ingredients!');
      return;
    }

    setIsLoading(true);
    
    try {
      const request: RecipeRequest = {
        ingredients,
        servings,
        prepTime,
        region,
      };
      
      const generatedRecipe = await generateRecipe(request, user?.id);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      alert('Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerateRecipe();
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

          <div className="space-y-6 mb-8">
            {/* Ingredients Input */}
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. chicken, tomatoes, rice, garlic"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            
            {/* Recipe Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Users className="w-4 h-4" />
                  Servings
                </label>
                <select
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="w-4 h-4" />
                  Prep Time
                </label>
                <select
                  value={prepTime}
                  onChange={(e) => setPrepTime(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Globe className="w-4 h-4" />
                  Cuisine
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  {regions.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateRecipe}
              disabled={isLoading}
              className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {servings} {servings === 1 ? 'serving' : 'servings'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {prepTime} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {region}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{recipe}</p>
                {user && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">✅ Recipe saved to your collection!</p>
                  </div>
                )}
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