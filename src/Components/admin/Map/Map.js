import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapView from "../../MapView/MapView";

import "./map.css";

function Map() {
	return (
		<>
			<div className="map">
				<MapView />
			</div>
		</>
	);
}

export default Map;
