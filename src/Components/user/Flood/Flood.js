import React, { useEffect, useContext } from "react";
import Nav from "../Nav/Nav";
import HelpButton from "../HelpButton/HelpButton";
import Footer from "../Footer/Footer";

import logo from "./img/flood.svg";
import "./flood.css";
import { AuthenticationContext } from "../../context/AuthenticationContext";
function Flood() {
	const { authenticated, setAuth } = useContext(AuthenticationContext);
	useEffect(() => {
		if (
			localStorage.getItem("role") === null ||
			localStorage.getItem("role") !== "civilian"
		) {
			// window.location.replace(`${process.env.REACT_APP_FRONTEND}user/fire`);
			// window.location.href = `${process.env.REACT_APP_FRONTEND}login`;
			setAuth(false);
			// alert(localStorage.getItem("role"));
		}
	}, []);
	const floodLogo = (
		<img src={logo} width="65px" alt="flood logo" className="mb-4" />
	);
	return (
		<main className="page-container">
			<Nav />
			<div className="help-button-container d-flex flex-column justify-content-center align-items-center">
				<HelpButton logo={floodLogo} disasterType="Flood" />
			</div>
			<Footer />
		</main>
	);
}

export default Flood;
