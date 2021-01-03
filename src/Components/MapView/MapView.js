import ReactDOM from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import Pusher from "pusher-js";

import axios from "axios";

import "./styles.css";

import PopOver from "./PopOver";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// const styles = {
//   height: "100%",
//   width:
//   // position: "absolute",
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
	//example user
	const [user, setUser] = useState("user");

	const [mapState, setMap] = useState(null);

	const [featureData, setFeatureData] = useState(null);

	const [initialView, setInitialView] = useState({
		lng: 120.9842,
		lat: 14.5995,
	});

	const [zoom, setZoom] = useState(5);

	const [tiltAngle, setTiltAngle] = useState(1);

	//  mapbox://styles/ivanfuncion/cki63927r0otl19t2eazqn8wq
	const [mapstyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v10");

	const [currentCoordinates, setCurrentCoordinates] = useState({
		lng: 0,
		lat: 0,
	});

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

			if (user === "admin") {
			} else {
				// Initialize the geolocate control.
				let geolocate = new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
					showUserLocation: false,
				});
				// Add the control to the map.
				map.addControl(geolocate, "bottom-left");
				// geolocate.trigger(alert("trigger"));

				// document.getElementById("trigger").addEventListener("click", () => {
				// 	geolocate.trigger();
				// });
				const geocoder = new MapboxGeocoder({
					accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
					mapboxgl: mapboxgl,
					color: "red",
				});
				console.log(geocoder);
				map.addControl(geocoder);

				// get your current coordinates
				geolocate.on("geolocate", (e) => {
					var lng = e.coords.longitude;
					var lat = e.coords.latitude;
					var position = [lng, lat];
					console.log(position);

					setCurrentCoordinates({
						lng: lng,
						lat: lat,
					});

					var iconHandler = document.createElement("div");
					iconHandler.className = "marker-icon-current-coordinate-user-style";

					new mapboxgl.Marker(iconHandler).setLngLat([lng, lat]).addTo(map);
				});
			}

			// add navigation control (zoom buttons)
			let navigationControl = new mapboxgl.NavigationControl();
			map.addControl(navigationControl, "bottom-right");

			// add fullscreen control
			// map.addControl(new mapboxgl.FullscreenControl());

			map.on("load", () => {
				setMap(map);

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

			// setTimeout(() => {
			// 	map.fitBounds([
			// 		[32.958984, -5.353521],
			// 		[43.50585, 5.615985],
			// 	]);
			// }, 5000);

			// document.getElementById("bounce").addEventListener("click", () => {
			// 	map.fitBounds([
			// 		[32.958984, -5.353521],
			// 		[43.50585, 5.615985],
			// 	]);
			// });

			// Enable pusher logging - don't include this in production
			Pusher.logToConsole = true;

			//change this to your pusher key
			const pusher = new Pusher("b74a80c7be8fd2b220d7", {
				cluster: "us3",
			});

			const getAllCoordinates = async () => {
				try {
					console.log("call this");

					const data = await axios.get(
						`${process.env.REACT_APP_BACKEND}map-data`
					);

					const features = data.data.features;

					features.forEach((data) => {
						console.log(data.geometry.coordinates);

						let popupHolder = document.createElement("div");
						ReactDOM.render(
							<PopOver feature="scooby" datas={data} />,
							popupHolder
						);
						let popup = new mapboxgl.Popup({
							offset: popupOffsets,
							className: "popover-style",
							maxWidth: "300px",
						})
							.setLngLat(data.geometry.coordinates)
							//.setHTML(<PopOver message="ivan" />)
							// .setHTML(`<p>${data.properties.message}</p>`)
							.setDOMContent(popupHolder);
						// .setMaxWidth("320px")
						// .addTo(map);

						// create a HTML element for each feature
						console.log(data.properties.disasterType);
						var iconHandler = document.createElement("div");
						if (data.properties.disasterType === "Flood") {
							iconHandler.className = "marker-icon-flood-style";
						} else if (data.properties.disasterType === "Fire") {
							// alert("fire");
							iconHandler.className = "marker-icon-fire-style";
						} else if (data.properties.disasterType === "Earthquake") {
							iconHandler.className = "marker-icon-earthquake-style";
						}

						new mapboxgl.Marker(iconHandler)
							.setLngLat(data.geometry.coordinates)
							.addTo(map)
							.setPopup(popup);
					});
				} catch (error) {
					console.log(error);
				}
			};

			//init load
			getAllCoordinates();

			const channel = pusher.subscribe("map-data-create");
			channel.bind("map-data-create-event", function (data) {
				getAllCoordinates();
			});

			const channel2 = pusher.subscribe("map-data-update");
			channel2.bind("map-data-update-event", function (data) {
				getAllCoordinates();
			});

			// console.log(`reinitialize`);
		};

		if (!mapState) initializeMap({ setMap, mapContainer });
	}, [mapState]);

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
					{/* current: longitute {currentCoordinates.lng.toFixed(4)} and
					latitude : {currentCoordinates.lat.toFixed(4)} */}
				</p>
				{/* <button id="bounce">bounce</button> */}

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
