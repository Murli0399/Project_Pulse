const key = "projectPulseUser";
let currentUser = JSON.parse(localStorage.getItem(key));

if (currentUser == undefined || currentUser.role == "Admin") {
  window.location.href = "index.html";
}
const url = "https://project-pulse-giib.onrender.com/";
// const url = "http://127.0.0.1:5000/";


fetch(url + "managers/" + currentUser.id)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").innerText = data.name;
  })
  .catch((error) => console.log(error));

document.getElementById("logoutManager").addEventListener("click", () => {
  const data = {
    username: currentUser.uname,
  };
  // Replace 'your_login_endpoint' with the actual login endpoint URL
  fetch(url + "logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the data retrieved from the server after a successful login
      // Redirect the user to the dashboard or perform any other actions as needed
      localStorage.removeItem(key);
      window.location.href = "index.html";
      alert(data.message);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error);
      // Show an error message or perform any other error handling as needed
    });
});
// ----------------------------------------------------

let showData = document.getElementById("showData");

document
  .getElementById("projectData")
  .addEventListener("click", get_all_projects);

function get_all_projects() {
  fetch(url + "projects/manager/" + currentUser.id)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Handle the data retrieved from the server
      // console.log(data);
      displayProjects(data); // Output the list of managers
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error);
    });
}

function dataChange(originalDateString) {
  // const originalDateString = "Sat, 22 Jul 2023 00:00:00 GMT";
  const originalDate = new Date(originalDateString);
  const formattedDate = originalDate.toISOString().split("T")[0];
  return formattedDate; // Output: "2023-07-22"
}

let projectId = "";

function updateProjectByManager(project_id) {
  projectId = project_id;
  document.getElementById("id02").style.display = "block";
  fetch(url + "projects/" + project_id)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // Get form input values
      document.getElementById("projectName").value = data.project_name;
      document.getElementById("projectStatus").value = data.status;
      document.getElementById("projectStartDate").value = dataChange(
        data.start_date
      );
      document.getElementById("projectEndDate").value = dataChange(
        data.end_date
      );
    })
    .catch((error) => console.log(error));
}

// Function to handle form submission
function updateProjectForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form input values
  const projectName = document.getElementById("projectName").value;
  const projectStatus = document.getElementById("projectStatus").value;
  const projectStartDate = document.getElementById("projectStartDate").value;
  const projectEndDate = document.getElementById("projectEndDate").value;
  // Create a data object to send to the server
  const data = {
    manager_id: currentUser.id,
    project_name: projectName,
    status: projectStatus,
    start_date: projectStartDate,
    end_date: projectEndDate,
  };

  // Perform the form submission using Fetch API or any other method
  fetch(url + "projects/" + projectId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data from the server
      alert(data["message"]);
      document.getElementById("id02").style.display = "none";
      document.getElementById("projectForm").reset();
      get_all_projects();
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
}

// Add event listener to the form's submit event
const projectForm = document.getElementById("projectForm");
projectForm.addEventListener("submit", updateProjectForm);

