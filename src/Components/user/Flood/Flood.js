import React, { useContext } from 'react';

import Nav from "../Nav/Nav";
import HelpButton from "../HelpButton/HelpButton";
import Footer from "../Footer/Footer";
import { AuthenticationContext } from "../../context/AuthenticationContext";

import logo from "./img/flood.svg";
import "./flood.css";

function Flood() {
  const floodLogo = (
    <img src={logo} width="65px" alt="flood logo" className="mb-4" />
  );
  const { details, setDetails } = useContext(AuthenticationContext);

  return (
    <main className="page-container">
      <Nav />
      <div className="help-button-container d-flex flex-column justify-content-center align-items-center">
        <HelpButton logo={floodLogo} />
      </div>
      <Footer />
    </main>
  );
}

export default Flood;
