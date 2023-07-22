from flask import Flask
from flask_cors import CORS
from routes.manager_operations import (
    welcome,
    get_managers,
    get_all_users,
    get_manager,
    create_manager,
    update_manager,
    delete_manager
)
from routes.project_operations import (
    get_all_projects,
    get_project,
    create_project,
    update_project,
    get_projects_with_empty_manager,
    delete_project,
    update_project_manager
)
from routes.task_operations import (
    get_all_tasks,
    get_task,
    create_task,
    update_task,
    delete_task,
    count_tasks_by_resource
)
from routes.resource_operations import (
    get_all_resources,
    get_resource,
    create_resource,
    update_resource,
    delete_resource
)
from routes.login_logout import (
    login,
    logout
)


app = Flask(__name__)
CORS(app)

app.route("/login", methods=["POST"])(login)

app.route("/logout", methods=["POST"])(logout)


app.route("/", methods=["GET"])(welcome)
# Get all managers
app.route('/managers', methods=['GET'])(get_managers)
# Get manager by ID
app.route('/managers/<string:manager_id>', methods=['GET'])(get_manager)
# Create a new manager
app.route('/managers', methods=['POST'])(create_manager)
# Update manager
app.route('/managers/<string:manager_id>', methods=['PUT'])(update_manager)
# Delete manager
app.route('/managers/<string:manager_id>', methods=['DELETE'])(delete_manager)

# Get all projects route - Fetches a list of all projects from the database.
app.route('/projects', methods=['GET'])(get_all_projects)
# Get a single project route - Fetches a specific project by its unique project_id.
app.route('/projects/<string:project_id>', methods=['GET'])(get_project)
# Get all projects where manager is empty
app.route('/projects/empty_manager', methods=['GET'])(get_projects_with_empty_manager)
# Create a new project route - Adds a new project to the database.
app.route('/projects', methods=['POST'])(create_project)
# Update a project route - Modifies an existing project in the database.
app.route('/projects/<string:project_id>', methods=['PUT'])(update_project)
app.route('/projects/manager/<string:project_id>', methods=['PUT'])(update_project_manager)
# Delete a project route - Removes a project from the database.
app.route('/projects/<string:project_id>', methods=['DELETE'])(delete_project)

# Route for getting all tasks
app.route('/tasks', methods=['GET'])(get_all_tasks)
# Route for getting a specific task by task_id
app.route('/tasks/<string:task_id>', methods=['GET'])(get_task)
# Route for getting a specific task by task_id
app.route('/tasks/resources/<string:resource_id>', methods=['GET'])(count_tasks_by_resource)
# Route for creating a task
app.route('/tasks', methods=['POST'])(create_task)
# Route for updating a task by task_id
app.route('/tasks/<string:task_id>', methods=['PUT'])(update_task)
# Route for deleting a task by task_id
app.route('/tasks/<string:task_id>', methods=['DELETE'])(delete_task)

# Route for getting all resources
app.route('/resources', methods=['GET'])(get_all_resources)
# Route for getting a specific resource by resource_id
app.route('/resources/<string:resource_id>', methods=['GET'])(get_resource)
# Route for creating a resource
app.route('/resources', methods=['POST'])(create_resource)
# Route for updating a resource by resource_id
app.route('/resources/<string:resource_id>', methods=['PUT'])(update_resource)
# Route for deleting a resource by resource_id
app.route('/resources/<string:resource_id>', methods=['DELETE'])(delete_resource)


# for testing purpose i use this route
app.route('/user', methods=["GET"])(get_all_users)


if __name__ == '__main__':
    app.run(debug=True)