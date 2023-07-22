const key = "projectPulseUser";
let currentUser = JSON.parse(localStorage.getItem(key));

if (currentUser == undefined || currentUser.role == "Admin") {
  window.location.href = "index.html";
}
const url = "http://127.0.0.1:5000/";
fetch(url + "managers/" + currentUser.id)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").innerText = data.name;
  })
  .catch((error) => console.log(error));

document.getElementById("username").addEventListener("click", () => {
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
    let addTask = document.createElement("button");
    addTask.innerText = "Add Task";
    item_6.append(viewTask, addTask);

    cartDiv.append(item_1, item_2, item_3, item_4, item_5, item_6);
    showData.append(cartDiv);
  });
}

get_all_projects();

// ------------------------------------------------------------

document.getElementById("taskData").addEventListener("click", get_all_task);

function get_all_task() {
  fetch(url + "tasks")
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
    let viewTask = document.createElement("button");
    viewTask.innerText = "View Task";
    let addTask = document.createElement("button");
    addTask.innerText = "Add Task";
    item_5.append(viewTask, addTask);

    cartDiv.append(item_1, item_2, item_3, item_4, item_5);
    showData.append(cartDiv);
  });
}

// get_all_task();
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
