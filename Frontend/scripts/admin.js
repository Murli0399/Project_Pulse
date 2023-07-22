dashboard = document.getElementById("dashboard");
dashboardView = document.getElementById("dashboardView");
manager = document.getElementById("manager");
managerView = document.getElementById("managerView");
project = document.getElementById("project");
projectView = document.getElementById("projectView");
resource = document.getElementById("resource");
resourceView = document.getElementById("resourceView");
show_manager = document.getElementById("show_manager");

const url = "http://127.0.0.1:5000/";

let currentManager = "";
const key = "projectPulseUser";
let currentUser = JSON.parse(localStorage.getItem(key));

if (currentUser == undefined || currentUser.role == "Manager") {
  window.location.href = "index.html";
}

document.getElementById("adminLogout").addEventListener("click", () => {
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



// Function to handle form submission
function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form input values
  const name = document.getElementById("inputName").value;
  const email = document.getElementById("inputEmail").value;
  const role = document.getElementById("inputRole").value;
  const status = document.getElementById("inputStatus").value;
  const startDate = document.getElementById("startDate").value;
  // Create a data object to send to the server
  const data = {
    name: name,
    email: email,
    role: role,
    status: status,
    start_date: startDate,
  };

  // Perform the form submission using Fetch API or any other method
  fetch(url + "managers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data from the server
      // console.log(data['message']);
      alert(data["message"]);
      document.getElementById("id01").style.display = "none";
      document.getElementById("managerForm").reset();
      get_all_managers();
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
  document.getElementById("id01").style.display = "none";
  get_all_managers();
}

// Add event listener to the form's submit event
const managerForm = document.getElementById("managerForm");
managerForm.addEventListener("submit", submitForm);

dashboard.addEventListener("click", () => {
  dashboardView.style.display = "block";
  managerView.style.display = "none";
  projectView.style.display = "none";
  resourceView.style.display = "none";
});

manager.addEventListener("click", () => {
  dashboardView.style.display = "none";
  managerView.style.display = "block";
  projectView.style.display = "none";
  resourceView.style.display = "none";
  get_all_managers();
});

project.addEventListener("click", () => {
  dashboardView.style.display = "none";
  managerView.style.display = "none";
  projectView.style.display = "block";
  resourceView.style.display = "none";
  get_all_projects();
});

resource.addEventListener("click", () => {
  resourceView.style.display = "block";
  dashboardView.style.display = "none";
  managerView.style.display = "none";
  projectView.style.display = "none";
  get_all_resource();
});

function get_all_managers() {
  fetch(url + "managers")
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Handle the data retrieved from the server
      // console.log(data);
      showData(data); // Output the list of managers
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error);
    });
}
// get_all_managers();

