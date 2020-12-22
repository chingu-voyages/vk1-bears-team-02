import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthenticationContext } from "../context/AuthenticationContext";

import "./login.css";
import backButton from "./img/back-button.svg";

const Login = () => {
	const { authenticated, setAuth } = useContext(AuthenticationContext);
	const { details, setDetails } = useContext(AuthenticationContext);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		if (data.username === "" || data.password === "") {
			// return swal({
			// 	text: "Please, fill out all form fields.",
			// 	icon: "warning",
			// });
			toast.warning("Please, fill out all form fields!");
		} else {
			const getLoginDataWithForm = async (req, res) => {
				try {
					const response = await axios.post("http://localhost:5000/login", {
						username: data.username,
						password: data.password,
					});
					console.log(response);

					const message = response.data.message;
					if (message === "user login") {
						setTimeout(function () {
							setDetails(data.username)
							localStorage.setItem('auth', true)
							localStorage.setItem('username', data.username)
							setAuth(true)


						}, 1000);

						toast.success(`${message}`);
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


	useEffect(() => {
		let mounted = true
		const getLoginData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/auth/login/success"
				);
				console.log(response.data);
				setAuth(true)
			} catch (error) {
				console.error(error);

			}
		};
		// setTimeout(function () {
		// 	alert("Hello");
		// 	setAuth(true);
		// }, 3000);

		// getLoginData();
		return () => mounted = false
	}, []);


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
					<span className="or">or</span>
					<a href="http://localhost:5000/google" class="google-btn">
						Login with Google
					</a>
				</div>
			</Form>
			<Footer footerTitle="Don't have an account?" footerLink="Register" />
			<ToastContainer />
		</main>
	);
};

const Nav = ({ page }) => {
	return (
		<nav className="d-flex justify-content-between justify-content ">
			<Link to="/">
				<img
					className="back-button mt-4 ml-4"
					src={backButton}
					alt="back button"
				/>
			</Link>
			<p className="page-name mt-4 mr-4">{page}</p>
		</nav>
	);
};

const Logo = () => {
	return (
		<div className="container my-4">
			<div className="row">
				<div className="col-12 d-flex flex-column align-items-center">
					<h1>e-Sagip</h1>
					<p className="sub-title">One click away to get help.</p>
				</div>
			</div>
		</div>
	);
};

const Footer = ({ footerTitle, footerLink }) => {
	return (
		<div className="footer d-flex flex-column align-items-center pb-4 mt-5">
			<h6>{footerTitle}</h6>
			<Link to={`/${footerLink}`} className="mt-n2 font-italic">
				{footerLink}
			</Link>
		</div>
	);
};

export { Login, Nav, Logo, Footer };