function displayProjects(data) {
  console.log(data);
  showData.innerHTML = null;
  data.forEach((element, index) => {
    let cartDiv = document.createElement("div");
    cartDiv.setAttribute("class", "card");

    let item_1 = document.createElement("h2");
    item_1.append(element.project_name);

    let item_2 = document.createElement("div");
    item_2.setAttribute("class", "data");
    let p1 = document.createElement("p");
    p1.setAttribute("class", "ass");
    p1.innerText = "Status : ";
    let p2 = document.createElement("p");
    p2.innerText = element.status;
    item_2.append(p1, p2);

    let item_3 = document.createElement("div");
    item_3.setAttribute("class", "data");
    let p3 = document.createElement("p");
    p3.setAttribute("class", "ass");
    p3.innerText = "Start Date : ";
    let p4 = document.createElement("p");
    if (element.start_date == "") {
      p4.innerText = "None";
    } else {
      let date = element.start_date.split(" ");
      p4.innerText = date[1] + " " + date[2] + " " + date[3];
    }
    item_3.append(p3, p4);

    let item_4 = document.createElement("div");
    item_4.setAttribute("class", "data");
    let p5 = document.createElement("p");
    p5.setAttribute("class", "ass");
    p5.innerText = "Status : ";
    let p6 = document.createElement("p");
    if (element.end_date == "") {
      p6.innerText = "None";
    } else {
      let date = element.end_date.split(" ");
      p6.innerText = date[1] + " " + date[2] + " " + date[3];
    }
    item_4.append(p5, p6);

    let item_5 = document.createElement("div");
    item_5.setAttribute("class", "data");
    let updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateBtn.addEventListener("click", function () {
      updateProjectByManager(element.id);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    let name = element.project_name;
    deleteBtn.addEventListener("click", () => {
      fetch(url + "projects/" + element.id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // If the response is successful, parse the response as JSON
        })
        .then((data) => {
          // Handle the data retrieved from the server after the delete operation
          alert(name + " deleted successfully");
          get_all_projects();
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    item_5.append(updateBtn, deleteBtn);

    let item_6 = document.createElement("div");
    item_6.setAttribute("class", "data");
    let viewTask = document.createElement("button");
    viewTask.innerText = "View Task";
    viewTask.addEventListener("click", () => {
      fetch(url + "tasks/project/" + element.id)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          // Handle the data retrieved from the server
          // console.log(data);
          displayTasks(data); // Output the list of managers
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    let addTask = document.createElement("button");
    addTask.innerText = "Add Task";
    addTask.addEventListener("click", () => {
      // addNewTask(element.id);
      projectId = element.id;
      document.getElementById("id03").style.display = "block";
    });

    item_6.append(viewTask, addTask);

    cartDiv.append(item_1, item_2, item_3, item_4, item_5, item_6);
    showData.append(cartDiv);
  });
}

get_all_projects();

// ------------------------------------------------------------

document.getElementById("taskData").addEventListener("click", get_all_task);

function get_all_task() {
  fetch(url + "tasks/manager/" + currentUser.id)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Handle the data retrieved from the server
      // console.log(data);
      displayTasks(data); // Output the list of managers
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error);
    });
}

function addTaskForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form input values
  const taskName = document.getElementById("taskName").value;
  const taskStatus = document.getElementById("taskStatus").value;
  const description = document.getElementById("description").value;
  // Create a data object to send to the server
  const data = {
    project_id: projectId,
    resource_id: "",
    manager_id: currentUser.id,
    task_name: taskName,
    status: taskStatus,
    description: description,
  };

  // Perform the form submission using Fetch API or any other method
  fetch(url + "tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data from the server
      alert(data["message"]);
      document.getElementById("id03").style.display = "none";
      document.getElementById("addTaskForm").reset();
      get_all_task();
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
}

// Add event listener to the form's submit event
const taskForm = document.getElementById("addTaskForm");
taskForm.addEventListener("submit", addTaskForm);

let taskId = "";
function updateTaskByManager(task_id) {
  taskId = task_id;
  document.getElementById("id04").style.display = "block";
  fetch(url + "tasks/" + task_id)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("updateTaskName").value = data.task_name;
      document.getElementById("updateTaskStatus").value = data.status;
      document.getElementById("updateDescription").value = data.description;
    })
    .catch((error) => console.log(error));
}

// Function to handle form submission
function updateTaskFormFunction(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form input values
  const taskName = document.getElementById("updateTaskName").value;
  const taskStatus = document.getElementById("updateTaskStatus").value;
  const description = document.getElementById("updateDescription").value;
  // Create a data object to send to the server
  const data = {
    task_name: taskName,
    status: taskStatus,
    description: description,
  };

  // Perform the form submission using Fetch API or any other method
  fetch(url + "tasks/" + taskId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data from the server
      alert(data["message"]);
      document.getElementById("id04").style.display = "none";
      document.getElementById("updateTaskForm").reset();
      get_all_task();
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
}

// Add event listener to the form's submit event
const updateTaskForm = document.getElementById("updateTaskForm");
updateTaskForm.addEventListener("submit", updateTaskFormFunction);

function displayTasks(data) {
  console.log(data);
  showData.innerHTML = null;
  data.forEach((element, index) => {
    let cartDiv = document.createElement("div");
    cartDiv.setAttribute("class", "taskCard");

    let item_1 = document.createElement("h2");
    item_1.append(element.task_name);

    let item_2 = document.createElement("div");
    item_2.setAttribute("class", "data");
    let p1 = document.createElement("p");
    p1.setAttribute("class", "ass");
    p1.innerText = "Status : ";
    let p2 = document.createElement("p");
    p2.innerText = element.status;
    item_2.append(p1, p2);

    let item_3 = document.createElement("p");
    item_3.append("Description : " + element.description);

    let item_4 = document.createElement("div");
    item_4.setAttribute("class", "data");
    let updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateBtn.addEventListener("click", () => {
      updateTaskByManager(element.id);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    let name = element.task_name;
    deleteBtn.addEventListener("click", () => {
      fetch(url + "tasks/" + element.id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // If the response is successful, parse the response as JSON
        })
        .then((data) => {
          // Handle the data retrieved from the server after the delete operation
          alert(name + " deleted successfully");
          get_all_task();
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    item_4.append(updateBtn, deleteBtn);

    let item_5 = document.createElement("div");
    item_5.setAttribute("class", "data");
    let viewResource = document.createElement("button");
    viewResource.innerText = "View Resource";
    viewResource.addEventListener("click", () => {
      fetch(url + "resources/task/" + element.id)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          // Handle the data retrieved from the server
          // console.log(data);
          displayResources(data); // Output the list of managers
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    let addResource = document.createElement("button");
    addResource.innerText = "Add Resource";
    addResource.addEventListener("click", () => {
      taskId = element.id;
      document.getElementById("id05").style.display = "block";
    });

    item_5.append(viewResource, addResource);

    cartDiv.append(item_1, item_2, item_3, item_4, item_5);
    showData.append(cartDiv);
  });
}

// // Function to handle form submission
function addResourceForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form input values
  const resourceName = document.getElementById("resourceName").value;
  const resourceType = document.getElementById("resourceType").value;
  const resourceLink = document.getElementById("resourceLink").value;
  const resourceAvailability = document.getElementById(
    "resourceAvailability"
  ).value;
  // Create a data object to send to the server
  const data = {
    task_id: taskId,
    resource_name: resourceName,
    type: resourceType,
    link: resourceLink,
    availability: resourceAvailability,
  };

  // Perform the form submission using Fetch API or any other method
  fetch(url + "resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data from the server
      alert(data["message"]);
      document.getElementById("id05").style.display = "none";
      document.getElementById("resourceForm").reset();
      get_all_resources();
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
}

// Add event listener to the form's submit event
const resourceForm = document.getElementById("resourceForm");
resourceForm.addEventListener("submit", addResourceForm);
// -------------------------------------------------------------------

document
  .getElementById("resourceData")
  .addEventListener("click", get_all_resources);

function get_all_resources() {
  fetch(url + "resources")
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Handle the data retrieved from the server
      // console.log(data);
      displayResources(data); // Output the list of managers
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error);
    });
}

let resourceId = "";

function updateResourceFormFunction(event) {
  event.preventDefault(); // Prevent the default form submission
  // Get form input values
  const resourceName = document.getElementById("updateResourceName").value;
  const resourceType = document.getElementById("updateResourceType").value;
  const resourceLink = document.getElementById("updateResourceLink").value;
  const resourceAvailability = document.getElementById(
    "updateResourceAvailability"
  ).value;
  // Create a data object to send to the server
  const data = {
    resource_name: resourceName,
    type: resourceType,
    link: resourceLink,
    availability: resourceAvailability,
  };
  // Perform the form submission using Fetch API or any other method
  fetch(url + "resources/" + resourceId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data from the server
      alert(data["message"]);
      document.getElementById("id06").style.display = "none";
      document.getElementById("updateResourceForm").reset();
      get_all_resources();
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
}

const updateResourceForm = document.getElementById("updateResourceForm");
updateResourceForm.addEventListener("submit", updateResourceFormFunction);

function displayResources(data) {
  console.log(data);
  showData.innerHTML = null;
  data.forEach((element, index) => {
    let cartDiv = document.createElement("div");
    cartDiv.setAttribute("class", "resourceCard");

    let item_1 = document.createElement("h2");
    item_1.append(element.resource_name);

    let item_2 = document.createElement("p");
    item_2.append("Type : " + element.type);

    let item_3 = document.createElement("p");
    item_3.append("Link : " + element.link);

    let item_4 = document.createElement("p");
    item_4.append("Availability  : " + element.availability);

    let item_5 = document.createElement("div");
    item_5.setAttribute("class", "data");
    let updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateBtn.addEventListener("click", () => {
      resourceId = element.id;
      document.getElementById("id06").style.display = "block";
      fetch(url + "resources/" + element.id)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          document.getElementById("updateResourceName").value =
            data.resource_name;
          document.getElementById("updateResourceType").value = data.type;
          document.getElementById("updateResourceLink").value = data.link;
          document.getElementById("updateResourceAvailability").value =
            data.availability;
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    let name = element.resource_name;
    deleteBtn.addEventListener("click", () => {
      fetch(url + "resources/" + element.id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // If the response is successful, parse the response as JSON
        })
        .then((data) => {
          // Handle the data retrieved from the server after the delete operation
          alert(name + " deleted successfully");
          get_all_resources();
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    item_5.append(updateBtn, deleteBtn);

    let addResource = document.createElement("button");
    addResource.innerText = "Add Resource";

    cartDiv.append(item_1, item_2, item_3, item_4, item_5, addResource);
    showData.append(cartDiv);
  });
}

// -----------------------------------------------

document.getElementById("viewProfile").addEventListener("click", () => {
  document.getElementById("id01").style.display = "block";
  fetch(url + "managers/" + currentUser.id)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("managerName").value = data.name;
      document.getElementById("bio").value = data.bio;
      document.getElementById("managerRole").value = data.role;
      document.getElementById("email").value = data.email;
      document.getElementById("managerUsername").value = data.username;
      document.getElementById("managerStartdate").value = dataChange(
        data.start_date
      );
    })
    .catch((error) => console.log(error));
});

function updateManager(event) {
  event.preventDefault();
  const name = document.getElementById("managerName").value;
  const bio = document.getElementById("bio").value;
  const role = document.getElementById("managerRole").value;
  const email = document.getElementById("email").value;
  const start_date = document.getElementById("managerStartdate").value;
  const username = document.getElementById("managerUsername").value;

  const data = {
    name: name,
    bio: bio,
    role: role,
    email: email,
    start_date: start_date,
    username: username,
  };

  fetch(url + "managers/" + currentUser.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data from the server
      alert(data["message"]);
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
}

let managerModel = document.getElementById("managerModel");
managerModel.addEventListener("submit", updateManager);
