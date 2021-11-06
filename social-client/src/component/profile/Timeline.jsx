import React, { useState, useEffect } from "react";
import Post from "../post/Post";

const Timeline = () => {
  const [timelinedata, setTimelinedata] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const getprofiledata = async () => {
      try {
        const url = "/profilefeed/timeline";

        let option = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            userid: userDetails._id,
          },
        };
        const response = await fetch(url, option);

        const data = await response.json();

        // console.log(data);

        setTimelinedata(data.message);
      } catch (err) {
        console.log(err);
      }
    };
    getprofiledata();
  }, [userDetails._id]);

  // console.log(timelinedata);
  return (
    <>
      {timelinedata.length > 0
        ? timelinedata.map((value, index) => {
            return (
              <Post mainid={value.userid} postid={value.postid} key={index} />
            );
          })
        : "You Haven't posted yet."}
    </>
  );
};

export default Timeline;
