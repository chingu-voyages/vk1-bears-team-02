import React from "react";
import { Button } from "react-bootstrap";

export default function PopOver(props) {
	const { feature, datas } = props;
	const { properties, geometry } = datas;
	const { coordinates } = geometry;
	const [lng, lat] = coordinates;
	// const { properties, geometry } = data;

	console.log(`data: ${geometry.coordinates}`);

	return (
		<>
			<div>
				<h3>{properties.title}</h3>
				<p>{properties.disasterType}</p>
				<p>{properties.description}</p>
				<p>
					Longitude:{lng} | Latitude: {lat}
				</p>
				<Button
					variant="danger"
					onClick={() => {
						alert(properties.message);
					}}>
					respond
				</Button>
			</div>
		</>
	);
}
