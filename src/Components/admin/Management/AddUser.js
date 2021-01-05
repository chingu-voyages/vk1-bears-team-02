import React, { useState } from "react";
import { Modal, Container, Col, Row, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUser() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [disableField, setDisableField] = useState(false);

	const { register, handleSubmit, errors } = useForm();

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
		let userObj = {};

		if (data.user_type === "admins") {
			userObj = {
				givenName: data.givenName,
				familyName: data.familyName,
				username: data.username,
				email: data.email,
				password: data.password,
			};
		} else {
			userObj = {
				givenName: data.givenName,
				familyName: data.familyName,
				username: data.username,
				email: data.email,
				password: data.password,
				isActive: true,
			};
		}
		const addUser = async () => {
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND}${data.user_type}`,
				userObj
			);

			if (response.status === 200) {
				toast.success("New user has been created", {
					autoClose: 2000,
				});
			}

			console.log(response);
		};

		addUser();

		setDisableField(true);

		setTimeout(() => {
			window.location.reload();
		}, 3000);
	};

	return (
		<>
			<Button variant="danger" onClick={handleShow}>
				Add user
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Header closeButton>
						<Modal.Title>
							<strong>Add user form</strong>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="userType">
							<Form.Label>User type</Form.Label>
							{/* <Form.Control
												type="text"
												placeholder="First Name"
												name="givenName"
												value={userData.givenName}
												onChange={handleChange}
												ref={register({ required: true })}
												disabled={disableField}
											/> */}

							<Form.Control
								as="select"
								custom
								name="user_type"
								ref={register({ required: true })}
								disabled={disableField}>
								<option value="admins">Admin</option>
								<option value="add-user-civilian">Civilian</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="formFirstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="First Name"
								name="givenName"
								value={userData.givenName}
								onChange={handleChange}
								ref={register({ required: true })}
								disabled={disableField}
							/>
							{errors.givenName && (
								<span>
									<p className="error">First Name is required</p>
								</span>
							)}
						</Form.Group>

						<Form.Group controlId="formLastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Last Name"
								name="familyName"
								value={userData.familyName}
								onChange={handleChange}
								ref={register({ required: true })}
								disabled={disableField}
							/>
							{errors.familyName && (
								<span>
									<p className="error">Last Name is required</p>
								</span>
							)}
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								placeholder="Email"
								name="email"
								value={userData.email}
								onChange={handleChange}
								ref={register({ required: true })}
								disabled={disableField}
							/>
							{errors.email && (
								<span>
									<p className="error">Email is required</p>
								</span>
							)}
						</Form.Group>
						<Form.Group controlId="formUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Username"
								name="username"
								value={userData.username}
								onChange={handleChange}
								ref={register({ required: true })}
								disabled={disableField}
							/>
							{errors.username && (
								<span>
									<p className="error">Username is required</p>
								</span>
							)}
						</Form.Group>

						<Form.Group controlId="formPassword">
							<Form.Label> Password</Form.Label>
							<Form.Control
								type="password"
								placeholder=" Password"
								name="password"
								value={userData.password}
								onChange={handleChange}
								ref={register({ required: true })}
								disabled={disableField}
							/>
							{errors.password && (
								<span>
									<p className="error">Password is required</p>
								</span>
							)}
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="submit" disabled={disableField}>
							Add user
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/* <ToastContainer /> */}
		</>
	);
}
