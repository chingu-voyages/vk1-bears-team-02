import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import swal from "sweetalert";
// Svg
import backButton from "../../../Login/img/back-button.svg";

function Edit() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    swal({
      text: "Updated",
      icon: "success",
    });
  };
  return (
    <main className="page-container register-page d-flex flex-column">
      <nav className="d-flex justify-content-between justify-content ">
        <Link to="/user">
          <img
            className="back-button mt-4 ml-4"
            src={backButton}
            alt="back button"
          />
        </Link>
        <p className="page-name mt-4 mr-4">Edit</p>
      </nav>
      <div className="container my-4">
        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center">
            <h1>e-Sagip</h1>
            <p className="sub-title">One click away to get help.</p>
          </div>
        </div>
      </div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column align-items-center my-4 h-50"
      >
        <Form.Group controlId="formBasicEmail" className="w-50">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your new username"
            name="username"
            className="form-field"
            ref={register({ required: true })}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="w-50">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            name="password"
            className="form-field"
            ref={register({ required: true })}
          />
        </Form.Group>
        <div className="button-wrapper mt-3">
          <button
            className="btn btn-primary rounded-pill font-weight-bolder"
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </main>
  );
}

export default Edit;