function showData(data) {
  // console.log(data);
  show_manager.innerHTML = null;
  data.forEach((element, index) => {
    let cartDiv = document.createElement("div");
    cartDiv.setAttribute("class", "carttable");

    let item_1 = document.createElement("div");
    item_1.setAttribute("class", "head-1");
    item_1.append(element.name);

    let item_2 = document.createElement("div");
    item_2.setAttribute("class", "head-2");
    item_2.append(element.email);

    let item_3 = document.createElement("div");
    item_3.setAttribute("class", "head-3");
    item_3.append(element.role);

    let item_4 = document.createElement("div");
    item_4.setAttribute("class", "head-4");
    if (element.status) {
      item_4.append("Active");
    } else {
      item_4.append("Inactive");
    }

    let item_5 = document.createElement("div");
    item_5.setAttribute("class", "head-5");
    if (element.start_date == "") {
      item_5.append("None");
    } else {
      let date = element.start_date.split(" ");
      item_5.append(date[1] + " " + date[2] + " " + date[3]);
    }

    let item_6 = document.createElement("div");
    item_6.setAttribute("class", "head-6");

    let deleteBtn = document.createElement("p");
    deleteBtn.setAttribute("class", "catp");
    deleteBtn.innerText = "Delete";
    let name = element.name;
    deleteBtn.addEventListener("click", () => {
      fetch(url + "managers/" + element.id, {
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
          get_all_managers();
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    let assignProject = document.createElement("p");
    assignProject.setAttribute("class", "assign");
    assignProject.innerText = "Assign Project";
    assignProject.addEventListener("click", () => {
      currentManager = element.id;
      document.getElementById("id04").style.display = "block";

      fetch(url + "/projects/empty_manager")
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          // Handle the data retrieved from the server
          // console.log(data);
          assignProjectManager(data, currentManager);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    item_6.append(deleteBtn, assignProject);

    cartDiv.append(item_1, item_2, item_3, item_4, item_5, item_6);
    show_manager.append(cartDiv);
  });
}

function assignProjectManager(data, manager_id) {
  let project_list = document.getElementById("project-list");
  let projectNameHere = document.getElementById("projectNameHere");
  let assignProjectBtn = document.getElementById("assignProject");
  let pid = "";
  project_list.innerHTML = null;
  data.forEach((el, index) => {
    let li = document.createElement("li");
    li.append(el.project_name);
    li.addEventListener("click", () => {
      projectNameHere.value = el.project_name;
      pid = el.id;
    });
    project_list.append(li);
  });

  assignProjectBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(pid + " " + manager_id);
    const data = {
      manager_id: manager_id,
    };

    fetch(url + "/projects/manager/" + pid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data from the server
        if (data.message === "Project assign successful") {
          alert("Project assign successful");
        } else {
          alert("Project not found");
        }
        document.getElementById("id04").style.display = "none";
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error("Error:", error);
      });
  });
}

// -----------------------------------------------------------------------

show_project = document.getElementById("show_project");

// Function to handle form submission
function addProjectForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form input values
  const projectName = document.getElementById("projectName").value;
  const projectStatus = document.getElementById("projectStatus").value;
  const projectStartDate = document.getElementById("projectStartDate").value;
  const projectEndDate = document.getElementById("projectEndDate").value;
  // Create a data object to send to the server
  const data = {
    project_name: projectName,
    status: projectStatus,
    start_date: projectStartDate,
    end_date: projectEndDate,
  };

  // Perform the form submission using Fetch API or any other method
  fetch(url + "projects", {
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
      document.getElementById("id02").style.display = "none";
      document.getElementById("projectForm").reset();
      get_all_projects();
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
  document.getElementById("id02").style.display = "none";
  get_all_projects();
}

// Add event listener to the form's submit event
const projectForm = document.getElementById("projectForm");
projectForm.addEventListener("submit", addProjectForm);

function get_all_projects() {
  fetch(url + "projects")
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
// get_all_managers();

function displayProjects(data) {
  // console.log(data);
  show_project.innerHTML = null;
  data.forEach((element, index) => {
    let cartDiv = document.createElement("div");
    cartDiv.setAttribute("class", "carttable");

    let item_1 = document.createElement("div");
    item_1.setAttribute("class", "head-1");
    item_1.append(element.project_name);

    let item_2 = document.createElement("div");
    item_2.setAttribute("class", "head-2");
    if (element.manager_id == "Not Assigned") {
      item_2.append("Not Assigned");
    } else {
      fetch(url + "managers/" + element.manager_id)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          // console.log(data.name)
          let x = data.name || "Not Assigned";
          item_2.append(x); // Output the list of managers
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          // console.error("Error:", error);
        });
    }

    let item_3 = document.createElement("div");
    item_3.setAttribute("class", "head-3");
    item_3.append(element.status);

    let item_4 = document.createElement("div");
    item_4.setAttribute("class", "head-4");
    if (element.start_date == "") {
      item_4.append("None");
    } else {
      let date = element.start_date.split(" ");
      item_4.append(date[1] + " " + date[2] + " " + date[3]);
    }

    let item_5 = document.createElement("div");
    item_5.setAttribute("class", "head-5");
    if (element.end_date == "") {
      item_5.append("None");
    } else {
      let date = element.end_date.split(" ");
      item_5.append(date[1] + " " + date[2] + " " + date[3]);
    }

    let item_6 = document.createElement("div");
    item_6.setAttribute("class", "head-6");

    let deleteBtn = document.createElement("p");
    deleteBtn.setAttribute("class", "catp");
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

    item_6.append(deleteBtn);

    cartDiv.append(item_1, item_2, item_3, item_4, item_5, item_6);
    show_project.append(cartDiv);
  });
}

// ======================================================================

show_resource = document.getElementById("show_resource");

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
      document.getElementById("id03").style.display = "none";
      document.getElementById("resourceForm").reset();
      get_all_resource();
    })
    .catch((error) => {
      // Handle any errors that occurred during the form submission
      alert("Error:", error);
    });
  document.getElementById("id03").style.display = "none";
  get_all_resource();
}

// Add event listener to the form's submit event
const resourceForm = document.getElementById("resourceForm");
resourceForm.addEventListener("submit", addResourceForm);

function get_all_resource() {
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

function displayResources(data) {
  console.log(data);
  show_resource.innerHTML = null;
  data.forEach((element, index) => {
    let cartDiv = document.createElement("div");
    cartDiv.setAttribute("class", "carttable");

    let item_1 = document.createElement("div");
    item_1.setAttribute("class", "head-1");
    item_1.append(element.resource_name);

    let item_2 = document.createElement("div");
    item_2.setAttribute("class", "head-2");
    item_2.append(element.type);

    let item_3 = document.createElement("div");
    item_3.setAttribute("class", "head-3");
    item_3.append(element.link);

    let item_4 = document.createElement("div");
    item_4.setAttribute("class", "head-4");
    item_4.append(element.availability);

    let item_5 = document.createElement("div");
    item_5.setAttribute("class", "head-5");
    fetch(url + "/tasks/resources/" + element.id)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // console.log(data);
        item_5.append(data.task_count); // Output the list of managers
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error("Error:", error);
      });

    let item_6 = document.createElement("div");
    item_6.setAttribute("class", "head-6");

    let deleteBtn = document.createElement("p");
    deleteBtn.setAttribute("class", "catp");
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
          get_all_resource();
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        });
    });

    item_6.append(deleteBtn);

    cartDiv.append(item_1, item_2, item_3, item_4, item_5, item_6);
    show_resource.append(cartDiv);
  });
}
