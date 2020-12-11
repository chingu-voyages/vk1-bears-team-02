import React from "react";
import swal from "sweetalert";

import "./helpButton.css";

const HelpButton = ({ logo }) => {
  const handleClick = () => {
    swal({
      title: "Distress Sent",
      text: "Your distress alert has been sent.",
      icon: "success",
    });
  };
  return (
    <>
      <div className="help-button-wrapper" onClick={handleClick}>
        <div className="help-button d-flex justify-content-center align-items-center flex-column">
          {logo}
          <h2>Click to get help!</h2>
        </div>
        <div class="help-button-outline"></div>
      </div>
    </>
  );
};

export default HelpButton;
