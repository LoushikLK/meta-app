import React, { useState, useEffect } from "react";
import "./common.css";
const Card = (props) => {
  const [carddata, setCarddata] = useState([]);

  useEffect(() => {
    const getprofiledata = async () => {
      try {
        const url = "/profilefeed/card";

        let option = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            userid: props.userid,
          },
        };
        const response = await fetch(url, option);

        const data = await response.json();

        // console.log(data);

        setCarddata(data.message);
      } catch (err) {
        // console.log(err);
      }
    };
    getprofiledata();
  }, [props.userid]);

  // console.log(carddata);
  return (
    <>
      <div className="container">
        <div className="gallery m-2">
          {carddata.length > 0
            ? carddata.map((value, index) => {
                return (
                  <a href={value} key={index}>
                    <img src={value} alt="" />
                  </a>
                );
              })
            : "Oops no post .Post something."}
        </div>
      </div>
    </>
  );
};

export default Card;
