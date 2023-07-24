let loginForm = document.getElementById("loginForm");
const key = "projectPulseUser";
let currentUser = JSON.parse(localStorage.getItem(key));

if (currentUser != undefined && currentUser.role == "Manager") {
  window.location.href = "manager.html";
} else if (currentUser != undefined && currentUser.role == "Admin") {
  window.location.href = "admin.html";
}

// const url = "https://project-pulse-giib.onrender.com/";
const url = "http://127.0.0.1:5000/";

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let role = document.getElementById("role");

  // console.log(username.value);
  // console.log(password.value);
  // console.log(role.value);
  const data = {
    username: username.value,
    password: password.value,
  };
  if (role.value == "Admin") {
    // Replace 'your_login_endpoint' with the actual login endpoint URL
    fetch(url + "admin/login", {
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
        if (data.message == true) {
          localStorage.setItem(
            key,
            JSON.stringify({ uname: data.uname, role: role.value })
          );
          window.location.href = "admin.html";
        } else {
          alert(data.message); // Show the message received from the server
          loginForm.reset();
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error("Error:", error);
        // Show an error message or perform any other error handling as needed
      });
  } else {
    // Replace 'your_login_endpoint' with the actual login endpoint URL
    fetch(url + "login", {
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
        if (data.message == true) {
          localStorage.setItem(
            key,
            JSON.stringify({ uname: data.uname, role: role.value, id: data.id })
          );
          window.location.href = "manager.html";
        } else {
          alert(data.message); // Show the message received from the server
          loginForm.reset();
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error("Error:", error);
        // Show an error message or perform any other error handling as needed
      });
  }
});
