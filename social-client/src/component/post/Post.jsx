import React, { useState, useEffect } from "react";
import "./post.css";
import likeIcon from "../../image/post-ui/like.png";
import commentIcon from "../../image/post-ui/comment.png";
import shareIcon from "../../image/post-ui/share.png";
import { useHistory } from "react-router-dom";
import Loading from "../common/Loading";
const Post = (props) => {
  // console.log(props.postid);
  // console.log(props.mainid);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const userDetails = JSON.parse(localStorage.getItem("userData"));

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

  useEffect(() => {
    const getapidata = async () => {
      setLoading(true);
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

        if (response.status === 200) {
          setApidata(data.message);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getapidata();
  }, [props.postid, props.mainid]);

  // console.log(apidata);
  // console.log(apidata.post.liked);
  const likedfn = async (userid, postid) => {
    console.log("user liked " + postid);
    if (userid === null || postid === null || userDetails._id === null) {
      history.push("/login");
      return;
    }
    try {
      const url = "/userintraction/liked";

      const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          mainuser: userDetails._id,
        },
        body: JSON.stringify({
          userid: userid,
          postid: postid,
        }),
      };

      const response = await fetch(url, option);

      // const data = await response.json();

      if (response.status === 200) {
        setCount(count + 1);
      }

      // console.log(data.message);
    } catch (err) {
      // console.log(err);
    }
  };

  const [commentText, setCommentText] = useState("");
  const [showmessageBox, setShowmessageBox] = useState(false);

  const commentfn = async (userid, postid) => {
    if (userid === null || postid === null || userDetails._id === null) {
      history.push("/login");
      return;
    }
    try {
      const url = "/userintraction/comment";

      const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          mainuser: userDetails._id,
        },
        body: JSON.stringify({
          userid: userid,
          postid: postid,
          textcomment: commentText,
        }),
      };

      const response = await fetch(url, option);

      if (response.status !== 200) {
        alert("Something went wrong");
        return;
      }

      // const data = await response.json();

      // console.log(data.message);
      setShowmessageBox(false);
      setCommentText("");
    } catch (err) {
      // console.log(err);
    }
  };

  const sharefn = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${userDetails.profileName} on META.`,
          text: "findme on meta",
          url: "http://metaaa.herokuapp.com/user/" + userDetails.profileName,
        })
        .then(() => {
          // console.log("shared");
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  return (
    <>
      {apidata.post.postUri ? (
        <div className=" post-main my-1">
          <div className="d-flex w-100 align-items-center ms-1">
            <img
              src={apidata.profileimg}
              alt=""
              className="profile-logo image-fluid"
              style={{ height: "40px", width: "40px" }}
            />
            <div className="post-detail-main">
              <span className=" ms-1">{apidata.profilename}</span>
              <small className="text-secondary ms-1">
                {apidata.post ? apidata.post.location : ""}
              </small>
            </div>
          </div>
          <div className="post-img w-100 px-2">
            {loading ? (
              <Loading />
            ) : (
              <img
                src={apidata.post ? apidata.post.postUri : ""}
                alt=""
                className="image-fluid w-100  rounded"
                loading="lazy"
              />
            )}
          </div>

          <div className="post-interaction w-100">
            <span
              onClick={() => {
                likedfn(props.mainid, props.postid);
              }}
            >
              <img src={likeIcon} alt="" className="interaction-icon" />
            </span>
            <span
              onClick={() => {
                if (showmessageBox === false) {
                  setShowmessageBox(true);
                } else {
                  setShowmessageBox(false);
                }
              }}
            >
              <img src={commentIcon} alt="" className="interaction-icon" />
            </span>
            <span onClick={sharefn}>
              <img src={shareIcon} alt="" className="interaction-icon" />
            </span>
          </div>
          {showmessageBox ? (
            <div className="comment-box w-100">
              <form>
                <textarea
                  name="commentText"
                  style={{ width: "100%" }}
                  rows="2"
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                  required
                >
                  {" "}
                </textarea>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    commentfn(props.mainid, props.postid);
                  }}
                >
                  Comment
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="post-comment-section w-100 px-2">
                <div className="post-liked">
                  <span className=" ">Liked by </span>
                  <span className="text-secondary">
                    {apidata.post && apidata.post.liked[0]
                      ? apidata.post.liked[0].name
                      : ""}{" "}
                  </span>
                  and{" "}
                  <span className="text-secondary">
                    {apidata.post && apidata.post.liked.length > 0
                      ? apidata.post.liked.length - 1 + count
                      : 0}{" "}
                  </span>
                  others
                </div>
                <div className="post-desc">
                  <span className="post-owner  me-1">
                    {apidata.profilename}
                  </span>
                  <span className="text-secondary">
                    {""} {apidata.post ? apidata.post.postCaption : ""}
                  </span>
                </div>

                <div className="comments">
                  <span className="post-commenter  me-1">
                    {apidata.post && apidata.post.postComments[0]
                      ? apidata.post.postComments[0].name
                      : "no comments "}
                  </span>
                  <span className="text-secondary">
                    {apidata.post && apidata.post.postComments[0]
                      ? apidata.post.postComments[0].comments
                      : ""}
                  </span>
                </div>
              </div>
              <div className="post-upload-date w-100 px-2">
                {apidata.post ? apidata.post.postDate : ""}
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
      {/* ///////////////////// for data adding through props///////////////// */}
      {/* <div className=" post-main my-1">
        <div className="d-flex w-100 align-items-center ms-1">
          <img
            src={props.profileimg}
            alt=""
            className="profile-logo image-fluid"
            style={{ height: "40px", width: "40px" }}
          />
          <div className="post-detail-main">
            <span className="fw-bold ms-1">{props.profilename}</span>
            <span className="fst-italic ms-1">
              {apidata.post ? apidata.post.location : ""}
            </span>
          </div>
        </div>
        <div className="post-img w-100">
          <img src={props.postimg} alt="" className="image-fluid w-100" />
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
        <div className="post-upload-date w-100 px-2">{props.postdate}</div>
      </div> */}
    </>
  );
};

export default Post;
