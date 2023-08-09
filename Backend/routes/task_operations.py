from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError
from modals.database import tasks


def count_tasks_by_resource(resource_id):
    # Count the number of tasks associated with a specific resource
    count = tasks.count_documents({'resource_id': resource_id})
    return jsonify({"resource_id": resource_id, "task_count": count}), 200




def get_all_tasks():
    # Retrieve all tasks from the 'tasks' collection and format the response
    result = []
    for task in tasks.find():
        result.append({
            'id': str(task['_id']),
            'project_id': task['project_id'],
            'resource_id': task['resource_id'],
            'task_name': task['task_name'],
            'status': task['status'],
            'description': task['description'],
        })
    return jsonify(result), 200



def get_all_tasks_by_manager_id(manager_id):
    # Retrieve tasks by manager_id from the 'tasks' collection
    manager_tasks = tasks.find({'manager_id': manager_id})
    result = []
    for task in manager_tasks:
        result.append({
            'id': str(task['_id']),
            'project_id': task['project_id'],
            'resource_id': task['resource_id'],
            'task_name': task['task_name'],
            'status': task['status'],
            'description': task['description'],
        })
    return jsonify(result), 200



def get_all_tasks_by_project_id(project_id):
    # Retrieve tasks by project_id from the 'tasks' collection
    project_tasks = tasks.find({'project_id': project_id})
    result = []
    for task in project_tasks:
        result.append({
            'id': str(task['_id']),
            'project_id': task['project_id'],
            'resource_id': task['resource_id'],
            'task_name': task['task_name'],
            'status': task['status'],
            'description': task['description'],
        })
    return jsonify(result), 200



def get_task(task_id):
    # Find a task by ID in the 'tasks' collection and format the response
    task = tasks.find_one({'_id': ObjectId(task_id)})
    if task:
        result = {
            'id': str(task['_id']),
            'project_id': task['project_id'],
            'resource_id': task['resource_id'],
            'task_name': task['task_name'],
            'status': task['status'],
            'description': task['description'],
        }
        return jsonify(result), 200
    else:
        return jsonify({'message': 'Task not found'}), 404

    


def create_task():
    # Parse request JSON data to create a new task
    data = request.get_json()
    project_id = data.get('project_id', "")
    resource_id = data.get('resource_id', "")
    manager_id = data.get('manager_id')
    task_name = data['task_name']
    status = data['status']
    description = data['description']

    try:
        # Insert the new task record into the 'tasks' collection
        task_id = tasks.insert_one({
            'project_id': project_id,
            'resource_id': resource_id,
            'manager_id': manager_id,
            'task_name': task_name,
            'status': status,
            'description': description,
        }).inserted_id
        
        # Return a success message and the task ID
        task_name = task_name  # Replace with the actual task name
        message = f"Task '{task_name}' has been successfully created."
        return jsonify({'message': message, 'id': str(task_id)}), 201
    
    except DuplicateKeyError as e:
        # Handle the case when the task name is already registered
        error_msg = "Error: Task name is already registered. Please choose a different task name."
        return jsonify({'error': error_msg}), 409  # HTTP status code 409 for Conflict

    


def update_task(task_id):
    # Parse request JSON data to update a task
    data = request.get_json()
    task_name = data['task_name']
    status = data['status']
    description = data['description']

    # Update the task record with the new information
    updated_task = tasks.update_one(
        {'_id': ObjectId(task_id)},
        {'$set': {
            'task_name': task_name,
            'status': status,
            'description': description,
        }}
    )

    # Check if the task was updated and return the appropriate response
    if updated_task.modified_count > 0:
        return jsonify({'message': 'Task updated'}), 200
    else:
        return jsonify({'message': 'Task not found'}), 404

    


def delete_task(task_id):
    # Delete a task record from the 'tasks' collection
    deleted_task = tasks.delete_one({'_id': ObjectId(task_id)})
    # Check if the task was deleted and return the appropriate response
    if deleted_task.deleted_count > 0:
        return jsonify({'message': 'Task deleted'}), 200
    else:
        return jsonify({'message': 'Task not found'}), 404
