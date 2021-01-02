import React, { useEffect } from "react";

// style
import "./profile.css";
// Components
import Nav from "../Nav/Nav";

function Profile() {
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
							<button
								className="btn btn-primary rounded-pill font-weight-bolder"
								type="submit">
								Edit Info
							</button>
						</div>
					</a>
				</div>
				<div className="reports-wrapper mx-5 mt-4">
					<h2>Report History</h2>
					<table
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
							<tr>
								<td>Fire</td>
								<td>11-22-20</td>
								<td>Responded</td>
							</tr>
							<tr>
								<td>Earthquake</td>
								<td>12-02-19</td>
								<td>Responded</td>
							</tr>
							<tr>
								<td>Flood</td>
								<td>06-09-16</td>
								<td>Responded</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}

export default Profile;
