import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Main from "./Components/Main/Main";
import { Login } from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Flood from "./Components/user/Flood/Flood";
import Fire from "./Components/user/Fire/Fire";
import Earthquake from "./Components/user/Earthquake/Earthquake";
import Dashboard from "./Components/admin/Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const [authenticated, setAuthenticated] = useState(false);
	const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
		return (
			<Route
				{...rest}
				component={(props) =>
					authenticated ? (
						<Redirect to="/user/flood" />
					) : (
						<Component {...props} />
					)
				}
			/>
		);
	};
	const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
		return (
			<Route
				{...rest}
				component={(props) =>
					authenticated ? <Component {...props} /> : <Redirect to="/login" />
				}
			/>
		);
	};

	return (
		<Router>
			<Switch>
				<PublicRoute
					exact
					path="/"
					component={Main}
					authenticated={authenticated}></PublicRoute>
				<PublicRoute
					exact
					path="/Login"
					component={() => (
						<Login
							authenticated={authenticated}
							setAuthenticated={setAuthenticated}
						/>
					)}
					authenticated={authenticated}></PublicRoute>
				<PublicRoute
					exact
					path="/Register"
					component={Register}
					authenticated={authenticated}></PublicRoute>
				<PrivateRoute
					exact
					path="/user/flood"
					component={() => (
						<Flood
							authenticated={authenticated}
							setAuthenticated={setAuthenticated}
						/>
					)}
					authenticated={authenticated}></PrivateRoute>
				<PrivateRoute
					exact
					path="/user/fire"
					component={() => (
						<Fire
							authenticated={authenticated}
							setAuthenticated={setAuthenticated}
						/>
					)}
					authenticated={authenticated}></PrivateRoute>
				<PrivateRoute
					exact
					path="/user/earthquake"
					component={() => (
						<Earthquake
							authenticated={authenticated}
							setAuthenticated={setAuthenticated}
						/>
					)}
					authenticated={authenticated}></PrivateRoute>
				<PublicRoute
					exact
					path="/admin"
					component={Dashboard}
					authenticated={authenticated}></PublicRoute>
			</Switch>
		</Router>
	);
};

export default App;
