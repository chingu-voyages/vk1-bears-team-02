import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";

import Moment from "react-moment";
import "moment-timezone";

import GeoCoding from "./GeoCoding";

import { Container, Row, Col, Table } from "react-bootstrap";

import DataTable from "react-data-table-component";

import "./reports.css";

import axios from "axios";

function Reports() {
	const [status, setStatus] = useState("openedSidebar");

	const [reportData, setReportData] = useState([]);

	useEffect(() => {
		const getReport = async () => {
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_BACKEND}map-data-report`
				);

				setReportData(data.data.features);
			} catch (error) {}
		};

		getReport();
	}, []);

	const columns = [
		{
			name: "First Name",
			selector: "civilian[0].givenName",
			sortable: true,
		},
		{
			name: "Last Name",
			selector: "civilian[0].familyName",
			sortable: true,
			// right: true,
		},
		{
			name: "Email",
			selector: "civilian[0].email",
			sortable: true,
			// right: true,
		},
		{
			name: "Username",
			selector: "civilian[0].username",
			sortable: true,
			// right: true,
			// omit: true,
		},
		{
			name: "Disaster",
			selector: "properties.disasterType",
			sortable: true,
			// right: true,
			// omit: true,
		},
		{
			name: "Status",
			selector: "status",
			sortable: true,
			// right: true,
			// omit: true,
		},
		{
			name: "Date",
			cell: (row) => (
				// <GeoCoding
				// 	username={row.username}
				// 	givenName={row.givenName}
				// 	familyName={row.familyName}
				// 	email={row.email}
				// 	id={row._id}>
				// 	Update Info
				// </GeoCoding>
				<Moment format="MMMM DD, YYYY hh:mm:ss A" date={row.date_send} />
			),
			// right: true,
		},
		{
			name: "Coordinates",
			cell: (row) => (
				<>
					Lng:{row.geometry.coordinates[0].toFixed(2)} <br />
					Lat: {row.geometry.coordinates[1].toFixed(2)}
				</>
			),
		},

		{
			name: "Location",
			cell: (row) => (
				<GeoCoding
					longitude={row.geometry.coordinates[0]}
					latitude={row.geometry.coordinates[1]}
				/>
			),
		},
	];

	return (
		<>
			<main className="admin-page-container flex-wrap">
				<Nav status={status} setStatus={setStatus} />
				<div className="d-flex h-100">
					<Sidebar status={status} />
					{/* <div className="data-table">
						<BootstrapTable
							keyField="id"
							columns={columns}
							data={data}
							pagination={paginationFactory()}
						/>
					</div> */}

					<Container fluid>
						<Row>
							<Col>
								<h2>Report History</h2>
							</Col>
						</Row>
						<Row>
							<Col>
								<DataTable
									title=""
									columns={columns}
									data={reportData}
									pagination
									paginationPerPage={3}
									paginationRowsPerPageOptions={[3, 5, 10, 15, 20, 25, 30]}
								/>

								{/* <Table striped bordered hover>
									<thead>
										<tr>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Username</th>
											<th>Email</th>
											<th>Disaster</th>
											<th>Status</th>
											<th>Date</th>
											<th>Coordinates</th>
											<th>Location</th>
										</tr>
									</thead>
									<tbody>
										{reportData.map((data) => {
											return (
												<tr>
													<td>{data.civilian[0].givenName}</td>
													<td>{data.civilian[0].familyName}</td>
													<td>{data.civilian[0].username}</td>
													<td>{data.civilian[0].email}</td>
													<td>{data.properties.disasterType}</td>
													<td>{data.status}</td>
													<td>
														<Moment
															format="MMMM DD, YYYY hh:mm:ss A"
															date={data.date_send}
														/>
													</td>
													<td>
														<strong>Longitude</strong>
														{`: ${data.geometry.coordinates[0].toFixed(2)} `}
														<strong>Longitude</strong>
														{`: ${data.geometry.coordinates[1].toFixed(2)}`}
													</td>
													<td>
														<GeoCoding
															longitude={data.geometry.coordinates[0]}
															latitude={data.geometry.coordinates[1]}
														/>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table> */}
							</Col>
						</Row>
					</Container>
				</div>
			</main>
		</>
	);
}

export default Reports;
