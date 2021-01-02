import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Moment from "react-moment";
import "moment-timezone";

import GeoCoding from "./GeoCoding";

import { Container, Row, Col, Table } from "react-bootstrap";

import "./reports.css";

import axios from "axios";

const data = [
	{
		id: 1,
		name: "John",
		type: "fire",
		dateReported: "yesterday",
		status: "responded",
		location: "Manila",
	},
	{
		id: 2,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 3,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 4,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 5,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 6,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 7,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 8,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 9,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 10,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
	{
		id: 11,
		name: "Carl",
		type: "flood",
		dateReported: "today",
		status: "responded",
		location: "Manila",
	},
];

const columns = [
	{ dataField: "name", text: "Name" },
	{ dataField: "type", text: "Type" },
	{ dataField: "dateReported", text: "Date Reported" },
	{ dataField: "status", text: "Status" },
	{ dataField: "location", text: "Location" },
];

function Reports() {
	const [status, setStatus] = useState("openedSidebar");

	const [reportData, setReportData] = useState([]);

	const [dummy, setDummy] = useState();

	useEffect(() => {
		const getReport = async () => {
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_BACKEND}map-data-report`
				);

				console.log(data.data.features);
				setReportData(data.data.features);
			} catch (error) {}
		};

		getReport();
	}, []);

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
								<Table striped bordered hover>
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
								</Table>
							</Col>
						</Row>
					</Container>
				</div>
			</main>
		</>
	);
}

export default Reports;
