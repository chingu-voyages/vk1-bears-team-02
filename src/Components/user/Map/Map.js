import React from "react";

// style
import "./map.css";
// Components
import Nav from "../Nav/Nav";
import MapView from "../../MapView/MapView";

const Map = () => {
  return (
    <main className="page-container">
      <Nav />
      <MapView />
    </main>
  );
};

export default Map;
