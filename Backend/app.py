from flask import Flask
from routes.operations import (
    welcome,
    get_managers,
    get_all_users,
    get_manager,
    create_manager,
    update_manager,
    delete_manager
)

app = Flask(__name__)

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
# for testing purpose i use this route
app.route('/user', methods=["GET"])(get_all_users)


if __name__ == '__main__':
    app.run(debug=True)