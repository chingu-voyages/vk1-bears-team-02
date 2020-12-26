import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";

import Chart from "../Chart/Chart";

function Analytics() {
	const [status, setStatus] = useState("openedSidebar");
	return (
		<main className="admin-page-container flex-wrap">
			<Nav status={status} setStatus={setStatus} />
			<div className="d-flex h-100">
				<Sidebar status={status} />
				{/* <div>Placeholder</div> */}

				<Chart />
			</div>
		</main>
	);
}

export default Analytics;
