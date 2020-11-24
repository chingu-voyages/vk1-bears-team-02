import React from "react";
import "./main.css";

const Main = () => {
  return (
    <>
      <main className="main">
        <TopHalf />
        <BottomHalf />
        <Footer />
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

const BottomHalf = () => {
  return (
    <div className="bottom-half container">
      <div className="row">
        <div className="col-12 button-wrapper">
          <Button name="Create Account" />
          <Button name="Login" />
          <Button name="About" />
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

const Footer = () => {
  return <footer>Copyright &#169; 2020. All rights reserved.</footer>;
};

export default Main;
