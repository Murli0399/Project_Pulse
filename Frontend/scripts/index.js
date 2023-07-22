let loginForm = document.getElementById("loginForm");
const key = "projectPulseUser";
let currentUser = localStorage.getItem(key);

if (currentUser != undefined) {
  window.location.href = "manager.html";
}

const url = "http://127.0.0.1:5000/";

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let role = document.getElementById("role");

  // console.log(username.value);
  // console.log(password.value);
  // console.log(role.value);

  if (role.value == "Admin") {
  } else {
    const data = {
      username: username.value,
      password: password.value,
    };

    // Replace 'your_login_endpoint' with the actual login endpoint URL
    fetch(url + "/login", {
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
          localStorage.setItem(key, data.uname);
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
