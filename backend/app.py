from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
try:
    # Use environment variable for MongoDB URI or default to localhost
    mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    client = MongoClient(mongo_uri)
    db = client['ecommerce']  # database name
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Sample products for testing
sample_products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 999.99,
        "description": "High-performance laptop",
        "category": "Electronics",
        "image_url": "https://example.com/laptop.jpg"
    },
    {
        "id": 2,
        "name": "Smartphone",
        "price": 499.99,
        "description": "Latest smartphone",
        "category": "Electronics",
        "image_url": "https://example.com/smartphone.jpg"
    }
]

# Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products or search products by query"""
    search_query = request.args.get('q', '').lower()
    
    try:
        # If using MongoDB (uncomment when database is set up)
        # products = list(db.products.find({}, {'_id': 0}))
        
        # For now, using sample data
        if search_query:
            filtered_products = [
                product for product in sample_products
                if search_query in product['name'].lower() or
                search_query in product['description'].lower()
            ]
            return jsonify(filtered_products)
        return jsonify(sample_products)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a specific product by ID"""
    try:
        # If using MongoDB (uncomment when database is set up)
        # product = db.products.find_one({'id': product_id}, {'_id': 0})
        
        # For now, using sample data
        product = next((p for p in sample_products if p['id'] == product_id), None)
        
        if product:
            return jsonify(product)
        return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 