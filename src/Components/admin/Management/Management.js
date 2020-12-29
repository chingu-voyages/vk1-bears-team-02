import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import { Component } from "react";
import ReactDOM from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from './Modal.js';

function Management() {
  const [FuncShowModal, setShowModal] = useState();
  const [info, setinfo] = useState("");


  async function re() {

    await axios.get("http://localhost:5000/users").then((response) => {
      const data = response.data
      const output = data.data
      setinfo(output)

    })
  }
  re()
  function buttonFunction(cell, row) {
    return <label>
      <button type="button"
        id="validatebutton"
        onClick={() => { validateFunction(row); showModal() }}
        className="bbtn btn-primary btn-sm">
        Edit
			   </button>
    </label>
  }
  const columns = [
    {
      dataField: "username",
      text: "Username",
      sort: true
    },
    {
      dataField: "email",
      text: "Email",
      sort: true
    },

    {
      dataField: "follow",
      text: "Actions",
      formatter: buttonFunction.bind(this),
      sort: true
    }
  ]
  function validateFunction(row) {
    localStorage.setItem("adminsideusername", row.username)
  }
  function showModal() {
    setShowModal(true)
  };

  function hideModal() {
    setShowModal(false)
    console.log("clicked")
  };
  const [status, setStatus] = useState("openedSidebar");
  return (
    <main className="admin-page-container flex-wrap">
      <Nav status={status} setStatus={setStatus} />
      <div className="d-flex h-100">
        <Sidebar status={status} />
        <Modal show={FuncShowModal} handleClose={hideModal}>
        </Modal>
        <div style={{ padding: "20px" }}>
          <h1 className="h2">Users</h1>
          <BootstrapTable
            keyField="id"
            data={info}
            columns={columns}
          />

        </div>
      </div>
    </main>
  );
}

export default Management;

// class Management extends Component {
//   constructor() {
//     super();
//     this.showModal = this.showModal.bind(this);
//     this.hideModal = this.hideModal.bind(this);
//     this.state = {
//       // For displaying data
//       columns: [
//         {
//           dataField: "username",
//           text: "Username",
//           sort: true
//         },
//         {
//           dataField: "email",
//           text: "Email",
//           sort: true
//         },

//         {
//           dataField: "follow",
//           text: "Actions",
//           formatter: this.buttonFunction.bind(this),
//           sort: true
//         }
//       ],
//       isFollow: true,
//       data: "",
//       status:""
//     };

//   }

//   showModal = () => {
//     this.setState({ show: true });
//   };

//   hideModal = () => {
//     this.setState({ show: false });
//   };
//   re() {

//     axios.get("http://localhost:5000/users").then((response) => {
//       const data = response.data
//       const output = data.data
//       this.setState({ data: output })
//     })
//   }
//   _validateFunction(row) {
//     localStorage.setItem("userID", row._id)
//   }
//   buttonFunction(cell, row) {
//     return <label>
//       <button type="button"
//         id="validatebutton"
//         onClick={() => { this._validateFunction(row); this.showModal() }}
//         className="bbtn btn-primary btn-sm">
//         Edit
// 			   </button>
//     </label>
//   }

//   render() {
//     this.re()
//     return (
//       <main className="admin-page-container flex-wrap">
//         <Nav status={status} setStatus={setStatus} />
//         <div className="d-flex h-100">
//           <Sidebar status={status} />
//           <Modal show={this.state.show} handleClose={this.hideModal}>
//             <p>Modal</p>
//           </Modal>
//           <div style={{ padding: "20px" }}>
//             <h1 className="h2">Users</h1>
//             <BootstrapTable
//               keyField="id"
//               data={this.state.data}
//               columns={this.state.columns}
//             />

//           </div>
//         </div>
//       </main>

//     );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Management />, rootElement);

// export default Management;

