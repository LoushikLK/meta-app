import React, { useEffect, useState } from "react";
import "./profile.css";
import { useHistory } from "react-router-dom";
// import coverimg from "../../image/profiledemo/profileback.jpg";
// import profileimg from "../../image/profiledemo/profile.jpg";
import Timeline from "./Timeline";
import Tag from "./Tag";
import Card from "../common/Card";
const Profile = () => {
  document.title = "Profile";
  const [showComponent, setShowComponent] = useState(<Timeline />);

  const userDetails = JSON.parse(localStorage.getItem("userData"));

  const history = useHistory();

  return (
    <>
      <div className="container">
        <div className="profile-main">
          <div className="d-flex justify-content-center dp-bio">
            <img
              src={userDetails.profilePicture}
              alt=""
              className="image-fluid profile-logo"
            />
          </div>
          <div className="profile-img rounded">
            <img
              src={userDetails.coverPicture}
              alt=""
              className="image-fluid cover-img"
            />
          </div>

          <h2 className="text-center text-dark fw-2 mt-5">
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
                <span className="profile-livesIn">
                  Lives In
                  {userDetails.about.location}
                </span>
                <span className="profile-job">
                  Profession
                  {userDetails.about.profession}
                </span>
                <span className="profile-relationship">
                  Relationship Status
                  {userDetails.about.relationshipStatus}
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
