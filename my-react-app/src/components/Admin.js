import React, { useState, useEffect } from "react";
import "./styles/style.css";
import "./styles/admin.css";

const Admin = () => {
  const [managerData, setManagerData] = useState([]);

  useEffect(() => {
    getManagers();
  }, []);

  const url = "http://127.0.0.1:5000/";

  // Function to handle form submission
  const submitForm = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form input values
    const name = event.target.name.value;
    const email = event.target.email.value;
    const role = event.target.role.value;
    const status = event.target.status.value;
    const startDate = event.target.startdate.value;
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
        alert(data.message);
        getManagers();
      })
      .catch((error) => {
        // Handle any errors that occurred during the form submission
        alert("Error:", error);
      });

    event.target.reset();
  };

  const getManagers = () => {
    fetch(url + "managers")
      .then((response) => response.json())
      .then((data) => {
        setManagerData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteManager = (id, name) => {
    fetch(url + "managers/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert(name + " deleted successfully");
        getManagers();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="sidenav">
        <div className="admin">
          <img src="Img/admin.jpg" alt="Admin" />
          <h1>Murli Khaire</h1>
        </div>

        <div className="items">
          <p id="dashboard">Dashboard</p>
          <p id="manager">Manager</p>
          <p id="project">Project</p>
          <p id="resource">Resource</p>
          <p>Dummy</p>
        </div>
      </div>

      <div className="main">
        <div className="heading">
          <h1>Project Pulse</h1>
        </div>

        <div id="dashboardView">dashboard</div>

        <div id="managerView">
          <div className="managerHead">
            <h3>Manager Details</h3>
            <p onClick={() => (document.getElementById("id01").style.display = "block")}>
              Add Manager
            </p>
          </div>
          <div className="data">
            <header className="table_head">
              <p className="rewHead head-1">Name</p>
              <p className="rewHead head-2">Email</p>
              <p className="rewHead head-3">Role</p>
              <p className="rewHead head-4">Status</p>
              <p className="rewHead head-5">Start Date</p>
              <p className="rewHead head-6">Action</p>
            </header>

            <div id="show_manager">
              {managerData.map((manager) => (
                <div className="carttable" key={manager.id}>
                  <div className="head-1">{manager.name}</div>
                  <div className="head-2">{manager.email}</div>
                  <div className="head-3">{manager.role}</div>
                  <div className="head-4">{manager.status ? "Active" : "Inactive"}</div>
                  <div className="head-5">
                    {manager.start_date ? manager.start_date.split(" ")[1] + " " + manager.start_date.split(" ")[2] + " " + manager.start_date.split(" ")[3] : "None"}
                  </div>
                  <div className="head-6">
                    <p className="catp" onClick={() => deleteManager(manager.id, manager.name)}>
                      Delete
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="projectView">Project</div>

        <div id="resourceView">Resource</div>
      </div>

      {/* Modal HTML here */}
      <div id="id01" className="modal">
        <form id="managerForm" className="modal-content animate" onSubmit={submitForm}>
          <div className="imgcontainer">
            <h1>Add Manager</h1>
          </div>

          <div className="cont">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input type="text" id="inputName" placeholder="Enter Name" name="name" required />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input type="email" id="inputEmail" placeholder="Enter Email" name="email" required />

            <label htmlFor="role">
              <b>Role</b>
            </label>
            <select id="inputRole" name="role" required>
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="Administrator">Administrator</option>
              <option value="Viewer">Viewer</option>
            </select>

            <label htmlFor="status">
              <b>Status</b>
            </label>
            <select id="inputStatus" name="status" required>
              <option value="" disabled selected>
                Select Status
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <label htmlFor="startdate">
              <b>Start Date</b>
            </label>
            <input id="startDate" type="date" name="startdate" required />
          </div>

          <div className="btnCont" style={{ backgroundColor: "#f1f1f1" }}>
            <button
              type="button"
              onClick={() => (document.getElementById("id01").style.display = "none")}
              className="cancelbtn"
            >
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
