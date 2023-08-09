from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from modals.database import Authtable,managers

def login():
    # Get JSON data from the request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if username and password are provided
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # Check if user with the provided username exists in 'managers' collection
    existing_user = managers.find_one({'username': username})
    if existing_user is None:
        return jsonify({"message": "User not found. Please check your username"}), 404

    # Check if user is already logged in using 'Authtable' collection
    active_user = Authtable.find_one({'username': username})
    if active_user is not None:
        return jsonify({"message": "You are already logged in"}), 403

    # Check if provided password matches the stored password
    if existing_user['password'] == password:
        # Insert a new record in 'Authtable' to mark the user as logged in
        Authtable.insert_one({'username': username})
        return jsonify({"message": True, "uname": username, "id": str(existing_user['_id'])}), 200
    else:
        return jsonify({"message": "Incorrect password. Please try again"}), 401

    

def admin_login():
    # Get JSON data from the request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if username and password are provided
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # Check if the provided username is 'admin'
    if username != 'admin':
        return jsonify({"message": "User not found. Please check your username"}), 404

    # Check if admin is already logged in using 'Authtable' collection
    active_user = Authtable.find_one({'username': username})
    if active_user is not None:
        return jsonify({"message": "You are already logged in"}), 403

    # Check if the provided password matches the admin password
    if password == 'admin1234':
        # Insert a new record in 'Authtable' to mark admin as logged in
        Authtable.insert_one({'username': username})
        return jsonify({"message": True, "uname": username}), 200
    else:
        return jsonify({"message": "Incorrect password. Please try again"}), 401



def logout():
    # Get JSON data from the request
    data = request.get_json()
    username = data.get('username')

    # Check if username is provided
    if not username:
        return jsonify({"message": "Username is required"}), 400

    # Check if the user is logged in using 'Authtable' collection
    active_user = Authtable.find_one({'username': username})
    if active_user is None:
        return jsonify({"message": "User not logged in"}), 404

    # Remove the user's record from 'Authtable' to log them out
    Authtable.delete_one({'username': username})
    return jsonify({"message": "Logged out successfully"}), 200

