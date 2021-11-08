import React, { useEffect, useState } from "react";
import "./profile.css";
import { useHistory } from "react-router-dom";
// import coverimg from "../../image/profiledemo/profileback.jpg";
// import profileimg from "../../image/profiledemo/profile.jpg";
import Timeline from "./Timeline";
import Tag from "./Tag";
import Card from "../common/Card";
import livesinicon from "../../image/about/livein.png";
import relationshipicon from "../../image/about/relationship.png";
import professionicon from "../../image/about/profession.png";
const Profile = () => {
  document.title = "Profile";
  const [showComponent, setShowComponent] = useState(<Timeline />);

  const userDetails = JSON.parse(localStorage.getItem("userData"));

  const history = useHistory();

  return (
    <>
      <div className="container">
        <div className="profile-main">
          <div className="d-flex justify-content-center flex-column align-items-center dp-bio">
            <img
              src={userDetails.profilePicture}
              alt=""
              className="image-fluid profile-logo"
            />
            <span>
              Edit
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="20pt"
                height="20pt"
                viewBox="0 0 64.000000 64.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                  fill="#ffffff"
                  stroke="none"
                >
                  <path
                    d="M505 590 c-4 -6 -15 -14 -24 -18 -9 -4 -65 -60 -125 -125 -102 -111
                    -109 -122 -121 -178 -16 -74 -8 -80 69 -53 46 17 66 34 157 134 57 63 113 132
                    124 152 19 37 19 38 -1 65 -22 29 -67 42 -79 23z m46 -46 c12 -14 11 -16 -5
                    -13 -11 2 -21 10 -24 17 -5 17 13 15 29 -4z m-46 -44 c17 -19 16 -21 -28 -72
                    -109 -125 -153 -168 -180 -174 -27 -6 -28 -5 -21 22 4 16 37 62 73 102 36 40
                    79 89 94 108 34 40 38 41 62 14z"
                  />
                  <path
                    d="M65 495 c-25 -24 -25 -26 -25 -215 0 -257 -18 -240 245 -240 249 0
                    237 -8 233 158 -2 96 -6 117 -18 117 -12 0 -16 -22 -20 -115 l-5 -115 -184 -3
                    c-127 -2 -188 1 -197 9 -19 15 -20 359 -2 377 8 8 49 12 120 12 101 0 108 1
                    108 20 0 19 -7 20 -115 20 -110 0 -117 -1 -140 -25z"
                  />
                </g>
              </svg>
            </span>
          </div>
          <div className="profile-img rounded flex-column align-items-end d-flex ">
            <img
              src={userDetails.coverPicture}
              alt=""
              className="image-fluid cover-img"
            />
            <span
              style={{
                zIndex: "9999999",
                border: "1px solid #fffff0",
              }}
            >
              Edit
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="20pt"
                height="20pt"
                viewBox="0 0 64.000000 64.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                  fill="#ffffff"
                  stroke="none"
                >
                  <path
                    d="M505 590 c-4 -6 -15 -14 -24 -18 -9 -4 -65 -60 -125 -125 -102 -111
                    -109 -122 -121 -178 -16 -74 -8 -80 69 -53 46 17 66 34 157 134 57 63 113 132
                    124 152 19 37 19 38 -1 65 -22 29 -67 42 -79 23z m46 -46 c12 -14 11 -16 -5
                    -13 -11 2 -21 10 -24 17 -5 17 13 15 29 -4z m-46 -44 c17 -19 16 -21 -28 -72
                    -109 -125 -153 -168 -180 -174 -27 -6 -28 -5 -21 22 4 16 37 62 73 102 36 40
                    79 89 94 108 34 40 38 41 62 14z"
                  />
                  <path
                    d="M65 495 c-25 -24 -25 -26 -25 -215 0 -257 -18 -240 245 -240 249 0
                    237 -8 233 158 -2 96 -6 117 -18 117 -12 0 -16 -22 -20 -115 l-5 -115 -184 -3
                    c-127 -2 -188 1 -197 9 -19 15 -20 359 -2 377 8 8 49 12 120 12 101 0 108 1
                    108 20 0 19 -7 20 -115 20 -110 0 -117 -1 -140 -25z"
                  />
                </g>
              </svg>
            </span>
          </div>

          <h2 className="text-center  fw-2 mt-5">{userDetails.profileName}</h2>
          <p className=" text-center  rounded my-2">{userDetails.bio}</p>
          <div className="profile-stats">
            <div className="w-25  d-flex flex-column text-center mx-1">
              <span className="fs-4">
                {userDetails.followers !== undefined
                  ? userDetails.followers
                  : 0}
              </span>
              <span className="follower-stat btn btn-primary my-2">
                Followers
              </span>
            </div>
            <div className="w-25 d-flex flex-column text-center mx-1">
              <span className="fs-4">
                {userDetails.following !== undefined || null
                  ? userDetails.following
                  : 0}
              </span>

              <span className="following-stat btn btn-primary my-2">
                Following
              </span>
            </div>
            <div className="w-25 d-flex flex-column text-center mx-1">
              <span className="fs-4">
                {userDetails.post !== undefined || null ? userDetails.post : 0}
              </span>
              <span className="post-stat btn btn-primary my-2">Post</span>
            </div>
          </div>

          <div className="navbar profile-nav">
            <div className="container-fluid">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row justify-content-evenly w-50 ">
                <li className="nav-item">
                  <button
                    className="nav-link fw-bold text-secondary btn px-2"
                    aria-current="page"
                    onClick={() => {
                      setShowComponent(<Timeline />);
                    }}
                  >
                    Timeline
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link fw-bold text-secondary btn px-2"
                    onClick={() => {
                      setShowComponent(<Card />);
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
    </>
  );
};

export default Profile;
