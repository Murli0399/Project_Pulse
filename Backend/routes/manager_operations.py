from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from datetime import datetime
from pymongo.errors import DuplicateKeyError
from modals.database import user,managers
from extra.randomPass import generate_random_string
from extra.emailSend import send_email

def welcome():
    return 'Welcome to Project Pulse!'


def get_managers():
    # Retrieve all managers from the 'managers' collection and format the response
    result = []
    for manager in managers.find():
        result.append({
            # Convert the MongoDB ObjectId to a string for JSON serialization
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



def get_manager(manager_id):
    # Find a manager by ID in the 'managers' collection and format the response
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


def create_manager():
    # Parse request JSON data to create a new manager
    data = request.json
    name = data.get('name')
    email = data.get('email')
    status = data.get('status')
    role = data.get('role')
    bio = data.get('bio')
    # Parse and format start date if available
    if 'start_date' in data and data['start_date'] is not None:
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    else:
        start_date = ""
    # Generate a random password for the new manager
    password = generate_random_string()
    
    try:
        # Insert the new manager record into the 'managers' collection
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
        
        # Prepare and send a welcome email to the new manager
        subject = "Welcome to Project Pulse! Your Login Credentials Inside"
        recipient = email
        body = f"Dear Manager,\n\nThank you for joining our team!\n\nYour login credentials are as follows:\n\nEmail: {email}\nPassword: {password}\n\nWe recommend keeping your password secure and not sharing it with anyone. If you have any questions or need further assistance, please don't hesitate to reach out to our support team.\n\nBest regards,\nProject Pulse Team"

        if send_email(subject, recipient, body):
             print("Email sent successfully")
        else:
             print("Failed to send email")

        return jsonify({'message': 'Manager created successfully', 'id': str(manager_id)}), 201

    except DuplicateKeyError as e:
        return jsonify({"message": e.details['keyValue']['email'] + ' is already registered'}), 409
 


def update_manager(manager_id):
    # Parse request JSON data to update a manager
    data = request.json
    name = data.get('name')
    email = data.get('email')
    role = data.get('role')
    bio = data.get('bio')
    start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d')
    username = data.get('username')

    # Update the manager record in the 'managers' collection
    result = managers.update_one({'_id': ObjectId(manager_id)}, {'$set': {
        'name': name,
        'email': email,
        'role': role,
        'bio': bio,
        'start_date': start_date,
        'username': username,
    }})

    # Check if the manager was updated and return the appropriate response
    if result.matched_count > 0:
        return jsonify({'message': 'Manager updated'}), 200
    return jsonify({'message': 'Manager not found'}), 404



def delete_manager(manager_id):
    # Delete a manager record from the 'managers' collection
    result = managers.delete_one({'_id': ObjectId(manager_id)})
    # Check if the manager was deleted and return the appropriate response
    if result.deleted_count > 0:
        return jsonify({'message': 'Manager deleted'}), 200
    return jsonify({'message': 'Manager not found'}), 404



def get_all_users():
    # Retrieve all users from the 'user' collection and format the response
    users = list(user.find({}))
    for u in users:
        u['_id'] = str(u['_id'])

    return jsonify(users)
