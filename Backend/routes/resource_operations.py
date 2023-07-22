from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError
from modals.database import resources



def get_all_resources():
    result = []
    for resource in resources.find():
        result.append({
            'id': str(resource['_id']),
            'task_id': resource['task_id'],
            'resource_name': resource['resource_name'],
            'type': resource['type'],
            'link': resource['link'],
            'availability': resource['availability'],
        })
    return jsonify(result), 200



def get_resource(resource_id):
    resource = resources.find_one({'_id': ObjectId(resource_id)})
    if resource:
        result = {
            'id': str(resource['_id']),
            'task_id': resource['task_id'],
            'resource_name': resource['resource_name'],
            'type': resource['type'],
            'link': resource['link'],
            'availability': resource['availability'],
        }
        return jsonify(result), 200
    else:
        return jsonify({'message': 'Resource not found'}), 404
    


def create_resource():
    data = request.get_json()
    task_id = data.get('task_id', "")
    resource_name = data['resource_name']
    resource_type = data['type']
    link = data['link']
    availability = data['availability']

    # Perform validation and error handling as needed

    try:
        resource_id = resources.insert_one({
            'task_id': task_id,
            'resource_name': resource_name,
            'type': resource_type,
            'link':link,
            'availability': availability,
        }).inserted_id

        resource_name = resource_name  # Replace with the actual resource name
        message = f"Resource '{resource_name}' has been successfully created."
        return jsonify({'message': message, 'id': str(resource_id)}), 201

    except DuplicateKeyError as e:
        # Handle the case when the index already exists
        error_msg = "Error: Resource name is already registered. Please choose a different resource name."
        return jsonify({'error': error_msg}), 409  # HTTP status code 409 for Conflict
    


def update_resource(resource_id):
    data = request.get_json()
    task_id = data.get('task_id', "")
    resource_name = data['resource_name']
    resource_type = data['type']
    link = data['link']
    availability = data['availability']

    # Perform validation and error handling as needed

    updated_resource = resources.update_one(
        {'_id': ObjectId(resource_id)},
        {'$set': {
            'task_id': task_id,
            'resource_name': resource_name,
            'type': resource_type,
            'link':link,
            'availability': availability,
        }}
    )

    if updated_resource.modified_count > 0:
        return jsonify({'message': 'Resource updated'}), 200
    else:
        return jsonify({'message': 'Resource not found'}), 404
    


def delete_resource(resource_id):
    deleted_resource = resources.delete_one({'_id': ObjectId(resource_id)})
    if deleted_resource.deleted_count > 0:
        return jsonify({'message': 'Resource deleted'}), 200
    else:
        return jsonify({'message': 'Resource not found'}), 404