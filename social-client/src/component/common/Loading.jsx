import React from "react";
import loading from "../../image/loading/loadinggif.gif";

const Loading = () => {
  return (
    <div className="w-100 d-flex align-items-center justify-content-center">
      <img src={loading} alt="loading" className="img-fluid" />
    </div>
  );
};

export default Loading;
