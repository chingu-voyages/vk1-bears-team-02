import React from "react";
import Nav from "../Nav/Nav";
import HelpButton from "../HelpButton/HelpButton";
import Footer from "../Footer/Footer";

import logo from "./img/earthquake.svg";

function Earthquake({ authenticated, setAuthenticated }) {
  const earthquakeLogo = (
    <img src={logo} width="60px" alt="earthquake logo" className="mb-4" />
  );
  return (
    <main className="page-container">
      <Nav authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <div className="help-button-container d-flex flex-column justify-content-center align-items-center">
        <HelpButton logo={earthquakeLogo} />
      </div>
      <Footer />
    </main>
  );
}

export default Earthquake;
