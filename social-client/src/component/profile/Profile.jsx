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
            <span
              style={{
                background: "#9b9b9b",
                padding: "0.2rem",
                borderRadius: "50%",
                position: "relative",
                top: "-34px",
              }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
                width="20pt"
                height="20pt"
                style={{ backgroundColor: "transparent" }}
              >
                <g>
                  <g fill="#000000">
                    <path d="m434.2,109.1h-89.7l-23.4-57.8c-3.1-7.7-10.6-12.8-18.9-12.8h-92.3c-8.3,0-15.8,5-18.9,12.8l-23.4,57.8h-89.8c-36.9,0-66.8,30-66.8,66.8v230.7c0,36.9 30,66.8 66.8,66.8h356.3c36.9,0 66.8-30 66.8-66.8v-230.7c0.1-36.8-29.9-66.8-66.7-66.8zm-210.6-29.8h64.8l12,29.7h-88.9l12.1-29.7zm236.6,327.3c0,14.3-11.7,26-26,26h-356.4c-14.3,0-26-11.7-26-26v-230.7c0-14.3 11.7-26 26-26h356.3c14.3,0 26,11.7 26,26v230.7z" />
                    <path d="m256,179.7c-61.5,0-111.6,50.1-111.6,111.6 0,61.6 50.1,111.6 111.6,111.6s111.6-50.1 111.6-111.6c0-61.6-50.1-111.6-111.6-111.6zm0,182.4c-39,0-70.8-31.8-70.8-70.8 0-39 31.8-70.8 70.8-70.8 39,0 70.8,31.8 70.8,70.8 0,39-31.8,70.8-70.8,70.8z" />
                  </g>
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
                position: "relative",
                bottom: "1rem",
              }}
              className="btn btn-primary"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
                width="20pt"
                height="20pt"
                style={{
                  backgroundColor: "transparent",
                  marginRight: "5px",
                }}
              >
                <g>
                  <g fill="#000000">
                    <path d="m434.2,109.1h-89.7l-23.4-57.8c-3.1-7.7-10.6-12.8-18.9-12.8h-92.3c-8.3,0-15.8,5-18.9,12.8l-23.4,57.8h-89.8c-36.9,0-66.8,30-66.8,66.8v230.7c0,36.9 30,66.8 66.8,66.8h356.3c36.9,0 66.8-30 66.8-66.8v-230.7c0.1-36.8-29.9-66.8-66.7-66.8zm-210.6-29.8h64.8l12,29.7h-88.9l12.1-29.7zm236.6,327.3c0,14.3-11.7,26-26,26h-356.4c-14.3,0-26-11.7-26-26v-230.7c0-14.3 11.7-26 26-26h356.3c14.3,0 26,11.7 26,26v230.7z" />
                    <path d="m256,179.7c-61.5,0-111.6,50.1-111.6,111.6 0,61.6 50.1,111.6 111.6,111.6s111.6-50.1 111.6-111.6c0-61.6-50.1-111.6-111.6-111.6zm0,182.4c-39,0-70.8-31.8-70.8-70.8 0-39 31.8-70.8 70.8-70.8 39,0 70.8,31.8 70.8,70.8 0,39-31.8,70.8-70.8,70.8z" />
                  </g>
                </g>
              </svg>
              Edit Cover Photo
            </span>
          </div>

          <h2 className="text-center  fw-2 mt-1">{userDetails.profileName}</h2>
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
