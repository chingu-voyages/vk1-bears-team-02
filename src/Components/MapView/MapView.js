import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
	"pk.eyJ1IjoiaXZhbmZ1bmNpb24iLCJhIjoiY2s5NGd5NGphMDFucjNpbDJ6d285cjNociJ9.HBWvHMgpYyY53znT78H8bA";

const styles = {
	width: "100vw",
	height: "calc(100vh - 80px)",
	// position: "absolute",
};

const MapView = () => {
	const [map, setMap] = useState(null);
	const [points, setPoints] = useState([
		{
			lng: 121.0244, //n to s
			lat: 14.5547, //e to w
		},
		{
			lng: 121.0437, //n to s
			lat: 14.676, //e to w
		},
	]);
	const [initialView, setInitialView] = useState({
		lng: 120.9842,
		lat: 14.5995,
	});
	const mapContainer = useRef(null);

	useEffect(() => {
		const initializeMap = ({ setMap, mapContainer }) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
				center: [initialView.lng, initialView.lat],
				zoom: 5,
			});

			map.on("load", () => {
				setMap(map);
				map.resize();
			});

			points.forEach((data) => {
				new mapboxgl.Marker().setLngLat([data.lng, data.lat]).addTo(map);
			});
		};

		if (!map) initializeMap({ setMap, mapContainer });
	}, [map]);

	return (
		<>
			<div ref={(element) => (mapContainer.current = element)} style={styles} />
		</>
	);
};

export default MapView;
