from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from datetime import datetime
from pymongo.errors import DuplicateKeyError
from modals.database import projects

def get_all_projects():
    # Retrieve all projects from the 'projects' collection and format the response
    result = []
    for project in projects.find():
        result.append({
            'id': str(project['_id']),
            'manager_id': project['manager_id'],
            'project_name': project['project_name'],
            'status': project['status'],
            'start_date': project['start_date'],
            'end_date': project['end_date'],
        })
    return jsonify(result), 200


def get_projects_with_empty_manager():
    # Retrieve projects where manager_id is an empty string ('Not Assigned')
    empty_manager_projects = projects.find({'manager_id': 'Not Assigned'})

    result = []
    for project in empty_manager_projects:
        result.append({
            'id': str(project['_id']),
            'project_name': project['project_name'],
            'status': project['status'],
            'start_date': project['start_date'],
            'end_date': project['end_date'],
        })

    return jsonify(result), 200


def get_projects_by_manager_id(manager_id):
    # Retrieve projects by manager_id from the 'projects' collection
    empty_manager_projects = projects.find({'manager_id': manager_id})

    result = []
    for project in empty_manager_projects:
        result.append({
            'id': str(project['_id']),
            'project_name': project['project_name'],
            'status': project['status'],
            'start_date': project['start_date'],
            'end_date': project['end_date'],
        })

    return jsonify(result), 200



def get_project(project_id):
    # Find a project by ID in the 'projects' collection and format the response
    project = projects.find_one({'_id': ObjectId(project_id)})
    if project:
        result = {
            'id': str(project['_id']),
            'manager_id': project['manager_id'],
            'project_name': project['project_name'],
            'status': project['status'],
            'start_date': project['start_date'],
            'end_date': project['end_date'],
        }
        return jsonify(result), 200
    else:
        return jsonify({'message': 'Project not found'}), 404




def create_project():
    # Parse request JSON data to create a new project
    data = request.get_json()
    manager_id = data.get('manager_id', 'Not Assigned')
    project_name = data['project_name']
    status = data['status']
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')

    try:
        # Insert the new project record into the 'projects' collection
        project_id = projects.insert_one({
            'manager_id': manager_id,
            'project_name': project_name,
            'status': status,
            'start_date': start_date,
            'end_date': end_date,
        }).inserted_id
        
        # Return a success message and the project ID
        project_name = project_name  # Replace with the actual project name
        message = f"Congratulations! The project '{project_name}' has been successfully created."
        return jsonify({'message': message, 'id': str(project_id)}), 201
    
    except DuplicateKeyError as e:
        # Handle the case when the project name is already registered
        error_msg = "Error: Project name is already registered. Please choose a different project name."
        return jsonify({'message': error_msg}), 409  # HTTP status code 409 for Conflict



def update_project_manager(project_id):
    # Parse request JSON data to update the project manager
    data = request.get_json()
    manager_id = data['manager_id']

    # Update the manager_id field of the project record
    updated_project = projects.update_one(
        {'_id': ObjectId(project_id)},
        {'$set': {'manager_id': manager_id}}
    )

    # Check if the project was updated and return the appropriate response
    if updated_project.modified_count > 0:
        return jsonify({'message': 'Project assign successful'}), 200
    else:
        return jsonify({'message': 'Project not found'}), 404




def update_project(project_id):
    # Parse request JSON data to update a project
    data = request.get_json()
    manager_id = data['manager_id']
    project_name = data['project_name']
    status = data['status']
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')

    # Update the project record with the new information
    updated_project = projects.update_one(
        {'_id': ObjectId(project_id)},
        {'$set': {
            'manager_id': manager_id,
            'project_name': project_name,
            'status': status,
            'start_date': start_date,
            'end_date': end_date,
        }}
    )

    # Check if the project was updated and return the appropriate response
    if updated_project.modified_count > 0:
        return jsonify({'message': 'Project updated successfully'}), 200
    else:
        return jsonify({'message': 'Project not found or no changes were made'}), 404





def delete_project(project_id):
    # Delete a project record from the 'projects' collection
    deleted_project = projects.delete_one({'_id': ObjectId(project_id)})
    # Check if the project was deleted and return the appropriate response
    if deleted_project.deleted_count > 0:
        return jsonify({'message': 'Project deleted'}), 200
    else:
        return jsonify({'message': 'Project not found'}),
