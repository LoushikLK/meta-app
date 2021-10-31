import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import UploadToogleUi from "../upload-ui/UploadToogleUi";
import Chatfeed from "./Chatfeed";
import Sugesstionfeed from "./Sugesstionfeed";
const Homefeed = () => {
  const [api, setApi] = useState([]);
  document.title = "Home";

  useEffect(() => {
    const getapidata = async () => {
      const response = await fetch("/test");

      const data = await response.json();

      setApi(data.message);

      // console.log(data);
    };
    getapidata();
  }, []);

  //new id concept use in home to show new post upto 2 days
  return (
    <>
      <div className="container pt-5">
        <div className="row ">
          <div className="col home-extras">
            <section className="home-sugestion">
              <h3 className="text-secondary">People You May Know</h3>
              <hr />
              <div className="home-sugestion-people">
                {api.map((value, index) => {
                  return (
                    <Sugesstionfeed sugessteduser={value._id} key={value._id} />
                  );
                })}
              </div>
              <hr />
              <small>&copy; Meta inc. </small>
              <small> &reg;Loushik all right reserved.</small>
            </section>
          </div>
          <div className="col-6 mx-3 home-timeline">
            <UploadToogleUi />
            {api !== null && api !== undefined
              ? api.map((value, index) => {
                  return value.post.map((data, index) => {
                    return (
                      <Post postid={data._id} mainid={value._id} key={index} />
                    );
                  });
                })
              : ""}
          </div>
          <div className="col home-extras">
            <Chatfeed />
          </div>
        </div>
      </div>

      {/* <div className="container pt-5">
        <div className="row">
          <div className="col">
            <Sugesstionfeed />
          </div>
          <div className="col-6 mx-3">
            <UploadToogleUi />
            <Post id={}/>
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          <div className="col">
            <Chatfeed />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Homefeed;
