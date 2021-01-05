import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { Nav, Logo, Footer } from "../Login/Login";

import jwt_decode from "jwt-decode";

import "./register.css";
import swal from "sweetalert";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthenticationContext } from "../context/AuthenticationContext";

const Register = () => {
	const { register, handleSubmit, errors } = useForm();
	const { authenticated, setAuth } = useContext(AuthenticationContext);

	const [disableField, setDisableField] = useState(false);
	const [userData, setUserData] = useState({
		givenName: "",
		familyName: "",
		username: "",
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		const value = e.target.value;
		setUserData({
			...userData,
			[e.target.name]: value,
		});

		// console.log(userData);
	};
	const onSubmit = (data) => {
		setDisableField(true);
		const getLoginDataWithForm = async (req, res) => {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_BACKEND}register`,
					{
						username: data.username,
						password: data.password,
						email: data.email,
						givenName: data.givenName,
						familyName: data.familyName,
					}
				);

				const message = response.data.message;
				if (message === "user added") {
					const token = response.data.token;
					const decoded = jwt_decode(token);
					localStorage.setItem("role", decoded.role);
					localStorage.setItem("username", decoded.username);
					localStorage.setItem("email", decoded.email);
					localStorage.setItem("userId", decoded.userId);
					localStorage.setItem("setAuth", true);
					toast.success(`You are now registered!`, {
						autoClose: 2000,
					});
					setTimeout(function () {
						setAuth(true);
						window.location.replace(
							`${process.env.REACT_APP_FRONTEND}user/flood`
						);
					}, 3000);
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
		// if (data.username === "" || data.password === "" || data.email === "") {
		// 	// return swal({
		// 	// 	text: "Please, fill out all form fields.",
		// 	// 	icon: "warning",
		// 	// });
		// 	toast.warning("Please, fill out all form fields!");
		// } else {

		// }
	};

	return (
		<main className="page-container register-page">
			<Nav page="Register" />
			<Logo />
			<Form
				onSubmit={handleSubmit(onSubmit)}
				className="d-flex flex-column align-items-center my-4">
				<Form.Group controlId="formBasicFirstName" className="w-50">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your first name"
						name="givenName"
						className="form-field"
						onChange={handleChange}
						ref={register({ required: true })}
						disabled={disableField}
					/>
					{errors.givenName && (
						<span>
							<p className="error-two">First Name is required</p>
						</span>
					)}
				</Form.Group>
				<Form.Group controlId="formBasicLastName" className="w-50">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your last name"
						name="familyName"
						className="form-field"
						onChange={handleChange}
						ref={register({ required: true })}
						disabled={disableField}
					/>
					{errors.familyName && (
						<span>
							<p className="error-two">Last Name is required</p>
						</span>
					)}
				</Form.Group>
				<Form.Group controlId="formBasicEmail" className="w-50">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your username"
						name="username"
						className="form-field"
						onChange={handleChange}
						ref={register({ required: true })}
						disabled={disableField}
					/>

					{errors.username && (
						<span>
							<p className="error-two">Username is required</p>
						</span>
					)}
				</Form.Group>
				<Form.Group controlId="formBasicEmail" className="w-50">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email"
						name="email"
						className="form-field"
						onChange={handleChange}
						ref={register({ required: true })}
						disabled={disableField}
					/>
					{errors.email && (
						<span>
							<p className="error-two">Email is required</p>
						</span>
					)}
				</Form.Group>
				<Form.Group controlId="formBasicPassword" className="w-50">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						name="password"
						className="form-field"
						onChange={handleChange}
						ref={register({ required: true })}
						disabled={disableField}
					/>
					{errors.password && (
						<span>
							<p className="error-two">Password is required</p>
						</span>
					)}
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
