import React, { useContext } from "react";
import { Nav, Logo } from "../../Login/Login";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { AuthenticationContext } from "../../context/AuthenticationContext";
function Login() {
  const { authenticated, setAuth } = useContext(AuthenticationContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <main className="page-container login-page">
      <Nav page="Login" />
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
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="w-50">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            className="form-field"
            ref={register}
          />
        </Form.Group>
        <div className="button-wrapper mt-3">
          <button
            className="btn btn-primary rounded-pill font-weight-bolder"
            type="submit"
          >
            Login
          </button>
        </div>
      </Form>
    </main>
  );
}

export default Login;
