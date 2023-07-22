from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from modals.database import Authtable,managers

def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    existing_user = managers.find_one({'username': username})
    if existing_user is None:
        return jsonify({"message": "User not found. Please check your username"}), 404

    active_user = Authtable.find_one({'username': username})
    if active_user is not None:
        return jsonify({"message": "You are already logged in"}), 403

    if existing_user['password'] == password:
        Authtable.insert_one({'username': username})
        return jsonify({"message": "Logged in successfully!"}), 200
    else:
        return jsonify({"message": "Incorrect password. Please try again"}), 401
    


def logout():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({"message": "Username is required"}), 400

    active_user = Authtable.find_one({'username': username})
    if active_user is None:
        return jsonify({"message": "User not logged in"}), 404

    # Assuming you have a collection named 'Authtable' to store active users
    Authtable.delete_one({'username': username})
    return jsonify({"message": "Logged out successfully"}), 200
