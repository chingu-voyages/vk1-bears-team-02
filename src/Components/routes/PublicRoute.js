import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthenticationContext";

const PublicRoute = ({ component: Component, ...rest }) => {
	var auth = localStorage.getItem('auth')
	const { authenticated } = useContext(AuthenticationContext);

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