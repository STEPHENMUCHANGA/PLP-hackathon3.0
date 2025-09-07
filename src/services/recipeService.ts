import { supabase } from '../lib/supabase'

export interface RecipeRequest {
  ingredients: string
  servings: number
  prepTime: number
  region: string
}

export const generateRecipe = async (request: RecipeRequest, userId?: string) => {
  const recipes = [
    `A delicious ${request.region}-style stir fry with ${request.ingredients}! Heat oil in a wok, add your ingredients with garlic and ginger, stir-fry for ${Math.min(request.prepTime, 10)} minutes, and season with soy sauce and sesame oil. Serves ${request.servings} people perfectly.`,
    
    `Try making ${request.region} pasta with ${request.ingredients} and fresh herbs. Boil pasta until al dente, sauté your ingredients with olive oil, garlic, and herbs for ${Math.min(request.prepTime, 15)} minutes, then toss everything together with parmesan cheese. Perfect for ${request.servings} servings.`,
    
    `A hearty ${request.region} soup with ${request.ingredients} would be perfect! Sauté onions and garlic, add your ingredients with vegetable or chicken broth, simmer for ${Math.min(request.prepTime, 25)} minutes, and season to taste. Serves ${request.servings} hungry people.`,
    
    `Grill some ${request.ingredients} with ${request.region} spices for a quick meal. Marinate your ingredients in olive oil, herbs, and regional spices for 30 minutes, then grill for ${Math.min(request.prepTime, 20)} minutes until perfectly cooked. Great for ${request.servings} people.`,
    
    `Create a flavorful ${request.region} curry with ${request.ingredients}. Sauté onions, add curry powder and your ingredients, simmer in coconut milk for ${Math.min(request.prepTime, 20)} minutes, and serve over rice with fresh cilantro. Feeds ${request.servings} people deliciously.`,
    
    `Make a fresh ${request.region}-inspired salad featuring ${request.ingredients}. Combine your ingredients with mixed greens, add a regional vinaigrette, top with nuts or seeds, and enjoy a healthy meal ready in ${Math.min(request.prepTime, 10)} minutes for ${request.servings} people.`
  ]

  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]

  // Save recipe to database if user is logged in
  if (userId) {
    try {
      const { error } = await supabase
        .from('recipes')
        .insert([
          {
            ingredients: request.ingredients,
            recipe: randomRecipe,
            servings: request.servings,
            prep_time: request.prepTime,
            region: request.region,
            user_id: userId,
          }
        ])

      if (error) {
        console.error('Error saving recipe:', error)
      }
    } catch (error) {
      console.error('Error saving recipe:', error)
    }
  }

  return randomRecipe
}

export const getUserRecipes = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching user recipes:', error)
    return []
  }
}