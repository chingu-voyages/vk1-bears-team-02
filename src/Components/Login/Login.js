import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";

import jwt_decode from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthenticationContext } from "../context/AuthenticationContext";

import "./login.css";
import backButton from "./img/back-button.svg";

const Login = () => {
	const { authenticated, setAuth } = useContext(AuthenticationContext);
	const { register, handleSubmit, errors } = useForm();

	const [disableField, setDisableField] = useState(false);

	const [userData, setUserData] = useState({
		username: "",
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
		const getLoginDataWithForm = async (req, res) => {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_BACKEND}login`,
					{
						username: data.username,
						password: data.password,
					}
				);
				console.log(response);

				const message = response.data.message;

				if (message === "user login") {
					setDisableField(true);
					const token = response.data.token;
					const decoded = jwt_decode(token);

					localStorage.setItem("role", decoded.role);
					localStorage.setItem("username", decoded.username);
					localStorage.setItem("email", decoded.email);
					localStorage.setItem("userId", decoded.userId);
					localStorage.setItem("setAuth", true);

					toast.success(`${message}`, { autoClose: 2000 });
					console.log(decoded);
					setTimeout(function () {
						window.location.replace(
							`${process.env.REACT_APP_FRONTEND}user/flood`
						);
					}, 3000);
				} else {
					toast.warning(`${message}`, { autoClose: 2000 });
				}
			} catch (error) {
				console.error(`error:${error}`);
			}
		};
		// console.log(data);
		// setAuth(true);

		getLoginDataWithForm();
	};

	useEffect(() => {
		localStorage.clear();
		// const getLoginData = async () => {
		// 	try {
		// 		const response = await axios.get(
		// 			"http://localhost:5000/auth/login/success"
		// 		);
		// 		console.log(response.data);
		// 	} catch (error) {
		// 		console.error(error);
		// 	}
		// };
		// setTimeout(function () {
		// 	alert("Hello");
		// 	setAuth(true);
		// }, 3000);

		// getLoginData();

		// alert("hi");
		const url = window.location.search;
		const getQueryString = new URLSearchParams(url);
		const getID = getQueryString.get("id");
		const checkHasId = getQueryString.has("id");

		// if (checkHasId) {
		// 	// alert(getID);
		// 	toast.success(`User verified`, { autoClose: 2000 });
		// 	setTimeout(() => {
		// 		setAuth(true);
		// 	}, 3000);
		// }
		// alert(window.location.search);
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
						Login
					</button>
					<span className="or">or</span>
					<a href={process.env.REACT_APP_BACKEND + "google"} class="google-btn">
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
