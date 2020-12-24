import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import MapView from "../../MapView/MapView";

import axios from "axios";

import Pusher from "pusher-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
	const [status, setStatus] = useState("openedSidebar");

	useEffect(() => {
		// const getLatestMapData = async()=>{

		//   const data = await axios.get(`http://localhost:5000/map-data`);
		// }

		Pusher.logToConsole = true;

		const pusher = new Pusher("b74a80c7be8fd2b220d7", {
			cluster: "us3",
		});

		const channel = pusher.subscribe("map-data-create");
		channel.bind("map-data-create-event", function (data) {
			toast.error("new distress call has been sent");
		});

		const channel2 = pusher.subscribe("map-data-update");
		channel2.bind("map-data-update-event", function (data) {
			if (data.data.status === "acknowledge") {
				toast.info(`Update status to ${data.data.status}`);
			} else {
				toast.success(`Update status to ${data.data.status}`);
			}
		});
	}, []);
	return (
		<main className="admin-page-container flex-wrap">
			<Nav status={status} setStatus={setStatus} />
			<div className="d-flex h-100">
				<Sidebar status={status} />
				<div style={{ height: "100%", width: "100%" }}>
					<MapView />
					<ToastContainer />
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
