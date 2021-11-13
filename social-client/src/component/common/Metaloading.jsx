import React from "react";

const Metaloading = (props) => {
  return (
    <div style={{ backgroundColor: "#00000000" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        // style="margin: auto; background: rgb(241, 242, 243); display: block; shape-rendering: auto;"
        style={{
          margin: "auto",
          background: "#00000000",
          display: "block",
          shapeRendering: "auto",
        }}
        width={props.width}
        height={props.height}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path
          fill="#00000000"
          stroke="#ffffff"
          strokeWidth="6"
          strokeDasharray="207.83703186035157 48.75189636230468"
          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
          strokeLinecap="round"
          //   style="transform:scale(0.87);transform-origin:50px 50px"
          style={{ transform: "scale(0.87)", transformOrigin: "50px 50px" }}
        >
          <animate
            attributeName="stroke-dashoffset"
            repeatCount="indefinite"
            dur="1.1764705882352942s"
            keyTimes="0;1"
            values="0;256.58892822265625"
          ></animate>
        </path>
      </svg>
    </div>
  );
};

export default Metaloading;
