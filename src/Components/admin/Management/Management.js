import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import { Modal, Container, Col, Row, Button, Form } from "react-bootstrap";

import DataTable from "react-data-table-component";
import ModalForm from "./ModalForm";
import ModalFormAdmin from "./ModalFormAdmin";
import AddUser from "./AddUser";

import axios from "axios";

function Management() {
	//for modal

	const [civilians, setCivilians] = useState([]);
	const [admins, setAdmins] = useState([]);
	useEffect(() => {
		const getCivilians = async () => {
			try {
				const data = await axios.get(`${process.env.REACT_APP_BACKEND}users`);

				// console.log(data.data.data);
				setCivilians(data.data.data);
			} catch (error) {}
		};

		const getAdmins = async () => {
			try {
				const data = await axios.get(`${process.env.REACT_APP_BACKEND}admins`);

				// console.log(data.data.data);
				// setCivilians(data.data.data);
				setAdmins(data.data.data);
			} catch (error) {}
		};

		getCivilians();
		getAdmins();
	}, []);

	const data = [
		{
			id: 1,
			givenName: "Ivan Christian Jay ",
			familyName: "Funcion",
			email: "random@gmail.com",
			username: "username",
		},
		{
			id: 2,
			givenName: "Mavis ",
			familyName: "Vermillion",
			email: "random@gmail.com",
			username: "mavis",
		},
		{
			id: 3,
			givenName: "Mavis ",
			familyName: "Vermillion",
			email: "random@gmail.com",
			username: "mavis",
		},
		{
			id: 4,
			givenName: "Mavis ",
			familyName: "Vermillion",
			email: "random@gmail.com",
			username: "mavis",
		},
		{
			id: 5,
			givenName: "Mavis ",
			familyName: "Vermillion",
			email: "random@gmail.com",
			username: "mavis",
		},
		{
			id: 6,
			givenName: "Mavis ",
			familyName: "Vermillion",
			email: "random@gmail.com",
			username: "mavis",
		},
		{
			id: 7,
			givenName: "Mavis ",
			familyName: "Vermillion",
			email: "random@gmail.com",
			username: "mavis",
		},
		{
			id: 8,
			givenName: "Mavis ",
			familyName: "Vermillion",
			email: "random@gmail.com",
			username: "mavis",
		},
	];
	const columns = [
		{
			name: "First Name",
			selector: "givenName",
			sortable: true,
		},
		{
			name: "Last Name",
			selector: "familyName",
			sortable: true,
			// right: true,
		},
		{
			name: "Email",
			selector: "email",
			sortable: true,
			// right: true,
		},
		{
			name: "Username",
			selector: "username",
			sortable: true,
			// right: true,
			// omit: true,
		},
		{
			name: "Action",
			cell: (row) =>
				row.googleId == null && (
					<ModalForm
						username={row.username}
						givenName={row.givenName}
						familyName={row.familyName}
						email={row.email}
						id={row._id}>
						Update Info
					</ModalForm>
				),
			// right: true,
		},
	];

	const columnsAdmin = [
		{
			name: "First Name",
			selector: "givenName",
			sortable: true,
		},
		{
			name: "Last Name",
			selector: "familyName",
			sortable: true,
			// right: true,
		},
		{
			name: "Email",
			selector: "email",
			sortable: true,
			// right: true,
		},
		{
			name: "Username",
			selector: "username",
			sortable: true,
			// right: true,
			// omit: true,
		},
		{
			name: "Action",
			cell: (row) =>
				row.googleId == null && (
					<ModalFormAdmin
						username={row.username}
						givenName={row.givenName}
						familyName={row.familyName}
						email={row.email}
						id={row._id}>
						Update Info
					</ModalFormAdmin>
				),
			// right: true,
		},
	];

	const [status, setStatus] = useState("openedSidebar");
	return (
		<main className="admin-page-container flex-wrap">
			<Nav status={status} setStatus={setStatus} />
			<div className="d-flex h-100">
				<Sidebar status={status} />
				{/* <div>Placeholder</div> */}
				<Container fluid>
					<Row>
						<Col>
							<h1>User Management</h1>
						</Col>
						<Col
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<AddUser />
						</Col>
					</Row>
					<Row>
						<Col>
							<DataTable
								title="Civilian List"
								columns={columns}
								data={civilians}
								pagination
								paginationPerPage={5}
								paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
							/>
						</Col>
					</Row>

					<hr />

					<Row>
						<Col>
							<DataTable
								title="Admin List"
								columns={columnsAdmin}
								data={admins}
								pagination
								paginationPerPage={5}
								paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
							/>
						</Col>
					</Row>
					<Row style={{ marginBottom: "50px" }}></Row>
				</Container>
			</div>
		</main>
	);
}

export default Management;
