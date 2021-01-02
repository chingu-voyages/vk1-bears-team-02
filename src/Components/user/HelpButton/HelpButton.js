import React, { useEffect, useState } from "react";
import swal from "sweetalert";

import axios from "axios";

import "./helpButton.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pusher from "pusher-js";

const HelpButton = ({ logo, disasterType }) => {
	const [currentUserCoordinate, setCurrentUserCoordinate] = useState({
		lat: 0,
		long: 0,
	});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(function (position) {
				// console.log("Latitude is :", position.coords.latitude);
				// console.log("Longitude is :", position.coords.longitude);

				setCurrentUserCoordinate({
					lat: position.coords.latitude,
					long: position.coords.longitude,
				});
			});
		}

		Pusher.logToConsole = true;

		const pusher = new Pusher("b74a80c7be8fd2b220d7", {
			cluster: "us3",
		});

		const channel2 = pusher.subscribe("map-data-update");
		channel2.bind("map-data-update-event", function (data) {
			if (data.data.status === "acknowledge") {
				toast.info(`Update status to ${data.data.status}`);
			} else {
				toast.success(`Update status to ${data.data.status}`);
			}
		});
	}, []);

	const handleClick = () => {
		// swal({
		// 	title: `Distress Sent ${disasterType}`,
		// 	text: `Your distress alert has been sent. ${currentUserCoordinate.lat} ${currentUserCoordinate.long}`,
		// 	icon: "success",
		// });

		const sentDistressCall = async (req, res) => {
			try {
				const data = {
					civilian: `5fcf8dc19e22ce1544064770`,
					longitude: currentUserCoordinate.long,
					latitude: currentUserCoordinate.lat,
					// description: "sdadadadasd",
					// title: "sdadadadasd",
					disasterType: disasterType,
				};

				const response = await axios.post(
					`${process.env.REACT_APP_BACKEND}map-data`,
					data
				);
				// console.log(response);
				if (response.statusText === "OK") {
					toast.error(`Distress Call has been sent`);
				}
			} catch (error) {
				console.error(`error:${error}`);
			}
		};

		sentDistressCall();
	};
	return (
		<>
			<div className="help-button-wrapper" onClick={handleClick}>
				<div className="help-button d-flex justify-content-center align-items-center flex-column">
					{logo}
					<h2>Click to get help!</h2>
				</div>
				<div class="help-button-outline"></div>
			</div>
			<ToastContainer />
		</>
	);
};

export default HelpButton;
