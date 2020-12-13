import React, { useEffect, useState } from "react";
import { Button, Badge } from "react-bootstrap";
import axios from "axios";
import * as turf from "@turf/turf";

export default function PopOver(props) {
	const { datas } = props;
	const { properties, geometry } = datas;
	const { coordinates } = geometry;
	const [lng, lat] = coordinates;
	const [placeName, setPlaceName] = useState(null);
	// const { properties, geometry } = data;

	console.log(`data: ${geometry.coordinates}`);
	const [currentUserCoordinate, setCurrentUserCoordinate] = useState({
		lat: 0,
		lang: 0,
	});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(function (position) {
				console.log("Latitude is :", position.coords.latitude);
				console.log("Longitude is :", position.coords.longitude);

				setCurrentUserCoordinate({
					lat: position.coords.latitude,
					lang: position.coords.longitude,
				});
			});
		}
	}, []);

	const respond = (property) => {
		alert(property._id);
		console.log(property);

		const sendResponse = async () => {
			try {
				let new_status = "";
				if (property.status === "sent") {
					new_status = "acknowledge";
				} else if (property.status === "acknowledge") {
					new_status = "resolved";
				}

				const data = {
					status: new_status,
				};
				const response = await axios.put(
					`http://localhost:5000/map-data/${property._id}`,
					data
				);
				console.log(response);
				window.location.reload();
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
			console.log(`geocode`);
		} catch (error) {
			console.log(error);
		}
	};

	geocodeCoordinates();

	let from = turf.point([lng, lat]); // disaster coordinates
	let to = turf.point([currentUserCoordinate.lang, currentUserCoordinate.lat]); // my coordinates
	let options = { units: "kilometers" };

	let distance = turf.distance(from, to, options);

	console.log(`diff: ${distance}`);

	return (
		<>
			<div>
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
					Longitude:{lng} | Latitude: {lat}
				</p>
				<p>Place Name: {placeName}</p>
				<p>distance from your current position: {distance.toFixed(4)}Km</p>
				<Button
					variant="danger"
					onClick={() => {
						respond(datas);
					}}>
					respond
				</Button>
			</div>
		</>
	);
}
