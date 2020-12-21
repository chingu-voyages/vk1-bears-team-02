import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthenticationContext";

const PublicRoute = ({ component: Component, ...rest }) => {
	const { authenticated } = useContext(AuthenticationContext);
	var auth = localStorage.getItem('auth')

	return (
		<Route
			{...rest}
			component={(props) =>
				auth ? <Redirect to="/user/flood" /> : <Component {...props} />
			}
		/>
	);
};

export default PublicRoute;
