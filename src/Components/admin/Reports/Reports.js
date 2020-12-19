import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import { DataGrid } from "@material-ui/data-grid";

const rows: RowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "XGrid", col2: "is Awesome" },
  { id: 3, col1: "Material-UI", col2: "is Amazing" },
  { id: 4, col1: "Hello", col2: "World" },
  { id: 5, col1: "XGrid", col2: "is Awesome" },
  { id: 6, col1: "Material-UI", col2: "is Amazing" },
  { id: 7, col1: "Hello", col2: "World" },
  { id: 8, col1: "XGrid", col2: "is Awesome" },
  { id: 9, col1: "Material-UI", col2: "is Amazing" },
  { id: 10, col1: "Hello", col2: "World" },
  { id: 11, col1: "XGrid", col2: "is Awesome" },
  { id: 12, col1: "Material-UI", col2: "is Amazing" },
];

const columns: ColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
  // { field: "col3", headerName: "Column 1", width: 150 },
  // { field: "col4", headerName: "Column 2", width: 150 },
  // { field: "col5", headerName: "Column 1", width: 150 },
];

function Reports() {
  const [status, setStatus] = useState("openedSidebar");
  return (
    <>
      <main className="admin-page-container flex-wrap">
        <Nav status={status} setStatus={setStatus} />
        <div className="d-flex h-100">
          <Sidebar status={status} />
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid pageSize={5} rows={rows} columns={columns} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Reports;
