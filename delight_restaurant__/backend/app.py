from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Enable and configure CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Add dynamic CORS headers
@app.after_request
def add_cors_headers(response):
    origin = request.headers.get('Origin')
    if origin and "localhost" in origin:
        response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Max-Age"] = "3600"
    return response