import React, { useEffect, useContext } from "react";
import Nav from "../Nav/Nav";
import HelpButton from "../HelpButton/HelpButton";
import Footer from "../Footer/Footer";

import logo from "./img/fire.svg";
import { AuthenticationContext } from "../../context/AuthenticationContext";
function Fire() {
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
	const fireLogo = (
		<img src={logo} width="60px" alt="fire logo" className="mb-4" />
	);
	return (
		<main className="page-container">
			<Nav />
			<div className="help-button-container d-flex flex-column justify-content-center align-items-center">
				<HelpButton logo={fireLogo} disasterType="Fire" />
			</div>
			<Footer />
		</main>
	);
}

export default Fire;
