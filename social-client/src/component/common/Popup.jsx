import React from "react";
import "./common.css";
const Popup = (props) => {
  return (
    <>
      <div className="popup">
        <div className="popup-inner">
          <h3 className="w-100 text-center bg-secondary m-0 py-2 rounded-top">
            {props.title}
          </h3>
          <div
            className="popup-message rounded-bottom"
            style={{
              backgroundColor: `${
                props.backgroundColor === "danger" ? "#d70000a3" : "#ffffff"
              }`,
            }}
          >
            <p className=" fs-3 m-0 text-center popup-box ">{props.message}</p>
            {/* <button className="btn btn-primary w-100 l-0">OK</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
