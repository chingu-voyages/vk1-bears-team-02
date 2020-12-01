import React from "react";

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
				<h5>{properties.message}</h5>
				<p>
					Longitude:{lng} | Latitude: {lat}
				</p>
				<button
					onClick={() => {
						alert(properties.message);
					}}>
					respond
				</button>
			</div>
		</>
	);
}
