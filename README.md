# Project Pulse 
## Overview
Project Pulse is a dynamic web application designed to serve as an efficient project portfolio management system. With its comprehensive features and user-friendly interface, Project Pulse enables you to effortlessly manage and monitor your project portfolios. Stay in control of your projects by tracking progress, managing tasks, allocating resources, and collaborating with team members in real time. Experience the pulse of your projects with Project Pulse and ensure successful delivery through effective project portfolio management.


## Deployment Links
- [Backend](https://project-pulse-giib.onrender.com/)
- [Frontend](https://regal-toffee-5eb857.netlify.app/)


## Presentation Link
- [Video](https://youtu.be/s5ELVaGRDOI)


## Admin Login Credential
- Username - admin
- Password - admin1234

## Manager Login Credential
- Username - murlikhaire28
- Password - tRkchr

## Features
### User Authentication:
Securely manage access to the application with user authentication and session management.

### Project Management:
Create, update, and delete projects. Assign project managers and track project details.

### Task Management:
Organize project tasks, assign resources, and monitor progress.

### Resource Management:
Manage project resources, including availability and task assignments.

### Real-time Collaboration:
Enable real-time collaboration among team members for effective project management.

## Entity Relationship Diagrams
![Provide your Entity Relationship Diagrams here](https://github.com/Murli0399/Project_Pulse/blob/01c8f87d145643ed38f0b7ef68eb347003c5601e/img/erd.png)


## Tech Stack
### Backend:
- Language: Python
- Framework: Flask (a lightweight and flexible web framework)
- Database: MongoDB (a NoSQL database for storing the application data)
- ORM (Object-Relational Mapping): pymongo (Python library for MongoDB)
### Frontend:
- Html
- CSS
- JavaScript


## API Endpoints
### Authentication:
- POST /login
  - Description: Authenticates a user and returns a session token.
  - Request Body: JSON object containing username and password fields.
  - Response: JSON object with the session token.

- POST /admin/login
  - Description: Authenticates an admin user and returns a session token.
  - Request Body: JSON object containing username and password fields.
  - Response: JSON object with the session token.

- POST /logout
  - Description: Logs out the current user and invalidates the session token.
  - Request Body: JSON object containing a token field with the session token.
  - Response: JSON object with a success message.

### Managers:
- GET /managers
  - Description: Fetches a list of all managers.
  - Response: JSON object with a list of manager objects.

- GET /managers/{manager_id}
  - Description: Fetches a specific manager by their unique ID.
  - Response: JSON object with the manager details.

- POST /managers
  - Description: Creates a new manager.
  - Request Body: JSON object containing manager details.
  - Response: JSON object with the newly created manager details.

- PUT /managers/{manager_id}
  - Description: Updates an existing manager's details.
  - Request Body: JSON object containing updated manager details.
  - Response: JSON object with the updated manager details.

- DELETE /managers/{manager_id}
  - Description: Deletes a manager.
  - Response: JSON object with a success message.

### Projects:
- GET /projects
  - Description: Fetches a list of all projects.
  - Response: JSON object with a list of project objects.

- GET /projects/{project_id}
  - Description: Fetches a specific project by its unique ID.
  - Response: JSON object with the project details.

- GET /projects/manager/{manager_id}
  - Description: Fetches all projects managed by a specific manager.
  - Response: JSON object with a list of project objects.

- GET /projects/empty_manager
  - Description: Fetches all projects without a manager assigned.
  - Response: JSON object with a list of project objects.

- POST /projects
  - Description: Creates a new project.
  - Request Body: JSON object containing project details.
  - Response: JSON object with the newly created project details.

- PUT /projects/{project_id}
  - Description: Updates an existing project's details.
  - Request Body: JSON object containing updated project details.
  - Response: JSON object with the updated project details.

- PUT /projects/manager/{project_id}
  - Description: Assigns a manager to a project.
  - Request Body: JSON object containing manager_id.
  - Response: JSON object with a success message.

- DELETE /projects/{project_id}
  - Description: Deletes a project.
  - Response: JSON object with a success message.

### Tasks:
- GET /tasks
  - Description: Fetches a list of all tasks.
  - Response: JSON object with a list of task objects.

- GET /tasks/{task_id}
  - Description: Fetches a specific task by its unique ID.
  - Response: JSON object with the task details.

- GET /tasks/manager/{manager_id}
  - Description: Fetches all tasks managed by a specific manager.
  - Response: JSON object with a list of task objects.

- GET /tasks/project/{project_id}
  - Description: Fetches all tasks associated with a specific project.
  - Response: JSON object with a list of task objects.

- POST /tasks
  - Description: Creates a new task.
  - Request Body: JSON object containing task details.
  - Response: JSON object with the newly created task details.

- PUT /tasks/{task_id}
  - Description: Updates an existing task's details.
  - Request Body: JSON object containing updated task details.
  - Response: JSON object with the updated task details.

- DELETE /tasks/{task_id}
  - Description: Deletes a task.
  - Response: JSON object with a success message.

- PUT /tasks/resources/{resource_id}
  - Description: Assigns a resource to a task.
  - Request Body: JSON object containing task_id.
  - Response: JSON object with a success message.

### Resources:
- GET /resources
  - Description: Fetches a list of all resources.
  - Response: JSON object with a list of resource objects.

- GET /resources/{resource_id}
  - Description: Fetches a specific resource by its unique ID.
  - Response: JSON object with the resource details.

- GET /resources/task/{task_id}
  - Description: Fetches all resources associated with a specific task.
  - Response: JSON object with a list of resource objects.

- POST /resources
  - Description: Creates a new resource.
  - Request Body: JSON object containing resource details.
  - Response: JSON object with the newly created resource details.

- PUT /resources/{resource_id}
  - Description: Updates an existing resource's details.
  - Request Body: JSON object containing updated resource details.
  - Response: JSON object with the updated resource details.

- DELETE /resources/{resource_id}
  - Description: Deletes a resource.
  - Response: JSON object with a success message.

## Contributions

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **Greatly Appreciated**.

If you have any ideas on how to improve this web service, please feel free to fork the repository and submit a pull request. Your contributions, no matter how big or small, are greatly appreciated and will help to make this repository even better.

In addition to contributing to the repository, you can also connect with me for further development and collaboration on this System. Together, we can continue to improve and evolve the application to meet the needs of the community.

We encourage you to give the repository a star and we thank you for your interest in this project. 

Your support is greatly appreciated.

## 🔗 Contact Me
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://murli0399.github.io/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/murli-khaire/)


## Authors

- [Murli Khaire](https://github.com/Murli0399)

## Acknowledgements

- [Masai School](https://www.masaischool.com/)
