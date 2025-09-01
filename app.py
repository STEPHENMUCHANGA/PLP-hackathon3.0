from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Dummy recipe generator (replace with AI/OpenAI API calls if needed)
def generate_recipe(ingredients):
    recipes = [
        f"With {ingredients}, you can make a delicious stir fry!",
        f"Try making pasta with {ingredients} and herbs.",
        f"A hearty soup with {ingredients} would be perfect for dinner.",
        f"Grill some {ingredients} with spices for a quick meal."
    ]
    return random.choice(recipes)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_recipe', methods=['POST'])
def get_recipe():
    data = request.get_json()
    ingredients = data.get('ingredients', '')
    if not ingredients:
        return jsonify({'error': 'No ingredients provided'}), 400
    recipe = generate_recipe(ingredients)
    return jsonify({'recipe': recipe})

if __name__ == '__main__':
    app.run(debug=True)
