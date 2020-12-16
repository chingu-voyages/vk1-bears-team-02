import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { Nav, Logo, Footer } from "../Login/Login";

import "./register.css";
import swal from "sweetalert";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    return swal({
      text: "You are now registered!",
      icon: "success",
    });
  };
  return (
    <main className="page-container register-page">
      <Nav page="Register" />
      <Logo />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column align-items-center my-4"
      >
        <Form.Group controlId="formBasicEmail" className="w-50">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            className="form-field"
            ref={register({ required: true })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="w-50">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            className="form-field"
            ref={register({ required: true })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="w-50">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
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
            Sign Up
          </button>
          <span className="or">or</span>
          <button class="google-btn">Sign Up with Google</button>
        </div>
      </Form>
      <Footer footerTitle="Already have an account?" footerLink="Login" />
    </main>
  );
};

export default Register;
