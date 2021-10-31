import React from "react";
import "./common.css";
const Popup = (props) => {
  return (
    <>
      <div className="popup d-flex flex-column m-2 p-2">
        <div className="popup-message w-50 bg-primary p-2">
          <p className="text-light fs-3 text-center">{props.message}</p>
        </div>
      </div>
    </>
  );
};

export default Popup;
