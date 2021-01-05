import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// style
import "./profile.css";
// Components
import Nav from "../Nav/Nav";

import Moment from "react-moment";
import "moment-timezone";

import DataTable from "react-data-table-component";

import GeoCoding from "./../../admin/Reports/GeoCoding";

import { AuthenticationContext } from "../../context/AuthenticationContext";

function Profile() {
	const [reportData, setReportData] = useState([]);
	const { authenticated, setAuth } = useContext(AuthenticationContext);

	const columns = [
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
	useEffect(() => {
		if (
			localStorage.getItem("role") === null ||
			localStorage.getItem("role") !== "civilian"
		) {
			// window.location.replace(`${process.env.REACT_APP_FRONTEND}user/fire`);
			// window.location.href = `${process.env.REACT_APP_FRONTEND}login`;
			setAuth(false);
			// alert(localStorage.getItem("role"));
		} else {
			const userId = localStorage.getItem("userId");
			const getReports = async () => {
				const data = await axios.get(
					`${process.env.REACT_APP_BACKEND}map-data/map-history/${userId}`
				);

				console.log(data.data.feature);
				setReportData(data.data.feature);
			};

			getReports();
		}
	}, []);

	return (
		<main className="page-container">
			<Nav />
			<div className="profile-wrapper pt-4">
				<div className="profile d-flex justify-content-center flex-column align-items-start mx-5">
					<h3>Username</h3>
					<p className="ml-5 font-italic">{localStorage.getItem("username")}</p>
					<h3>Email</h3>
					<p className="ml-5 font-italic">{localStorage.getItem("email")}</p>
					<a href="/user/edit" className="align-self-center mr-5">
						<div className="button-wrapper mt-3">
							{localStorage.getItem("googleId") === null && (
								<button
									className="btn btn-primary rounded-pill font-weight-bolder"
									type="submit">
									Edit Info
								</button>
							)}
						</div>
					</a>
				</div>
				<div className="reports-wrapper mx-5 mt-4">
					<h2>Report History</h2>

					<DataTable
						title=""
						columns={columns}
						data={reportData}
						pagination
						paginationPerPage={5}
						paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
					/>
					{/* <table
						class="table table-sm table-bordered"
						style={{ color: "var(--primary-white)" }}>
						<thead>
							<tr>
								<th scope="col">Type</th>
								<th scope="col">Date</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{reportData.map((data) => {
								return (
									<tr>
										<td>{data.properties.disasterType}</td>
										<td>
											<Moment
												format="MMMM DD, YYYY hh:mm:ss A"
												date={data.date_send}
											/>
										</td>
										<td>{data.status}</td>
									</tr>
								);
							})}
							<tr></tr>
						</tbody>
					</table> */}
				</div>
			</div>
		</main>
	);
}

export default Profile;
