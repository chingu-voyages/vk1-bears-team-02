import React from "react";
import { Link } from "react-router-dom";
import "./main.css";

const Main = () => {
  return (
    <>
      <main className="page-container">
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
          <Button name="Create Account" link="/register" />
          <Button name="Login" link="/login" />
          <Button name="About" link="/about" />
        </div>
      </div>
    </div>
  );
};

const Button = ({ name, link }) => {
  return (
    <Link to={link}>
      <button className="button">{name}</button>
    </Link>
  );
};

const Footer = () => {
  return <footer>Copyright &#169; 2020. All rights reserved.</footer>;
};

export default Main;
