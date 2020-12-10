import React from "react";
import { Button, Badge } from "react-bootstrap";
import axios from "axios";

export default function PopOver(props) {
	const { datas } = props;
	const { properties, geometry } = datas;
	const { coordinates } = geometry;
	const [lng, lat] = coordinates;
	// const { properties, geometry } = data;

	console.log(`data: ${geometry.coordinates}`);

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
