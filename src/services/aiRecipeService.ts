import { supabase } from '../lib/supabase'

export interface AIRecipe {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
  prep_time: number
  cook_time: number
  servings: number
  cuisine: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  nutrition?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  created_at: string
}

// AI-generated recipe database
const AI_RECIPES: Omit<AIRecipe, 'id' | 'created_at'>[] = [
  {
    title: "Mediterranean Chicken & Rice Bowl",
    ingredients: ["chicken breast", "rice", "tomatoes", "olive oil", "garlic", "lemon", "oregano", "feta cheese"],
    instructions: [
      "Season chicken breast with salt, pepper, and oregano",
      "Heat olive oil in a large skillet over medium-high heat",
      "Cook chicken for 6-7 minutes per side until golden and cooked through",
      "Meanwhile, cook rice according to package instructions",
      "Dice tomatoes and mince garlic",
      "In the same skillet, sauté garlic for 30 seconds",
      "Add tomatoes and cook for 3-4 minutes",
      "Slice chicken and serve over rice",
      "Top with tomato mixture, crumbled feta, and lemon juice"
    ],
    prep_time: 15,
    cook_time: 25,
    servings: 4,
    cuisine: "Mediterranean",
    difficulty: "Easy",
    tags: ["healthy", "protein-rich", "one-pan", "gluten-free"],
    nutrition: { calories: 420, protein: 35, carbs: 45, fat: 12 }
  },
  {
    title: "Creamy Garlic Pasta",
    ingredients: ["pasta", "garlic", "cream", "parmesan", "butter", "black pepper", "parsley"],
    instructions: [
      "Cook pasta according to package directions until al dente",
      "Reserve 1 cup pasta water before draining",
      "In a large skillet, melt butter over medium heat",
      "Add minced garlic and cook for 1 minute until fragrant",
      "Pour in cream and simmer for 2-3 minutes",
      "Add drained pasta to the skillet",
      "Toss with parmesan cheese and pasta water as needed",
      "Season with black pepper and garnish with fresh parsley"
    ],
    prep_time: 10,
    cook_time: 15,
    servings: 4,
    cuisine: "Italian",
    difficulty: "Easy",
    tags: ["comfort-food", "vegetarian", "quick", "creamy"],
    nutrition: { calories: 380, protein: 12, carbs: 52, fat: 14 }
  },
  {
    title: "Asian Stir-Fry Vegetables",
    ingredients: ["broccoli", "carrots", "bell peppers", "soy sauce", "ginger", "garlic", "sesame oil", "rice"],
    instructions: [
      "Cut all vegetables into bite-sized pieces",
      "Cook rice according to package instructions",
      "Heat sesame oil in a wok or large skillet over high heat",
      "Add minced garlic and ginger, stir-fry for 30 seconds",
      "Add carrots first, stir-fry for 2 minutes",
      "Add bell peppers and broccoli, stir-fry for 3-4 minutes",
      "Add soy sauce and toss everything together",
      "Serve immediately over steamed rice"
    ],
    prep_time: 15,
    cook_time: 10,
    servings: 3,
    cuisine: "Asian",
    difficulty: "Easy",
    tags: ["vegetarian", "healthy", "quick", "colorful"],
    nutrition: { calories: 220, protein: 8, carbs: 42, fat: 4 }
  },
  {
    title: "Mexican Black Bean Tacos",
    ingredients: ["black beans", "tortillas", "avocado", "lime", "cilantro", "onion", "cumin", "chili powder"],
    instructions: [
      "Drain and rinse black beans",
      "Heat beans in a saucepan with cumin and chili powder",
      "Warm tortillas in a dry skillet or microwave",
      "Dice onion and slice avocado",
      "Mash half the beans for texture",
      "Fill tortillas with bean mixture",
      "Top with diced onion, avocado slices, and cilantro",
      "Squeeze lime juice over tacos before serving"
    ],
    prep_time: 10,
    cook_time: 8,
    servings: 4,
    cuisine: "Mexican",
    difficulty: "Easy",
    tags: ["vegetarian", "vegan-option", "fiber-rich", "budget-friendly"],
    nutrition: { calories: 280, protein: 12, carbs: 48, fat: 8 }
  },
  {
    title: "Indian Curry Lentils",
    ingredients: ["lentils", "onion", "tomatoes", "ginger", "garlic", "curry powder", "coconut milk", "rice"],
    instructions: [
      "Rinse lentils and cook in boiling water for 15-20 minutes until tender",
      "Meanwhile, dice onion and tomatoes",
      "Heat oil in a large pot over medium heat",
      "Sauté onion until translucent, about 5 minutes",
      "Add minced garlic and ginger, cook for 1 minute",
      "Add curry powder and cook for 30 seconds until fragrant",
      "Add tomatoes and cook until they break down, about 8 minutes",
      "Stir in cooked lentils and coconut milk",
      "Simmer for 10 minutes and serve over rice"
    ],
    prep_time: 15,
    cook_time: 35,
    servings: 6,
    cuisine: "Indian",
    difficulty: "Medium",
    tags: ["vegetarian", "protein-rich", "spicy", "comfort-food"],
    nutrition: { calories: 320, protein: 18, carbs: 52, fat: 6 }
  },
  {
    title: "African Peanut Stew",
    ingredients: ["sweet potatoes", "peanut butter", "tomatoes", "onion", "spinach", "vegetable broth", "ginger", "chili flakes"],
    instructions: [
      "Peel and cube sweet potatoes",
      "Dice onion and tomatoes",
      "Heat oil in a large pot over medium heat",
      "Sauté onion until soft, about 5 minutes",
      "Add minced ginger and chili flakes, cook for 1 minute",
      "Add sweet potatoes and tomatoes",
      "Stir in peanut butter and vegetable broth",
      "Bring to a boil, then simmer for 20 minutes",
      "Add spinach in the last 5 minutes of cooking",
      "Season with salt and pepper to taste"
    ],
    prep_time: 20,
    cook_time: 30,
    servings: 5,
    cuisine: "African",
    difficulty: "Medium",
    tags: ["vegetarian", "hearty", "nutritious", "one-pot"],
    nutrition: { calories: 290, protein: 12, carbs: 35, fat: 14 }
  },
  {
    title: "Classic Beef Stir-Fry",
    ingredients: ["beef", "broccoli", "soy sauce", "garlic", "ginger", "cornstarch", "rice", "sesame oil"],
    instructions: [
      "Slice beef thinly against the grain",
      "Marinate beef with soy sauce and cornstarch for 15 minutes",
      "Cut broccoli into florets",
      "Cook rice according to package instructions",
      "Heat oil in a wok over high heat",
      "Stir-fry beef for 2-3 minutes until browned",
      "Remove beef and set aside",
      "Add broccoli to wok and stir-fry for 3 minutes",
      "Return beef to wok with garlic and ginger",
      "Add soy sauce and sesame oil, toss everything together",
      "Serve immediately over rice"
    ],
    prep_time: 20,
    cook_time: 10,
    servings: 4,
    cuisine: "Asian",
    difficulty: "Medium",
    tags: ["protein-rich", "quick", "balanced", "savory"],
    nutrition: { calories: 380, protein: 28, carbs: 35, fat: 12 }
  },
  {
    title: "Mediterranean Quinoa Salad",
    ingredients: ["quinoa", "cucumber", "tomatoes", "feta cheese", "olive oil", "lemon", "olives", "red onion"],
    instructions: [
      "Cook quinoa according to package instructions and let cool",
      "Dice cucumber, tomatoes, and red onion",
      "Crumble feta cheese",
      "In a large bowl, combine cooled quinoa with vegetables",
      "Add olives and feta cheese",
      "Whisk together olive oil and lemon juice",
      "Pour dressing over salad and toss well",
      "Let marinate for 30 minutes before serving",
      "Serve chilled or at room temperature"
    ],
    prep_time: 25,
    cook_time: 15,
    servings: 6,
    cuisine: "Mediterranean",
    difficulty: "Easy",
    tags: ["healthy", "vegetarian", "make-ahead", "fresh"],
    nutrition: { calories: 240, protein: 8, carbs: 32, fat: 10 }
  }
]

