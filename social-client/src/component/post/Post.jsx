import React, { useState, useEffect } from "react";
import "./post.css";
import likeIcon from "../../image/post-ui/like.png";
import commentIcon from "../../image/post-ui/comment.png";
import shareIcon from "../../image/post-ui/share.png";
const Post = (props) => {
  // console.log(props.postid);
  // console.log(props.mainid);

  const [apidata, setApidata] = useState({
    post: {
      postUri: "",
      location: "",
      liked: [{ name: "" }],
      postCaption: "",
      postComments: [{ name: "", comments: "" }],
      postDate: "",
    },
  });

  const getapidata = async () => {
    try {
      if (props.postid === null && props.mainid === null) {
        return;
      }
      const url = "/getpostdetails";

      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: props.mainid,
          postid: props.postid,
        }),
      };

      const response = await fetch(url, option);

      const data = await response.json();

      // console.log(data.message);

      setApidata(data.message);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getapidata();
  }, [props]);
  // console.log(apidata.post.postUri);
  return (
    <>
      <div className=" post-main my-1">
        <div className="d-flex w-100 align-items-center ms-1">
          <img
            src={apidata.profileimg}
            alt=""
            className="profile-logo image-fluid"
            style={{ height: "40px", width: "40px" }}
          />
          <div className="post-detail-main">
            <span className="fw-bold ms-1">{apidata.profilename}</span>
            <span className="fst-italic ms-1">
              {apidata.post ? apidata.post.location : ""}
            </span>
          </div>
        </div>
        <div className="post-img w-100">
          <img
            src={apidata.post ? apidata.post.postUri : ""}
            alt=""
            className="image-fluid w-100"
          />
        </div>
        <div className="post-interaction w-100">
          <img src={likeIcon} alt="" className="interaction-icon" />
          <img src={commentIcon} alt="" className="interaction-icon" />
          <img src={shareIcon} alt="" className="interaction-icon" />
        </div>
        <div className="post-comment-section w-100 px-2">
          <div className="post-liked">
            <span className="fw-bold ">Liked by </span>
            <span>
              {apidata.post && apidata.post.liked[0]
                ? apidata.post.liked[0].name
                : ""}{" "}
            </span>
            <span>
              and{" "}
              {apidata.post && apidata.post.liked
                ? apidata.post.liked.length - 1
                : 0}{" "}
              other
            </span>
          </div>
          <div className="post-desc">
            <span className="post-owner fw-bold me-1">
              {apidata.profilename}
            </span>
            <span>{apidata.post ? apidata.post.postCaption : ""}</span>
          </div>

          <div className="comments">
            <span className="post-commenter fw-bold me-1">
              {apidata.post && apidata.post.postComments[0]
                ? apidata.post.postComments[0].name
                : "no comments "}
            </span>
            <span>
              {apidata.post && apidata.post.postComments[0]
                ? apidata.post.postComments[0].comments
                : ""}
            </span>
          </div>
        </div>
        <div className="post-upload-date w-100 px-2">
          {apidata.post ? apidata.post.postDate : ""}
        </div>
      </div>

      {/* <div className=" post-main my-1">
        <div className="d-flex w-100 align-items-center ms-1">
          <img
            src={apidata.profileimg}
            alt=""
            className="profile-logo image-fluid"
            style={{ height: "40px", width: "40px" }}
          />
          <div className="post-detail-main">
            <span className="fw-bold ms-1">{apidata.profilename}</span>
            <span className="fst-italic ms-1">
              {apidata.post.location ? apidata.post.location : ""}
            </span>
          </div>
        </div>
        <div className="post-img w-100">
          <img
            src={apidata.post.postUri}
            alt=""
            className="image-fluid w-100"
          />
        </div>
        <div className="post-interaction w-100">
          <img src={likeIcon} alt="" className="interaction-icon" />
          <img src={commentIcon} alt="" className="interaction-icon" />
          <img src={shareIcon} alt="" className="interaction-icon" />
        </div>
        <div className="post-comment-section w-100 px-2">
          <div className="post-liked">
            <span className="fw-bold ">Liked by </span>
            <span>{apidata.post.liked[0]} </span>
            <span>
              and {apidata.post.liked.length ? apidata.post.liked.length : 0}{" "}
              other
            </span>
          </div>
          <div className="post-desc">
            <span className="post-owner fw-bold me-1">
              {apidata.profilename}
            </span>
            <span>
              {apidata.post.postCaption ? apidata.post.postCaption : ""}
            </span>
          </div>
          {apidata.post.postComments.map((value, index) => {
            return (
              <div className="comments">
                <span className="post-commenter fw-bold me-1">
                  {apidata.post.postComments[0].name
                    ? apidata.post.postComments[0].name
                    : "no comments "}
                </span>
                <span>
                  {apidata.post.postComments[0].comments
                    ? apidata.post.postComments[0].comments
                    : ""}
                </span>
              </div>
            );
          })}
        </div>
        <div className="post-upload-date w-100 px-2">
          {apidata.post.postDate}
        </div>
      </div> */}
    </>
  );
};

export default Post;
