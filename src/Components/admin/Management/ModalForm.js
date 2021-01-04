import React, { useState, useEffect } from "react";
import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./modalForm.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ModalForm(props) {
	const { children, username, givenName, familyName, email, id } = props;
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [disableField, setDisableField] = useState(false);

	const [userData, setUserData] = useState({
		givenName: givenName,
		familyName: familyName,
		username: username,
		email: email,
		//  password: "",
	});
	const { register, handleSubmit, errors } = useForm();

	const handleChange = (e) => {
		const value = e.target.value;
		setUserData({
			...userData,
			[e.target.name]: value,
		});

		console.log(userData);
	};

	// useEffect(() => {
	// 	setUserData({
	// 		givenName: givenName,
	// 		familyName: familyName,
	// 		username: username,
	// 		email: email,
	// 	});
	// }, []);

	const onSubmit = (data) => {
		console.log(data.username);
		console.log(errors);
		// alert(id);
		console.log(data);
		setDisableField(true);

		const updateCivilianInfo = async () => {
			try {
				const info = {
					givenName: data.givenName,
					familyName: data.familyName,
					username: data.username,
					email: data.email,
					password: data.password,
				};
				const response = await axios.put(
					`${process.env.REACT_APP_BACKEND}user/${id}`,
					info
				);

				if (response.status === 200) {
					toast.success("user information has been updated successfully", {
						autoClose: 2000,
					});
				}
			} catch (error) {}
		};

		updateCivilianInfo();

		setTimeout(() => {
			window.location.reload();
		}, 3000);
	};

	return (
		<div>
			<Button variant="danger" onClick={handleShow}>
				{props.children}
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Header closeButton>
						<Modal.Title>
							Update Info for User: <strong>{props.username}</strong>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
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
									<p>First Name is required</p>
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
									<p>Last Name is required</p>
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
									<p>Email is required</p>
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
									<p>Username is required</p>
								</span>
							)}
						</Form.Group>

						<Form.Group controlId="formPassword">
							<Form.Label>New Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="New Password"
								name="new_password"
								value={userData.password}
								onChange={handleChange}
								// ref={register({ required: true })}
								disabled={disableField}
							/>
							{/* {errors.new_password && (
								<span>
									<p>Password is required</p>
								</span>
							)} */}
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="submit" disabled={disableField}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			<ToastContainer />
		</div>
	);
}
