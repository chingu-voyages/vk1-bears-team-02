import React from "react";
import Nav from "../Nav/Nav";

function Flood({ authenticated, setAuthenticated }) {
  return (
    <main className="page-container">
      <Nav authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </main>
  );
}

export default Flood;
