import React from "react";
import Nav from "../Nav/Nav";
import HelpButton from "../HelpButton/HelpButton";

import "./flood.css";

function Flood({ authenticated, setAuthenticated }) {
  return (
    <main className="page-container">
      <Nav authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <div className="help-button-container">
        <HelpButton />
      </div>
    </main>
  );
}

export default Flood;
