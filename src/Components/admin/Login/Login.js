import React, { useContext, useEffect } from "react";
import { Nav, Logo } from "../../Login/Login";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import axios from "axios";
import jwt_decode from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthenticationContext } from "../../context/AuthenticationContext";
function Login() {
	const { authenticated, setAuth } = useContext(AuthenticationContext);
	const { register, handleSubmit } = useForm();

	useEffect(() => {
		// alert(window.history.back());
		localStorage.clear();
	}, []);

	const onSubmit = (data) => {
		console.log(data);
		if (data.username === "" || data.password === "") {
			// return swal({
			// 	text: "Please, fill out all form fields.",
			// 	icon: "warning",
			// });
			toast.warning("Please, fill out all form fields!");
		} else {
			const getLoginDataWithForm = async (req, res) => {
				try {
					const response = await axios.post(
						`${process.env.REACT_APP_BACKEND}admin/login`,
						{
							username: data.username,
							password: data.password,
						}
					);
					console.log(response);

					const message = response.data.message;

					if (message === "user login") {
						toast.success(`${message}`, { autoClose: 2000 });
						const token = response.data.token;
						const decoded = jwt_decode(token);

						localStorage.setItem("role", decoded.role);
						localStorage.setItem("username", decoded.username);
						localStorage.setItem("email", decoded.email);
						localStorage.setItem("userId", decoded.userId);
						localStorage.setItem("setAuth", true);
						console.log(decoded);
						setTimeout(function () {
							window.location.replace(`${process.env.REACT_APP_FRONTEND}admin`);
							// setAuth(true);
						}, 3000);
					} else {
						toast.warning(`${message}`, { autoClose: 2000 });
					}
				} catch (error) {
					console.error(`error:${error}`);
				}
			};

			getLoginDataWithForm();
		}
	};
	return (
		<main className="page-container login-page">
			<Nav page="Login" />
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
						Login
					</button>
				</div>
			</Form>
			<ToastContainer />
		</main>
	);
}

export default Login;
