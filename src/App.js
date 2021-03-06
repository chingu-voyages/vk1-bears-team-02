import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./Components/Main/Main";
import { Login } from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import About from "./Components/About/About";
import Flood from "./Components/user/Flood/Flood";
import Fire from "./Components/user/Fire/Fire";
import Earthquake from "./Components/user/Earthquake/Earthquake";
import Profile from "./Components/user/Profile/Profile";
import Edit from "./Components/user/Profile/Edit/Edit";
import Map from "./Components/user/Map/Map";
import Dashboard from "./Components/admin/Dashboard/Dashboard";
import Reports from "./Components/admin/Reports/Reports";
import Analytics from "./Components/admin/Analytics/Analytics";
import Management from "./Components/admin/Management/Management";
import AdminLogin from "./Components/admin/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

// Routes
import PublicRoute from "./Components/routes/PublicRoute";
import PrivateRoute from "./Components/routes/PrivateRoute";

import { AuthenticationProvider } from "./Components/context/AuthenticationContext";

const App = () => {
	return (
		<Router>
			<Switch>
				<AuthenticationProvider>
					<PublicRoute exact path="/" component={Main}></PublicRoute>
					<PublicRoute exact path="/Login" component={Login}></PublicRoute>
					<PublicRoute exact path="/login/:id" component={Login}></PublicRoute>
					<PublicRoute exact path="/about" component={About}></PublicRoute>
					<PublicRoute
						exact
						path="/Register"
						component={Register}></PublicRoute>
					<PrivateRoute
						exact
						path="/user/flood"
						component={Flood}></PrivateRoute>
					<PrivateRoute exact path="/user/fire" component={Fire}></PrivateRoute>
					<PrivateRoute
						exact
						path="/user/earthquake"
						component={Earthquake}></PrivateRoute>
					<PrivateRoute exact path="/user" component={Profile}></PrivateRoute>
					<PrivateRoute exact path="/user/edit" component={Edit}></PrivateRoute>
					<PrivateRoute exact path="/user/map" component={Map}></PrivateRoute>
					<PrivateRoute
						exact
						path="/admin"
						component={Dashboard}></PrivateRoute>
					<PrivateRoute
						exact
						path="/admin/reports"
						component={Reports}></PrivateRoute>
					<PrivateRoute
						exact
						path="/admin/analytics"
						component={Analytics}></PrivateRoute>
					<PrivateRoute
						exact
						path="/admin/management"
						component={Management}></PrivateRoute>
					<PrivateRoute
						exact
						path="/admin/login"
						component={AdminLogin}></PrivateRoute>
				</AuthenticationProvider>
			</Switch>
		</Router>
	);
};

export default App;
