# Project_Pulse

**Project Pulse** is a dynamic web application designed to serve as an efficient project portfolio management system. With its comprehensive features and user-friendly interface, Project Pulse enables you to effortlessly manage and monitor your project portfolios. Stay in control of your projects by tracking progress, managing tasks, allocating resources, and collaborating with team members in real time. Experience the pulse of your projects with Project Pulse and ensure successful delivery through effective project portfolio management.


## Portfolio Manager Endpoints:

### Create a Portfolio Manager:
```
Method: POST
URL: /api/portfolio-managers
Description: Creates a new portfolio manager.
Request Body: { "name": "John Doe", "status": "Active", "role": "Administrator", "bio": "Lorem ipsum dolor sit amet.", "start_date": "2022-01-01" }
```

### Get all Portfolio Managers:
```
Method: GET
URL: /api/portfolio-managers
Description: Retrieves a list of all portfolio managers.
```

### Get a specific Portfolio Manager:
```
Method: GET
URL: /api/portfolio-managers/:id
Description: Retrieves a specific portfolio manager by ID.
```

### Update a Portfolio Manager:
```
Method: PUT
URL: /api/portfolio-managers/:id
Description: Updates the details of a specific portfolio manager by ID.
Request Body: { "name": "Updated Name", "status": "Inactive", "role": "Viewer", "bio": "Updated bio", "start_date": "2022-01-01" }
```

### Delete a Portfolio Manager:
```
Method: DELETE
URL: /api/portfolio-managers/:id
Description: Deletes a specific portfolio manager by ID.
```

## Project Endpoints:

### Create a Project:
```
Method: POST
URL: /api/projects
Description: Creates a new project.
Request Body: { "portfolio_manager_id": "<portfolio_manager_id>", "project_name": "Project 1", "status": "Planned", "start_date": "2022-02-01", "end_date": "2022-05-01" }
```

### Get all Projects:
```
Method: GET
URL: /api/projects
Description: Retrieves a list of all projects.
```

### Get a specific Project:
```
Method: GET
URL: /api/projects/:id
Description: Retrieves a specific project by ID.
```

### Update a Project:
```
Method: PUT
URL: /api/projects/:id
Description: Updates the details of a specific project by ID.
Request Body: { "portfolio_manager_id": "<portfolio_manager_id>", "project_name": "Updated Project Name", "status": "In Progress", "start_date": "2022-02-01", "end_date": "2022-06-01" }
```

### Delete a Project:
```
Method: DELETE
URL: /api/projects/:id
Description: Deletes a specific project by ID.
```

## Task Endpoints:

### Create a Task:
```
Method: POST
URL: /api/tasks
Description: Creates a new task.
Request Body: { "project_id": "<project_id>", "status": "To Do" }
```

### Get all Tasks:
```
Method: GET
URL: /api/tasks
Description: Retrieves a list of all tasks.
```

### Get a specific Task:
```
Method: GET
URL: /api/tasks/:id
Description: Retrieves a specific task by ID.
```

### Update a Task:
```
Method: PUT
URL: /api/tasks/:id
Description: Updates the details of a specific task by ID.
Request Body: { "project_id": "<project_id>", "status": "In Progress" }
```

### Delete a Task:
```
Method: DELETE
URL: /api/tasks/:id
Description: Deletes a specific task by ID.
```

## Resource Endpoints:

### Create a Resource:
```
Method: POST
URL: /api/resources
Description: Creates a new resource.
Request Body: { "task_id": "<task_id>", "resource_name": "Resource 1" }
```

### Get all Resources:
```
Method: GET
URL: /api/resources
Description: Retrieves a list of all resources.
```

### Get a specific Resource:
```
Method: GET
URL: /api/resources/:id
Description: Retrieves a specific resource by ID.
```
### Update a Resource:
```
Method: PUT
URL: /api/resources/:id
Description: Updates the details of a specific resource by ID.
Request Body: { "task_id": "<task_id>", "resource_name": "Updated Resource Name" }
```

### Delete a Resource:
```
Method: DELETE
URL: /api/resources/:id
Description: Deletes a specific resource by ID.
```


