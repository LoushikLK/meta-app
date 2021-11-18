import React, { useState, useEffect } from "react";
import Loading from "../common/Loading";
import Post from "../post/Post";

const Timeline = (props) => {
  const [timelinedata, setTimelinedata] = useState([]);
  const [loading, setLoading] = useState(false);

  // const userDetails = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const getprofiledata = async () => {
      try {
        setLoading(true);
        const url = "/profilefeed/timeline";

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
        if (response.status === 200) {
          setTimelinedata(data.message);
        }
        setLoading(false);
      } catch (err) {
        // console.log(err);
      }
    };
    getprofiledata();
  }, [props.userid]);

  // console.log(timelinedata);
  return (
    <>
      {loading ? <Loading /> : null}
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
