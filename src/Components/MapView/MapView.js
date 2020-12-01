import ReactDOM from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import axios from "axios";

import "./styles.css";

import PopOver from "./PopOver";

// mapboxgl.accessToken =
// 	"pk.eyJ1IjoiaXZhbmZ1bmNpb24iLCJhIjoiY2s5NGd5NGphMDFucjNpbDJ6d285cjNociJ9.HBWvHMgpYyY53znT78H8bA";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// const styles = {
// 	// height: "100vh",
// 	// position: "absolute",
// };
const markerHeight = 50,
	markerRadius = 10,
	linearOffset = 25;

const popupOffsets = {
	top: [0, 0],
	topLeft: [0, 0],
	topRight: [0, 0],
	bottom: [0, -markerHeight],
	bottomLeft: [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
	bottomRight: [
		-linearOffset,
		(markerHeight - markerRadius + linearOffset) * -1,
	],
	left: [markerRadius, (markerHeight - markerRadius) * -1],
	right: [-markerRadius, (markerHeight - markerRadius) * -1],
};

const MapView = () => {
	const [map, setMap] = useState(null);

	const [initialView, setInitialView] = useState({
		lng: 120.9842,
		lat: 14.5995,
	});

	const [zoom, setZoom] = useState(6);

	const [tiltAngle, setTiltAngle] = useState(1);

	const [geotrigger, setGeotrigger] = useState(false);

	const [mapstyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v10");

	const mapContainer = useRef(null);

	useEffect(() => {
		const initializeMap = ({ setMap, mapContainer }) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: mapstyle,
				center: [initialView.lng, initialView.lat],
				zoom: zoom,
				// pitch: tiltAngle,
			});

			// Add a stretchable image that can be used with `icon-text-fit`
			// In this example, the image is 600px wide by 400px high.

			// Initialize the geolocate control.
			let geolocate = new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
			});
			// Add the control to the map.
			map.addControl(geolocate, "bottom-left");

			// add navigation control (zoom buttons)
			map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

			map.on("load", () => {
				setMap(map);
				// geolocate.trigger();

				map.resize();
			});

			map.on("move", () => {
				setInitialView({
					lng: map.getCenter().lng.toFixed(4),
					lat: map.getCenter().lat.toFixed(4),
					// zoom: map.getZoom().toFixed(4),
					// pitch: initialView.pitch,
				});

				setZoom(map.getZoom().toFixed(4));
			});

			//not used
			map.on("mouseleave", "water", function () {
				console.log("A mouseleave event occurred.");
			});

			const getAllCoordinates = async () => {
				try {
					console.log("call this");
					const data = await axios.get(`http://localhost:5000/coordinates`);
					const coordinate_data = data.data.data;
					// console.log(coordinate_data);

					coordinate_data.forEach((data) => {
						// console.log(data.properties.message);

						let popupHolder = document.createElement("div");
						ReactDOM.render(
							<PopOver feature="scooby" datas={data} />,
							popupHolder
						);
						let popup = new mapboxgl.Popup({
							offset: popupOffsets,
							className: "popover-style",
						})
							.setLngLat(data.geometry.coordinates)
							//.setHTML(<PopOver message="ivan" />)
							// .setHTML(`<p>${data.properties.message}</p>`)
							.setDOMContent(popupHolder)
							// .setMaxWidth("320px")
							.addTo(map);

						new mapboxgl.Marker({ color: "#a40606" })
							.setLngLat(data.geometry.coordinates)
							.addTo(map)

							.setPopup(popup);
					});
				} catch (error) {
					console.log(error);
				}
			};

			getAllCoordinates();
			console.log(`reinitialize`);
		};

		if (!map) initializeMap({ setMap, mapContainer });
	}, [map]);

	return (
		<div className="map-container">
			<div
				ref={(element) => (mapContainer.current = element)}
				className="map-renderer"
			/>
			<div className="sidebarStyle">
				<p>
					Longitude: {initialView.lng} | Latitude: {initialView.lat} | Zoom :{" "}
					{zoom}
				</p>
				<div>
					{/* <select
						onChange={(e) => {
							setMapStyle(e.target.value);
							console.log("yow ma man");
							console.log(mapstyle);
							alert(mapstyle);
						}}
						value={mapstyle}>
						<option value="" disabled>
							---map options---
						</option>
						<option value="mapbox://styles/mapbox/streets-v11">
							Street mode
						</option>
						<option value="mapbox://styles/mapbox/dark-v10">Dark mode</option>
						<option value="mapbox://styles/mapbox/outdoors-v11">
							Outdor mode
						</option>
						<option value="mapbox://styles/mapbox/satellite-v9">
							Satellite mode
						</option>
						<option value="mapbox://styles/mapbox/satellite-streets-v11">
							Satellite street mode
						</option>
					</select> */}
					{/* <button
						onClick={() => {
							setMapStyle("mapbox://styles/mapbox/dark-v10");
						}}>
						Dark mode
					</button>
					<button
						onClick={() => {
							setMapStyle("mapbox://styles/mapbox/satellite-streets-v11");
						}}>
						Satellite street mode
					</button> */}

					{/* https://codepen.io/roblabs/pen/zJjPzX */}
				</div>
			</div>
		</div>
	);
};

export default MapView;
