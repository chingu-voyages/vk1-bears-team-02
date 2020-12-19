import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import MapView from "../../MapView/MapView";

function Dashboard() {
  const [status, setStatus] = useState("openedSidebar");
  return (
    <main className="admin-page-container flex-wrap">
      <Nav status={status} setStatus={setStatus} />
      <div className="d-flex h-100">
        <Sidebar status={status} />
        <div style={{ height: "100%", width: "100%" }}>
          <MapView />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
