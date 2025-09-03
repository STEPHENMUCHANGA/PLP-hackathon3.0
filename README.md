# iRecipe - AI Recipe Generator

Turn ingredients into instant recipes with AI-powered suggestions.

## Features

✅ **Smart Recipe Generation**: AI-powered recipe suggestions based on available ingredients
✅ **User Authentication**: Secure signup and login flow with success messages  
✅ **Recipe Customization**: Region-based recipes with servings & prep time options
✅ **Recipe History**: Save and view your generated recipes (when logged in)
✅ **Payment Integration**: Support SDG 2: Zero Hunger with test payment system
✅ **Responsive Design**: Beautiful, mobile-friendly interface with smooth animations

## Supported Cuisines

- 🌍 Global
- 🇮🇹 Italian  
- 🥢 Asian
- 🌮 Mexican
- 🇮🇳 Indian
- 🫒 Mediterranean
- 🌍 African

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Test integration (IntaSend placeholder)
- **Hosting**: Bolt Hosting

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase (click "Connect to Supabase" in Bolt)
4. Start development server: `npm run dev`

## Database Schema

### Users Table
- `id` (uuid, primary key)
- `name` (text)
- `email` (text, unique)
- `created_at` (timestamp)

### Recipes Table  
- `id` (uuid, primary key)
- `ingredients` (text)
- `recipe` (text)
- `servings` (integer)
- `prep_time` (integer)
- `region` (text)
- `user_id` (uuid, foreign key)
- `created_at` (timestamp)

### Transactions Table
- `id` (uuid, primary key)
- `amount` (decimal)
- `txn_id` (text)
- `status` (text)
- `user_id` (uuid, foreign key)
- `created_at` (timestamp)

## Supporting SDG 2: Zero Hunger

This project supports the UN Sustainable Development Goal 2: Zero Hunger by:
- Helping people make the most of available ingredients
- Reducing food waste through creative recipe suggestions
- Supporting food security initiatives through donations

## License

MIT License - Built for educational and humanitarian purposes.</parameter>