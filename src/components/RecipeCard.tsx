import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, Star } from 'lucide-react';
import { AIRecipe } from '../services/aiRecipeService';

interface RecipeCardProps {
  recipe: AIRecipe & { matchScore?: number };
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {recipe.title}
        </h3>
        {recipe.matchScore !== undefined && (
          <div className={`flex items-center gap-1 ${getMatchScoreColor(recipe.matchScore)}`}>
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">
              {Math.round(recipe.matchScore * 100)}%
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{recipe.prep_time + recipe.cook_time}min</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{recipe.servings}</span>
        </div>
        <div className="flex items-center gap-1">
          <ChefHat className="w-4 h-4" />
          <span>{recipe.cuisine}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
          {recipe.difficulty}
        </span>
        
        {recipe.nutrition && (
          <span className="text-sm text-gray-500">
            {recipe.nutrition.calories} cal
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {recipe.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
        {recipe.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
            +{recipe.tags.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeCard;