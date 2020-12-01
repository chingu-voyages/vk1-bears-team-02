import React from "react";

import "./helpButton.css";

const HelpButton = () => {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <div className="help-button-wrapper" onClick={handleClick}>
        <div className="help-button d-flex justify-content-center align-items-center flex-column">
          <h2>Click to get help!</h2>
        </div>
      </div>
    </>
  );
};

export default HelpButton;
