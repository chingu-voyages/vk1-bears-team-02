import './modal.css';
import React, { useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    function reset() {
      document.getElementById("modalForm").reset();
    }


    try {
      const response = axios.post("http://localhost:5000/update", {
        oldUsername: localStorage.getItem('adminsideusername'),
        username: data.username,
        password: data.password,
      });
      console.log(response);
      alert("Update Success")
      reset()

    } catch (error) {
      console.error(`error:${error}`);
    }
  };
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose} id="closeButton">
          Close
        </button>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column align-items-center my-4 h-50"
          id="modalForm"
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
          <Button className="rounded-pill font-weight-bolder" type="submit">
            Save
        </Button>
        </Form>
      </section>
    </div>
  );
};

export { Modal }
