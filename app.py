from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, session
import sqlite3
import random
import datetime

app = Flask(__name__)
app.secret_key = "your_secret_key"

DB_NAME = "irecipe.db"

# Initialize DB
def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT,
                        email TEXT UNIQUE,
                        password TEXT)''')
        c.execute('''CREATE TABLE IF NOT EXISTS recipes (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        ingredients TEXT,
                        recipe TEXT,
                        user_id INTEGER)''')
        c.execute('''CREATE TABLE IF NOT EXISTS transactions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        amount REAL,
                        txn_id TEXT,
                        status TEXT,
                        timestamp TEXT)''')
    print("Database initialized.")

# Dummy recipe generator
def generate_recipe(ingredients, servings, prep_time, region):
    recipes = [
        f"A {region}-style stir fry with {ingredients}, ready in {prep_time} minutes for {servings} servings.",
        f"Traditional {region} soup using {ingredients}, serves {servings}, ready in {prep_time} minutes.",
        f"Quick {region} pasta dish with {ingredients}, done in {prep_time} minutes.",
        f"Hearty {region} rice bowl featuring {ingredients}, {servings} servings in {prep_time} minutes."
    ]
    return random.choice(recipes)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        try:
            c.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, password))
            conn.commit()
            flash("Signup successful! Please log in.", "success")
            return redirect(url_for('index'))
        except sqlite3.IntegrityError:
            flash("Email already exists. Please try logging in.", "error")
            return redirect(url_for('index'))

@app.route('/signin', methods=['POST'])
def signin():
    email = request.form['email']
    password = request.form['password']
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE email=? AND password=?", (email, password))
        user = c.fetchone()
        if user:
            session['user_id'] = user[0]
            flash("Login successful!", "success")
        else:
            flash("Invalid credentials. Try again.", "error")
    return redirect(url_for('index'))

@app.route('/get_recipe', methods=['POST'])
def get_recipe():
    data = request.get_json()
    ingredients = data.get('ingredients', '')
    servings = data.get('servings', '1')
    prep_time = data.get('prepTime', '30')
    region = data.get('region', 'Global')

    if not ingredients:
        return jsonify({'error': 'No ingredients provided'}), 400

    recipe = generate_recipe(ingredients, servings, prep_time, region)

    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("INSERT INTO recipes (ingredients, recipe, user_id) VALUES (?, ?, ?)", 
                  (ingredients, recipe, session.get('user_id')))
        conn.commit()

    return jsonify({'recipe': recipe})

@app.route('/pay', methods=['POST'])
def pay():
    # Placeholder IntaSend integration (test mode)
    amount = request.json.get("amount", 1.0)
    txn_id = f"TEST-{random.randint(1000,9999)}"
    status = "SUCCESS"

    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("INSERT INTO transactions (amount, txn_id, status, timestamp) VALUES (?, ?, ?, ?)",
                  (amount, txn_id, status, datetime.datetime.now().isoformat()))
        conn.commit()

    return jsonify({"message": "Test payment successful", "txn_id": txn_id, "status": status})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
