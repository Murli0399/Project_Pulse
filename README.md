# Project Pulse Documentation
## Overview
Project Pulse is a dynamic web application designed to serve as an efficient project portfolio management system. With its comprehensive features and user-friendly interface, Project Pulse enables you to effortlessly manage and monitor your project portfolios. Stay in control of your projects by tracking progress, managing tasks, allocating resources, and collaborating with team members in real time. Experience the pulse of your projects with Project Pulse and ensure successful delivery through effective project portfolio management.

## Tech Stack
Backend:
Language: Python
Framework: Flask (a lightweight and flexible web framework)
Database: MongoDB (a NoSQL database for storing the application data)
ORM (Object-Relational Mapping): pymongo (Python library for MongoDB)
Frontend:
JavaScript library: React (for building user interfaces)
State management: Redux (for managing application state)
UI framework: Material-UI (provides pre-styled components following the Material Design guidelines)
HTTP client: Axios (for making API requests to the backend)
Entity Relationship Diagrams
[Provide your Entity Relationship Diagrams here]

API Endpoints
Authentication:
POST /login

Description: Authenticates a user and returns a session token.
Request Body: JSON object containing username and password fields.
Response: JSON object with the session token.
POST /admin/login

Description: Authenticates an admin user and returns a session token.
Request Body: JSON object containing username and password fields.
Response: JSON object with the session token.
POST /logout

Description: Logs out the current user and invalidates the session token.
Request Body: JSON object containing token field with the session token.
Response: JSON object with a success message.
Managers:
GET /managers

Description: Fetches a list of all managers.
Response: JSON object with a list of manager objects.
GET /managers/{manager_id}

Description: Fetches a specific manager by their unique ID.
Response: JSON object with the manager details.
POST /managers

Description: Creates a new manager.
Request Body: JSON object containing manager details.
Response: JSON object with the newly created manager details.
PUT /managers/{manager_id}

Description: Updates an existing manager's details.
Request Body: JSON object containing updated manager details.
Response: JSON object with the updated manager details.
DELETE /managers/{manager_id}

Description: Deletes a manager.
Response: JSON object with a success message.
Projects:
GET /projects

Description: Fetches a list of all projects.
Response: JSON object with a list of project objects.
GET /projects/{project_id}

Description: Fetches a specific project by its unique ID.
Response: JSON object with the project details.
GET /projects/manager/{manager_id}

Description: Fetches all projects managed by a specific manager.
Response: JSON object with a list of project objects.
GET /projects/empty_manager

Description: Fetches all projects without a manager assigned.
Response: JSON object with a list of project objects.
POST /projects

Description: Creates a new project.
Request Body: JSON object containing project details.
Response: JSON object with the newly created project details.
PUT /projects/{project_id}

Description: Updates an existing project's details.
Request Body: JSON object containing updated project details.
Response: JSON object with the updated project details.
PUT /projects/manager/{project_id}

Description: Assigns a manager to a project.
Request Body: JSON object containing manager_id.
Response: JSON object with a success message.
DELETE /projects/{project_id}

Description: Deletes a project.
Response: JSON object with a success message.
Tasks:
[Add API endpoints for tasks]

Resources:
[Add API endpoints for resources]

Conclusion
Project Pulse is a powerful project portfolio management system that leverages a modern tech stack to provide an efficient and user-friendly experience. With its extensive features and robust backend, managing and monitoring projects has never been easier. Use the provided API endpoints to interact with the system and build custom integrations for your specific needs. Harness the power of Project Pulse and elevate your project portfolio management to new heights. Happy managing!
