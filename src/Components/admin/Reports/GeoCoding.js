import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GeoCoding({ latitude, longitude }) {
	const [placeName, setPlaceName] = useState(null);
	useEffect(() => {
		const geocodeCoordinates = async () => {
			try {
				const lng = 120.9977;
				const lat = 14.0113;
				const geocode = await axios.get(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
				);

				setPlaceName(geocode.data.features[0].place_name);
			} catch (error) {
				console.log(error);
			}
		};

		geocodeCoordinates();
	}, []);

	return <>{placeName}</>;
}
