import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, ChefHat, Globe, Clock, Users, BookOpen } from 'lucide-react';
import { generateRecipe, RecipeRequest } from '../services/recipeService';
import { findMatchingRecipes, getRandomRecipes, AIRecipe } from '../services/aiRecipeService';
import { useAuth } from '../hooks/useAuth';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

const RecipeGenerator: React.FC = () => {
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState('');
  const [servings, setServings] = useState(2);
  const [prepTime, setPrepTime] = useState(30);
  const [region, setRegion] = useState('Global');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiRecipes, setAiRecipes] = useState<(AIRecipe & { matchScore?: number })[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<(AIRecipe & { matchScore?: number }) | null>(null);
  const [showingRandomRecipes, setShowingRandomRecipes] = useState(false);

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
    setAiRecipes([]);
    setRecipe('');
    setShowingRandomRecipes(false);
    
    try {
      // First, try to find matching AI recipes
      const ingredientList = ingredients.split(',').map(ing => ing.trim()).filter(ing => ing.length > 0);
      const matchingRecipes = await findMatchingRecipes(ingredientList, region);
      
      if (matchingRecipes.length > 0) {
        setAiRecipes(matchingRecipes);
      } else {
        // Fallback to simple recipe generation if no matches found
        const request: RecipeRequest = {
          ingredients,
          servings,
          prepTime,
          region,
        };
        
        const generatedRecipe = await generateRecipe(request, user?.id);
        setRecipe(generatedRecipe);
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
      alert('Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowRandomRecipes = async () => {
    setIsLoading(true);
    setRecipe('');
    setAiRecipes([]);
    
    try {
      const randomRecipes = await getRandomRecipes(6);
      setAiRecipes(randomRecipes);
      setShowingRandomRecipes(true);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      alert('Failed to load recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeClick = (recipe: AIRecipe & { matchScore?: number }) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const clearResults = () => {
    setRecipe('');
    setAiRecipes([]);
    setShowingRandomRecipes(false);
  };

  const handleGenerateRecipeOld = async () => {
    if (!ingredients.trim()) {
      alert('Please enter some ingredients!');
      return;
    }

    setIsLoading(true);
    setAiRecipes([]);
    setShowingRandomRecipes(false);
    
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerateRecipe}
                disabled={isLoading}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && !showingRandomRecipes ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Finding Recipes...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Find Recipes
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShowRandomRecipes}
                disabled={isLoading}
                className="bg-white text-orange-500 border border-orange-500 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && showingRandomRecipes ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    Browse Recipes
                  </>
                )}
              </motion.button>
            </div>
            
            {(recipe || aiRecipes.length > 0) && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearResults}
                className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Clear Results
              </motion.button>
            )}
          </div>

          {/* AI Recipe Results */}
          <AnimatePresence>
            {aiRecipes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    {showingRandomRecipes ? 'Featured Recipes' : 'Matching Recipes'}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {aiRecipes.length} recipe{aiRecipes.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={() => handleRecipeClick(recipe)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simple Recipe Result */}
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

          {!recipe && !isLoading && aiRecipes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <ChefHat className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Enter ingredients to find matching recipes, or browse our collection!</p>
            </div>
          )}
        </motion.div>
        
        {/* Recipe Modal */}
        <AnimatePresence>
          {selectedRecipe && (
            <RecipeModal
              recipe={selectedRecipe}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RecipeGenerator;