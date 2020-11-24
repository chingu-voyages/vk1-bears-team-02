import React from "react";
import "./main.css";
const Main = () => {
  return (
    <>
      <main className="main">
        <TopHalf />
        <Button name="Create Account" />
      </main>
    </>
  );
};

const TopHalf = () => {
  return (
    <div className="top-half container">
      <div className="row">
        <div className="col-12 logo-wrapper">
          <h1>e-Sagip</h1>
          <p className="sub-title">One click away to get help.</p>
        </div>
      </div>
    </div>
  );
};

const Button = ({ name }) => {
  return (
    <a href="#">
      <button className="button">{name}</button>
    </a>
  );
};

export default Main;
