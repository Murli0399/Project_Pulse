from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from datetime import datetime
from pymongo.errors import DuplicateKeyError
from modals.database import user,managers
from extra.randomPass import generate_random_string
from extra.emailSend import send_email

def welcome():
    return 'Welcome to Project Pulse!'


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
    
    password = generate_random_string()

    try:
        manager_id = managers.insert_one({
            'name': name,
            'email': email,
            'status': status,
            'role': role,
            'bio': bio,
            'start_date': start_date,
            'username': email,
            'password': password,
        }).inserted_id

        subject = "Welcome to Project Pulse! Your Login Credentials Inside"
        recipient = email
        body = f"Dear Manager,\n\nThank you for joining our team!\n\nYour login credentials are as follows:\n\nEmail: {email}\nPassword: {password}\n\nWe recommend keeping your password secure and not sharing it with anyone. If you have any questions or need further assistance, please don't hesitate to reach out to our support team.\n\nBest regards,\nProject Pulse Team"

        if send_email(subject, recipient, body):
             print("Email sent successfully")
        else:
             print("Failed to send email")
        

        return jsonify({'message': 'Manager created successfully', 'id': str(manager_id)}), 201

    except DuplicateKeyError as e:
        return jsonify({"message": e.details['keyValue']['email']+' is already registered'}), 409  


# Update manager
def update_manager(manager_id):
    data = request.json
    name = data.get('name')
    email = data.get('email')
    role = data.get('role')
    bio = data.get('bio')
    start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d')
    username = data.get('username')

    result = managers.update_one({'_id': ObjectId(manager_id)}, {'$set': {
        'name': name,
        'email': email,
        'role': role,
        'bio': bio,
        'start_date': start_date,
        'username': username,
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