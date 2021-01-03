import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { Nav, Logo, Footer } from "../Login/Login";

import "./register.css";
import swal from "sweetalert";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthenticationContext } from "../context/AuthenticationContext";

const Register = () => {
	const { register, handleSubmit } = useForm();
	const { authenticated, setAuth } = useContext(AuthenticationContext);
	const onSubmit = (data) => {
		// console.log("sdddsds");
		// return swal({
		// 	text: "You are now registered!",
		// 	icon: "success",
		// });
		// if (data.username === "" || data.password === "" || data.email === "") {
		// 	return swal({
		// 		text: "Please, fill out all form fields.",
		// 		icon: "warning",
		// 	});
		// }
		if (data.username === "" || data.password === "" || data.email === "") {
			// return swal({
			// 	text: "Please, fill out all form fields.",
			// 	icon: "warning",
			// });
			toast.warning("Please, fill out all form fields!");
		} else {
			const getLoginDataWithForm = async (req, res) => {
				try {
					const response = await axios.post(
						`${process.env.REACT_APP_BACKEND}register`,
						{
							username: data.username,
							password: data.password,
							email: data.email,
						}
					);
					console.log(response);
					const message = response.data.message;
					if (message === "user added") {
						setTimeout(function () {
							setAuth(true);
						}, 6000);
						toast.success(`You are now registered!`);
					} else {
						toast.warning(`${message}`);
					}
				} catch (error) {
					console.error(`error:${error}`);
				}
			};
			// console.log(data);
			// setAuth(true);
			getLoginDataWithForm();
		}
	};
	return (
		<main className="page-container register-page">
			<Nav page="Register" />
			<Logo />
			<Form
				onSubmit={handleSubmit(onSubmit)}
				className="d-flex flex-column align-items-center my-4">
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
				<Form.Group controlId="formBasicEmail" className="w-50">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email"
						name="email"
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
						type="submit">
						Sign Up
					</button>
					<span className="or">or</span>

					<a href={process.env.REACT_APP_BACKEND + "google"} class="google-btn">
						Sign Up with Google
					</a>
				</div>
			</Form>
			<Footer footerTitle="Already have an account?" footerLink="Login" />
			<ToastContainer />
		</main>
	);
};

export default Register;
// "http://localhost:5000/google"
