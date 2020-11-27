import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import "./styles.css";

mapboxgl.accessToken =
	"pk.eyJ1IjoiaXZhbmZ1bmNpb24iLCJhIjoiY2s5NGd5NGphMDFucjNpbDJ6d285cjNociJ9.HBWvHMgpYyY53znT78H8bA";

const styles = {
	width: "100vw",
	height: "calc(100vh - 80px)",
	// position: "absolute",
};
const markerHeight = 50,
	markerRadius = 10,
	linearOffset = 25;
const popupOffsets = {
	top: [0, 0],
	"top-left": [0, 0],
	"top-right": [0, 0],
	bottom: [0, -markerHeight],
	"bottom-left": [
		linearOffset,
		(markerHeight - markerRadius + linearOffset) * -1,
	],
	"bottom-right": [
		-linearOffset,
		(markerHeight - markerRadius + linearOffset) * -1,
	],
	left: [markerRadius, (markerHeight - markerRadius) * -1],
	right: [-markerRadius, (markerHeight - markerRadius) * -1],
};

const MapView = () => {
	const [map, setMap] = useState(null);
	const [coordinates, setCoordinates] = useState([
		{
			lng: 121.0244, //n to s
			lat: 14.5547, //e to w
			description: "Fire at this location",
		},
		{
			lng: 121.0437, //n to s
			lat: 14.676, //e to w
			description: "Fire at this location",
		},

		{
			lng: 120.984222, //n to s
			lat: 14.599512, //e to w
			description: "Fire at this location",
		},
		{
			lng: 120.81604, //n to s
			lat: 14.852739, //e to w
			description: "Earthquake at this location",
		},
		{
			lng: 120.608589, //n to s
			lat: 15.80002, //e to w
			description: "flashflood at this location",
		},
		{
			lng: 121.050865, //n to s
			lat: 14.517618, //e to w
			description: "Hail Storm at this location",
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
				zoom: 6,
				pitch: 45,
			});

			map.on("load", () => {
				setMap(map);
				map.resize();
			});

			coordinates.forEach((data) => {
				new mapboxgl.Marker().setLngLat([data.lng, data.lat]).addTo(map);
				new mapboxgl.Popup({ offset: popupOffsets, className: "popover-style" })
					.setLngLat([data.lng, data.lat])
					.setHTML(`<p>${data.description}</p>`)
					.setMaxWidth("500px")
					.addTo(map);
			});
		};

		if (!map) initializeMap({ setMap, mapContainer });
	}, [map]);

	return (
		<>
			<div ref={(element) => (mapContainer.current = element)} style={styles} />
			<h1>hello</h1>
		</>
	);
};

export default MapView;
