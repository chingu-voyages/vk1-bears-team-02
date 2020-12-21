import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";

function Management() {
  const [status, setStatus] = useState("openedSidebar");
  return (
    <main className="admin-page-container flex-wrap">
      <Nav status={status} setStatus={setStatus} />
      <div className="d-flex h-100">
        <Sidebar status={status} />
        {/* <div>Placeholder</div> */}
      </div>
    </main>
  );
}

export default Management;
