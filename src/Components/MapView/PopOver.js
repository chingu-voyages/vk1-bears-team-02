import React, { useEffect, useState } from "react";
import { Button, Badge, Table } from "react-bootstrap";
import axios from "axios";

import * as turf from "@turf/turf";

import Pusher from "pusher-js";

import Moment from "react-moment";
import "moment-timezone";

export default function PopOver(props) {
	const { datas } = props;
	const { properties, geometry, civilian } = datas;
	const { coordinates } = geometry;
	const [lng, lat] = coordinates;
	const [placeName, setPlaceName] = useState(null);
	const [civilian_details] = civilian;

	const [status, setStatus] = useState(datas.status);

	const [dateResponded, setDateResponded] = useState(null);

	const [user, setUser] = useState(localStorage.getItem("role"));

	const [currentUserCoordinate, setCurrentUserCoordinate] = useState({
		lat: 0,
		lang: 0,
	});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(function (position) {
				setCurrentUserCoordinate({
					lat: position.coords.latitude,
					lang: position.coords.longitude,
				});
			});
		}

		// Enable pusher logging - don't include this in production
		// Pusher.logToConsole = true;

		//change this to your pusher key
		const pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
			cluster: process.env.REACT_APP_CLUSTER,
		});

		const channel2 = pusher.subscribe("map-data-update");
		channel2.bind("map-data-update-event", function (data) {
			// console.log(`status mo ${data.data.status}`);
			setStatus(data.data.status);

			if (status !== "acknowledge" && status !== "resolved") {
				setDateResponded(data.data.date_acknowledge);
			}
		});
	}, [status]);

	const respond = (property) => {
		const sendResponse = async () => {
			try {
				let new_status = "";
				let date = new Date();
				if (property.status === "sent") {
					new_status = "acknowledge";

					const data = {
						status: new_status,
						date_acknowledge: date,
					};
					const response = await axios.put(
						`${process.env.REACT_APP_BACKEND}map-data/${property._id}`,
						data
					);
					// console.log(response);
				} else if (property.status === "acknowledge") {
					new_status = "resolved";

					const data = {
						status: new_status,
						date_resolved: date,
					};
					const response = await axios.put(
						`${process.env.REACT_APP_BACKEND}map-data/${property._id}`,
						data
					);
					// console.log(response);
				}

				// window.location.reload();
				// .then(function (response) {
				// 	console.log(response);
				// 	window.location.reload();
				// })
				// .catch(function (error) {
				// 	console.log(error);
				// });
			} catch (error) {
				console.log(error);
			}
		};

		sendResponse();
	};

	const geocodeCoordinates = async () => {
		try {
			const geocode = await axios.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
			);
			setPlaceName(geocode.data.features[0].place_name);
			// console.log(`geocode`);
		} catch (error) {}
	};

	geocodeCoordinates();

	let from = turf.point([lng, lat]); // disaster coordinates
	let to = turf.point([currentUserCoordinate.lang, currentUserCoordinate.lat]); // my coordinates
	let options = { units: "kilometers" };

	let distance = turf.distance(from, to, options);

	return (
		<>
			<h3>Distress Call Details</h3>
			<Table striped bordered hover>
				<tbody>
					<tr>
						<th>Location</th>
						<td>
							<strong>{placeName}</strong>
						</td>
					</tr>
					<tr>
						<th>Disaster type</th>
						<td>
							<strong>{properties.disasterType}</strong>
						</td>
					</tr>
					{user === "civilian" && (
						<tr>
							<th>Distance from my location</th>
							<td>
								<strong>{distance.toFixed(2)}Km</strong>
							</td>
						</tr>
					)}

					<tr>
						<th>Current Status</th>
						<td>
							{/* <Badge
								variant={
									datas.status === `sent`
										? `danger`
										: datas.status === `acknowledge`
										? `warning`
										: `success`
								}>
								{datas.status}
							</Badge> */}

							{status === `sent`
								? `On Going`
								: status === `acknowledge`
								? `Dispatch help`
								: status === `resolved`
								? `Clear`
								: ""}

							{}
						</td>
					</tr>

					<tr>
						<th>Distress call by:</th>
						<td>
							{`${civilian_details.givenName} ${civilian_details.familyName}`}
						</td>
					</tr>

					<tr>
						<th>Date Send</th>
						<td>
							<Moment
								format="MMMM DD, YYYY hh:mm:ss A"
								date={datas.date_send}
							/>
						</td>
					</tr>

					<tr>
						<th>Date Responded</th>
						<td>
							{status !== "sent" ? (
								<Moment
									format="MMMM DD, YYYY hh:mm:ss A"
									date={dateResponded}
								/>
							) : (
								""
							)}
						</td>
					</tr>
				</tbody>
			</Table>

			{user === "admin"
				? status !== "resolved" && (
						<Button
							variant={
								status === "sent"
									? "danger"
									: status === "acknowledge"
									? "info"
									: "success"
							}
							onClick={() => {
								respond(datas);
							}}>
							{status === "sent"
								? "Respond"
								: status === "acknowledge"
								? "Mark as resolve"
								: "Resolved"}
						</Button>
				  )
				: ""}

			{}
			{/* <div>
				<h3>{properties.title}</h3>
				<p>
					<Badge
						variant={
							datas.status === `sent`
								? `danger`
								: datas.status === `acknowledge`
								? `warning`
								: `success`
						}>
						{datas.status}
					</Badge>
				</p>
				<p>{properties.disasterType}</p>
				<p>{properties.description}</p>
				<p>
					Date send:
					<Moment format="MMMM DD, YYYY hh:mm:ss A" date={datas.date_send} />
				</p>

				{datas.status === "acknowledgeent" ? (
					<p>
						Date responded:
						<Moment
							format="MMMM DD, YYYY hh:mm:ss A"
							date={datas.date_acknowledge}
						/>
					</p>
				) : (
					""
				)}

				{datas.status === "resolved" ? (
					<p>
						Date resolved:
						<Moment
							format="MMMM DD, YYYY hh:mm:ss A"
							date={datas.date_resolved}
						/>
					</p>
				) : (
					""
				)}

				<p>
					Longitude:{lng} | Latitude: {lat}
				</p>
				<p>Place Name: {placeName}</p>
				<p>distance from your current position: {distance.toFixed(4)}Km</p>
				<Button
					variant={
						datas.status === "sent"
							? "danger"
							: datas.status === "acknowledge"
							? "info"
							: "success"
					}
					onClick={() => {
						respond(datas);
					}}>
					{datas.status === "sent"
						? "Respond"
						: datas.status === "acknowledge"
						? "Mark as resolve"
						: "Resolved"}
				</Button>
			</div> */}
		</>
	);
}
