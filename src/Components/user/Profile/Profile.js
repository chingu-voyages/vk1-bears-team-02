import React from "react";

// style
import "./profile.css";
// Components
import Nav from "../Nav/Nav";

function Profile() {
  return (
    <main className="page-container">
      <Nav />
      <div className="profile-wrapper">
        <div className="profile d-flex justify-content-center flex-column align-items-start pt-4 ml-5">
          <h3>Username</h3>
          <p className="ml-5 font-italic">john</p>
          <h3>Email</h3>
          <p className="ml-5 font-italic">john@email.com</p>
          <button className="rounded-pill font-weight-bolder align-self-center mr-5">
            Edit Info
          </button>
        </div>
        <div className="reports-wrapper pt-4 ml-5">
          <h2>Report History</h2>
        </div>
      </div>
    </main>
  );
}

export default Profile;
