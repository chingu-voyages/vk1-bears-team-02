import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "./reports.css";

const data = [
  { id: 1, name: "John", type: "fire", dateReported: "yesterday" },
  { id: 2, name: "Carl", type: "flood", dateReported: "today" },
  { id: 3, name: "Carl", type: "flood", dateReported: "today" },
  { id: 4, name: "Carl", type: "flood", dateReported: "today" },
  { id: 5, name: "Carl", type: "flood", dateReported: "today" },
  { id: 6, name: "Carl", type: "flood", dateReported: "today" },
  { id: 7, name: "Carl", type: "flood", dateReported: "today" },
  { id: 8, name: "Carl", type: "flood", dateReported: "today" },
  { id: 9, name: "Carl", type: "flood", dateReported: "today" },
  { id: 10, name: "Carl", type: "flood", dateReported: "today" },
  { id: 11, name: "Carl", type: "flood", dateReported: "today" },
];

const columns = [
  { dataField: "name", text: "Name" },
  { dataField: "type", text: "Type" },
  { dataField: "dateReported", text: "Date Reported" },
];

function Reports() {
  const [status, setStatus] = useState("openedSidebar");
  return (
    <>
      <main className="admin-page-container flex-wrap">
        <Nav status={status} setStatus={setStatus} />
        <div className="d-flex h-100">
          <Sidebar status={status} />
          <div className="data-table">
            <BootstrapTable
              keyField="id"
              columns={columns}
              data={data}
              pagination={paginationFactory()}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Reports;
