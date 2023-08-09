from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError
from modals.database import resources



def get_all_resources():
    # Retrieve all resources from the 'resources' collection and format the response
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


def get_all_resources_by_task_id(task_id):
    # Retrieve resources by task_id from the 'resources' collection
    task_resources = resources.find({'task_id': task_id})
    result = []
    for resource in task_resources:
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
    # Find a resource by ID in the 'resources' collection and format the response
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
    # Parse request JSON data to create a new resource
    data = request.get_json()
    task_id = data.get('task_id', "")
    resource_name = data['resource_name']
    resource_type = data['type']
    link = data['link']
    availability = data['availability']

    try:
        # Insert the new resource record into the 'resources' collection
        resource_id = resources.insert_one({
            'task_id': task_id,
            'resource_name': resource_name,
            'type': resource_type,
            'link': link,
            'availability': availability,
        }).inserted_id
        
        # Return a success message and the resource ID
        resource_name = resource_name  # Replace with the actual resource name
        message = f"Resource '{resource_name}' has been successfully created."
        return jsonify({'message': message, 'id': str(resource_id)}), 201
    
    except DuplicateKeyError as e:
        # Handle the case when the resource name is already registered
        error_msg = "Error: Resource name is already registered. Please choose a different resource name."
        return jsonify({'error': error_msg}), 409  # HTTP status code 409 for Conflict

    


def update_resource(resource_id):
    # Parse request JSON data to update a resource
    data = request.get_json()
    resource_name = data['resource_name']
    resource_type = data['type']
    link = data['link']
    availability = data['availability']

    # Update the resource record with the new information
    updated_resource = resources.update_one(
        {'_id': ObjectId(resource_id)},
        {'$set': {
            'resource_name': resource_name,
            'type': resource_type,
            'link': link,
            'availability': availability,
        }}
    )

    # Check if the resource was updated and return the appropriate response
    if updated_resource.modified_count > 0:
        return jsonify({'message': 'Resource updated'}), 200
    else:
        return jsonify({'message': 'Resource not found'}), 404

    


def delete_resource(resource_id):
    # Delete a resource record from the 'resources' collection
    deleted_resource = resources.delete_one({'_id': ObjectId(resource_id)})
    # Check if the resource was deleted and return the appropriate response
    if deleted_resource.deleted_count > 0:
        return jsonify({'message': 'Resource deleted'}), 200
    else:
        return jsonify({'message': 'Resource not found'}), 404
