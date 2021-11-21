import React from "react";
import "./common.css";
const Popup = (props) => {
  return (
    <>
      <div className="popup">
        <div className="popup-inner">
          <div
            className="popup-message"
            style={{
              backgroundColor: `${
                props.backgroundColor === "danger" ? "#d70000a3" : "#ffffff"
              }`,
            }}
          >
            <p className=" fs-3 m-1 text-center popup-box ">{props.message}</p>
            {/* <button className="btn btn-primary w-100 l-0">OK</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
