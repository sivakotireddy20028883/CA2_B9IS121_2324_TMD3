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


app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://DellUser:Shiva@localhost/Delight_Restaurant?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=True)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role
        }
        
class Menu(db.Model):
    __tablename__ = 'menu'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)
    availability = db.Column(db.Boolean, nullable=False, default=True)
    image_path = db.Column(db.String(255), nullable=True)  # Add this field

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'availability': self.availability,
            #'image_path': self.image_path  # Include image_path in the API response
        }


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    items = db.Column(db.JSON, nullable=False)  # Store menu items as JSON
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'items': self.items,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }  
        
class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    people = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date.strftime('%Y-%m-%d'),
            'time': self.time.strftime('%H:%M'),
            'people': self.people
        }

# API Routes

# Registration API
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'email' not in data or 'password' not in data:
            return jsonify({"error": "Invalid registration data"}), 400

        
        existing_user = User.query.filter((User.username == data['username']) | (User.email == data['email'])).first()
        if existing_user:
            return jsonify({"error": "Username or email already exists"}), 400

        # Create a new user
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=data['password'],  
            role=data.get('role', 'User')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully", "user": new_user.serialize()}), 201
    except Exception as e:
        return jsonify({"error": f"Failed to register user: {str(e)}"}), 500

# Menu APIs
@app.route('/api/menus', methods=['GET'])
def get_menus():
    try:
        menus = Menu.query.all()
        app.logger.debug(f"Fetched menus: {menus}")
        return jsonify([menu.serialize() for menu in menus]), 200
    except Exception as e:
        app.logger.error(f"Error in get_menus: {str(e)}")  # Logs the error
        return jsonify({"error": f"Failed to fetch menus: {str(e)}"}), 500


@app.route('/api/menu', methods=['POST'])
def create_menu():
    try:
        data = request.get_json()
        new_menu = Menu(
            name=data['name'],
            description=data.get('description'),
            price=data['price'],
            availability=data['availability']
        )
        db.session.add(new_menu)
        db.session.commit()
        return jsonify(new_menu.serialize()), 201
    except Exception as e:
        return jsonify({"error": f"Failed to create menu: {str(e)}"}), 500
    
    @app.route('/api/menu/<int:id>', methods=['DELETE'])
def delete_menu_item(id):
    try:
        menu_item = Menu.query.get(id)
        if not menu_item:
            return jsonify({"error": "Menu item not found"}), 404

        db.session.delete(menu_item)
        db.session.commit()
        return jsonify({"message": "Menu item deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to delete menu item: {str(e)}"}), 500

@app.route('/api/menu/<int:id>', methods=['PUT'])
def update_menu_item(id):
    try:
        menu_item = Menu.query.get(id)
        if not menu_item:
            return jsonify({"error": "Menu item not found"}), 404

        data = request.get_json()
        menu_item.name = data.get('name', menu_item.name)
        menu_item.description = data.get('description', menu_item.description)
        menu_item.price = data.get('price', menu_item.price)
        menu_item.availability = data.get('availability', menu_item.availability)

        db.session.commit()
        return jsonify(menu_item.serialize()), 200
    except Exception as e:
        return jsonify({"error": f"Failed to update menu item: {str(e)}"}), 500
# Order APIs
@app.route('/api/orders', methods=['POST'])
def place_order():
    try:
        data = request.get_json()
        if not data or 'items' not in data:
            return jsonify({"error": "Invalid order data. 'items' are required."}), 400

        new_order = Order(items=data['items'])
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.serialize()), 201
    except Exception as e:
        return jsonify({"error": f"Failed to place order: {str(e)}"}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        orders = Order.query.all()
        results = []
        for order in orders:
            order_items = []
            for item in order.items:  # `order.items` contains [{"id": 1, "quantity": 1}]
                menu_item = Menu.query.get(item['id'])  # Fetch the corresponding menu item
                if menu_item:
                    order_items.append({
                        "id": item["id"],
                        "name": menu_item.name,  # Add item name
                        "quantity": item["quantity"]
                    })
            results.append({
                "id": order.id,
                "items": order_items,
                "timestamp": order.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            })
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch orders: {str(e)}"}), 500

# Reservation APIs
@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    try:
        reservations = Reservation.query.all()
        return jsonify([reservation.serialize() for reservation in reservations]), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch reservations: {str(e)}"}), 500

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    try:
        data = request.get_json()
        new_reservation = Reservation(
            name=data['name'],
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            time=datetime.strptime(data['time'], '%H:%M').time(),
            people=data['people']
        )
        db.session.add(new_reservation)
        db.session.commit()
        return jsonify(new_reservation.serialize()), 201
    except Exception as e:
        return jsonify({"error": f"Failed to create reservation: {str(e)}"}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