export const initializeRecipeDatabase = async () => {
  try {
    // Check if recipes already exist
    const { data: existingRecipes, error: checkError } = await supabase
      .from('ai_recipes')
      .select('id')
      .limit(1)

    if (checkError) {
      console.error('Error checking existing recipes:', checkError)
      return
    }

    // If recipes already exist, don't reinitialize
    if (existingRecipes && existingRecipes.length > 0) {
      console.log('Recipe database already initialized')
      return
    }

    // Insert AI-generated recipes
    const { error } = await supabase
      .from('ai_recipes')
      .insert(AI_RECIPES.map(recipe => ({
        ...recipe,
        ingredients: JSON.stringify(recipe.ingredients),
        instructions: JSON.stringify(recipe.instructions),
        tags: JSON.stringify(recipe.tags),
        nutrition: recipe.nutrition ? JSON.stringify(recipe.nutrition) : null
      })))

    if (error) {
      console.error('Error initializing recipe database:', error)
    } else {
      console.log('Recipe database initialized successfully')
    }
  } catch (error) {
    console.error('Error initializing recipe database:', error)
  }
}

export const findMatchingRecipes = async (userIngredients: string[], cuisine?: string) => {
  try {
    let query = supabase.from('ai_recipes').select('*')
    
    if (cuisine && cuisine !== 'Global') {
      query = query.eq('cuisine', cuisine)
    }

    const { data: recipes, error } = await query

    if (error) throw error

    if (!recipes) return []

    // Parse JSON fields and calculate match scores
    const parsedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      instructions: JSON.parse(recipe.instructions),
      tags: JSON.parse(recipe.tags),
      nutrition: recipe.nutrition ? JSON.parse(recipe.nutrition) : null
    }))

    // Calculate match scores based on ingredient overlap
    const recipesWithScores = parsedRecipes.map(recipe => {
      const recipeIngredients = recipe.ingredients.map((ing: string) => ing.toLowerCase())
      const userIngredientsLower = userIngredients.map(ing => ing.toLowerCase().trim())
      
      let matchCount = 0
      userIngredientsLower.forEach(userIng => {
        if (recipeIngredients.some(recipeIng => 
          recipeIng.includes(userIng) || userIng.includes(recipeIng)
        )) {
          matchCount++
        }
      })

      const matchScore = matchCount / Math.max(userIngredients.length, 1)
      return { ...recipe, matchScore }
    })

    // Sort by match score (highest first) and return top matches
    return recipesWithScores
      .filter(recipe => recipe.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5)

  } catch (error) {
    console.error('Error finding matching recipes:', error)
    return []
  }
}

export const getRandomRecipes = async (limit: number = 3) => {
  try {
    const { data: recipes, error } = await supabase
      .from('ai_recipes')
      .select('*')
      .limit(limit * 2) // Get more than needed for randomization

    if (error) throw error
    if (!recipes) return []

    // Parse JSON fields
    const parsedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      instructions: JSON.parse(recipe.instructions),
      tags: JSON.parse(recipe.tags),
      nutrition: recipe.nutrition ? JSON.parse(recipe.nutrition) : null
    }))

    // Shuffle and return limited results
    const shuffled = parsedRecipes.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, limit)

  } catch (error) {
    console.error('Error getting random recipes:', error)
    return []
  }
}