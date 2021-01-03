import React, { useEffect, useContext } from "react";
import Nav from "../Nav/Nav";
import HelpButton from "../HelpButton/HelpButton";
import Footer from "../Footer/Footer";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import logo from "./img/earthquake.svg";

function Earthquake() {
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
	const earthquakeLogo = (
		<img src={logo} width="60px" alt="earthquake logo" className="mb-4" />
	);
	return (
		<main className="page-container">
			<Nav />
			<div className="help-button-container d-flex flex-column justify-content-center align-items-center">
				<HelpButton logo={earthquakeLogo} disasterType="Earthquake" />
			</div>
			<Footer />
		</main>
	);
}

export default Earthquake;
