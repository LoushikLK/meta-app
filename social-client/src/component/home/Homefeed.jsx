import React, { useState, useEffect } from "react";
import Loading from "../Loading";
// import Post from "../post/Post";
import UploadToogleUi from "../upload-ui/UploadToogleUi";
import Chatfeed from "./Chatfeed";
import Sugesstionfeed from "./Sugesstionfeed";
const Homefeed = () => {
  const [api, setApi] = useState([]);
  document.title = "Home";

  const userDetails = JSON.parse(localStorage.getItem("userData"));

  // console.log(userDetails._id);

  useEffect(() => {
    const getapidata = async () => {
      let url = "/homefeed";

      let option = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: userDetails._id,
        },
      };
      const response = await fetch(url, option);

      const data = await response.json();

      if (response.status === 200) {
        setApi(data.message);
      }

      // console.log(data);
    };
    getapidata();
  }, [userDetails._id]);

  // console.log(api);

  //new id concept use in home to show new post upto 2 days
  const Post = React.lazy(() => import("../post/Post"));

  return (
    <>
      <div className="container pt-5">
        <div className="row ">
          <div className="col home-extras">
            <section className="home-sugestion">
              <h3 className="text-secondary">People You May Know</h3>
              <hr />
              <div className="home-sugestion-people">
                <Sugesstionfeed />
              </div>
              <hr />
              <small>&copy; Meta inc. </small>
              <small> &reg;Loushik all right reserved.</small>
            </section>
          </div>
          <div className="col-6 mx-3 home-timeline">
            <UploadToogleUi />
            {api !== null && api !== undefined && api !== String
              ? api.map((value, index) => {
                  return (
                    <React.Suspense fallback={<Loading />}>
                      <Post
                        postid={value.postid}
                        mainid={value.mainid}
                        key={index}
                      />
                    </React.Suspense>
                  );
                })
              : ""}
          </div>
          <div className="col home-extras">
            <Chatfeed />
          </div>
        </div>
      </div>

      {/* for sending all data needed for a post as props

      <div className="container pt-5">
        <div className="row ">
          <div className="col home-extras">
            <section className="home-sugestion">
              <h3 className="text-secondary">People You May Know</h3>
              <hr />
              <div className="home-sugestion-people">
                <Sugesstionfeed />
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
                  return (
                    <Post
                      postid={value.postid}
                      mainid={value.mainid}
                      postimg={value.posturl}
                      profileimg={value.profilePhoto}
                      profilename={value.name}
                      key={index}
                    />
                  );
                })
              : ""}
          </div>
          <div className="col home-extras">
            <Chatfeed />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Homefeed;
