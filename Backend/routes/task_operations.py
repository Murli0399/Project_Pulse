from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError
from modals.database import tasks


def count_tasks_by_resource(resource_id):
    count = tasks.count_documents({'resource_id': resource_id})
    return jsonify({"resource_id": resource_id, "task_count": count}), 200



def get_all_tasks():
    result = []
    for task in tasks.find():
        result.append({
            'id': str(task['_id']),
            'project_id': task['project_id'],
            'resource_id': task['resource_id'],
            'task_name': task['task_name'],
            'status': task['status'],
        })
    return jsonify(result), 200



def get_task(task_id):
    task = tasks.find_one({'_id': ObjectId(task_id)})
    if task:
        result = {
            'id': str(task['_id']),
            'project_id': task['project_id'],
            'resource_id': task['resource_id'],
            'task_name': task['task_name'],
            'status': task['status'],
        }
        return jsonify(result), 200
    else:
        return jsonify({'message': 'Task not found'}), 404
    


def create_task():
    data = request.get_json()
    project_id = data.get('project_id', "")
    resource_id = data.get('resource_id', "")
    task_name = data['task_name']
    status = data['status']

    # Perform validation and error handling as needed

    try:
        task_id = tasks.insert_one({
            'project_id': project_id,
            'resource_id': resource_id,
            'task_name': task_name,
            'status': status,
        }).inserted_id

        task_name = task_name  # Replace with the actual task name
        message = f"Task '{task_name}' has been successfully created."
        return jsonify({'message': message, 'id': str(task_id)}), 201

    except DuplicateKeyError as e:
        # Handle the case when the index already exists
        error_msg = "Error: Task name is already registered. Please choose a different task name."
        return jsonify({'error': error_msg}), 409  # HTTP status code 409 for Conflict
    


def update_task(task_id):
    data = request.get_json()
    project_id = data.get('project_id', "")
    resource_id = data.get('resource_id', "")
    task_name = data['task_name']
    status = data['status']

    # Perform validation and error handling as needed

    updated_task = tasks.update_one(
        {'_id': ObjectId(task_id)},
        {'$set': {
            'project_id': project_id,
            'resource_id': resource_id,
            'task_name': task_name,
            'status': status,
        }}
    )

    if updated_task.modified_count > 0:
        return jsonify({'message': 'Task updated'}), 200
    else:
        return jsonify({'message': 'Task not found'}), 404
    


def delete_task(task_id):
    deleted_task = tasks.delete_one({'_id': ObjectId(task_id)})
    if deleted_task.deleted_count > 0:
        return jsonify({'message': 'Task deleted'}), 200
    else:
        return jsonify({'message': 'Task not found'}), 404