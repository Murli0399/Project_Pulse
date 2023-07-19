from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from datetime import datetime
from modals.database import user,managers

def welcome():
    return 'Welcome to MongoDB, Mongo!'


# Get all managers
def get_managers():
    result = []
    for manager in managers.find():
        result.append({
            'id': str(manager['_id']),
            'name': manager['name'],
            'email': manager['email'],
            'status': manager['status'],
            'role': manager['role'],
            'bio': manager['bio'],
            'start_date': manager['start_date'],
            'username': manager['username'],
        })
    return jsonify(result), 200


# Get manager by ID
def get_manager(manager_id):
    manager = managers.find_one({'_id': ObjectId(manager_id)})
    if manager:
        result = {
            'id': str(manager['_id']),
            'name': manager['name'],
            'email': manager['email'],
            'status': manager['status'],
            'role': manager['role'],
            'bio': manager['bio'],
            'start_date': manager['start_date'],
            'username': manager['username'],
            'password': manager['password'],
        }
        return jsonify(result), 200
    return jsonify({'message': 'Manager not found'}), 404

# Create a new manager
def create_manager():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    status = data.get('status')
    role = data.get('role')
    bio = data.get('bio')
    if 'start_date' in data and data['start_date'] is not None:
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    else:
        start_date = ""
    
    username = data.get('username')
    password = data.get('password')

    manager_id = managers.insert_one({
        'name': name,
        'email': email,
        'status': status,
        'role': role,
        'bio': bio,
        'start_date': start_date,
        'username': username,
        'password': password,
    }).inserted_id

    return jsonify({'message': 'Manager created', 'id': str(manager_id)}), 201

# Update manager
def update_manager(manager_id):
    data = request.json
    name = data.get('name')
    email = data.get('email')
    status = data.get('status')
    role = data.get('role')
    bio = data.get('bio')
    start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d')
    username = data.get('username')
    password = data.get('password')

    result = managers.update_one({'_id': ObjectId(manager_id)}, {'$set': {
        'name': name,
        'email': email,
        'status': status,
        'role': role,
        'bio': bio,
        'start_date': start_date,
        'username': username,
        'password': password,
    }})

    if result.matched_count > 0:
        return jsonify({'message': 'Manager updated'}), 200
    return jsonify({'message': 'Manager not found'}), 404

# Delete manager
def delete_manager(manager_id):
    result = managers.delete_one({'_id': ObjectId(manager_id)})
    if result.deleted_count > 0:
        return jsonify({'message': 'Manager deleted'}), 200
    return jsonify({'message': 'Manager not found'}), 404


def get_all_users():
    users = list(user.find({}))
    for u in users:
        u['_id'] = str(u['_id'])

    return jsonify(users)