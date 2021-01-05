import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AuthenticationContext } from "../../../context/AuthenticationContext";

// Svg
import backButton from "../../../Login/img/back-button.svg";

function Edit() {
	// const { details, setDetails } = useContext(AuthenticationContext);

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
		const updateUser = async () => {
			try {
				const response = await axios.put(
					`${
						process.env.REACT_APP_BACKEND
					}user-credential/${localStorage.getItem("userId")}`,
					{
						// oldusername: localStorage.getItem("username"),
						username: data.username,
						password: data.password,
					}
				);
				console.log(response);
				localStorage.setItem("username", data.username);

				if (response.status === 200) {
					setDisableField(true);
					toast.success(`user credential has been updated successfully`, {
						autoClose: 2000,
					});
					setTimeout(function () {
						window.location.replace(
							`${process.env.REACT_APP_FRONTEND}user/flood`
						);
					}, 3000);
				}

				// window.location.replace(`${process.env.REACT_APP_FRONTEND}user`);
				// toast.success(`${message}`, { autoClose: 2000 });
				// 		console.log(decoded);
				//
			} catch (error) {
				console.error(`error:${error}`);
			}
		};

		updateUser();
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
				className="d-flex flex-column align-items-center my-4 h-50">
				<Form.Group controlId="formBasicEmail" className="w-50">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your new username"
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
						placeholder="Enter your new password"
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
						Save
					</button>
				</div>
			</Form>
			<ToastContainer />
		</main>
	);
}

export default Edit;
