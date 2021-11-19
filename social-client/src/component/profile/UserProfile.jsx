import React, { useEffect, useState } from "react";
import "./profile.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Timeline from "./Timeline";
import Tag from "./Tag";
import Card from "../common/Card";
import livesinicon from "../../image/about/livein.png";
import relationshipicon from "../../image/about/relationship.png";
import professionicon from "../../image/about/profession.png";
// import Metaloading from "../common/Metaloading";

const UserProfile = (props) => {
  document.title = "user";
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({});

  const param = useParams();

  const username = param.username;

  useEffect(() => {
    const getprofiledata = async () => {
      if (username === null) {
        return null;
      }
      try {
        const res = await axios.get(`/getuser/${username}`);
        // console.log(res.data);
        if (res.status === 200) {
          setUserDetails(res.data.message);
          setShowComponent(<Timeline userid={res.data.message._id} />);
        } else if (res.status !== 200) {
          history.push("/pagedoesnotexist");
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getprofiledata();
  }, [username, history]);

  //   console.log(username);

  const [showComponent, setShowComponent] = useState(null);

  return (
    <>
      {userDetails._id === null || userDetails._id === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <div className="profile-main">
            <div className="d-flex justify-content-center flex-column align-items-center dp-bio">
              <img
                src={userDetails.profilePicture}
                alt=""
                className="image-fluid profile-logo"
              />
            </div>

            <div className="profile-img rounded flex-column align-items-end d-flex mb-4 ">
              <img
                src={userDetails.coverPicture}
                alt=""
                className="image-fluid cover-img"
              />
            </div>

            <h2 className="text-center  fw-2 mt-1">
              {userDetails.profileName}
            </h2>
            <p className=" text-center  rounded my-2">{userDetails.bio}</p>
            <div className="profile-stats">
              <div className="w-25  d-flex flex-column text-center mx-1">
                <span className="fs-4">
                  {userDetails.followers !== undefined
                    ? userDetails.followers
                    : 0}
                </span>
                <span className="follower-stat text-primary my-2 fs-5">
                  Followers
                </span>
              </div>
              <div className="w-25 d-flex flex-column text-center mx-1">
                <span className="fs-4">
                  {userDetails.following !== undefined || null
                    ? userDetails.following
                    : 0}
                </span>

                <span className="following-stat text-primary my-2 fs-5">
                  Following
                </span>
              </div>
              <div className="w-25 d-flex flex-column text-center mx-1">
                <span className="fs-4">
                  {userDetails.post !== undefined || null
                    ? userDetails.post
                    : 0}
                </span>
                <span className="post-stat text-primary my-2 fs-5">Post</span>
              </div>
            </div>

            <div className="navbar profile-nav">
              <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row profile-tab ">
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold text-secondary btn px-2"
                      aria-current="page"
                      onClick={() => {
                        setShowComponent(<Timeline userid={userDetails._id} />);
                      }}
                    >
                      Timeline
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold text-secondary btn px-2"
                      onClick={() => {
                        setShowComponent(<Card userid={userDetails._id} />);
                      }}
                    >
                      Posts
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold text-secondary btn px-2"
                      onClick={() => {
                        setShowComponent(<Tag />);
                      }}
                    >
                      Tags
                    </button>
                  </li>
                </ul>

                <button className="btn btn-primary px-3">
                  <span
                    style={{ background: "none" }}
                    onClick={() => {
                      history.push("/post");
                    }}
                  >
                    What's On Your Mind?
                  </span>
                </button>
              </div>
            </div>

            <div className="post-container  my-2">
              <div className="row w-100">
                <div className="col-8 profile-post-main">{showComponent}</div>
                <div className="col-4 profile-about p-4">
                  <h2 className="profile-about-head text-center">About</h2>
                  <span className="profile-livesIn py-2">
                    <span>
                      {" "}
                      <img
                        src={livesinicon}
                        alt=""
                        style={{ width: "30px", verticalAlign: "buttom" }}
                      />{" "}
                    </span>{" "}
                    Lives In - {userDetails.about.location}
                  </span>
                  <span className="profile-job py-2">
                    <span>
                      {" "}
                      <img
                        src={professionicon}
                        alt=""
                        style={{ width: "30px", verticalAlign: "buttom" }}
                      />{" "}
                    </span>{" "}
                    Profession - {userDetails.about.profession}
                  </span>
                  <span className="profile-relationship py-2">
                    <span>
                      {" "}
                      <img
                        src={relationshipicon}
                        alt=""
                        style={{ width: "30px", verticalAlign: "buttom" }}
                      />{" "}
                    </span>{" "}
                    Relationship Status - {userDetails.about.relationshipStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
