const key = "projectPulseUser";
let currentUser = localStorage.getItem(key);

if(currentUser == undefined){
  window.location.href = "index.html";
}

document.getElementById("username").innerText = currentUser;

const url = "http://127.0.0.1:5000/";

document.getElementById("username").addEventListener("click", () => {
  const data = {
    username: currentUser,
  };

  // Replace 'your_login_endpoint' with the actual login endpoint URL
  fetch(url + "/logout", {
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
