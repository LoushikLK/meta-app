import React, { useState } from "react";
import "./profile.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import coverimg from "../../image/profiledemo/profileback.jpg";
// import profileimg from "../../image/profiledemo/profile.jpg";
import Timeline from "./Timeline";
import Tag from "./Tag";
import Card from "../common/Card";
import livesinicon from "../../image/about/livein.png";
import relationshipicon from "../../image/about/relationship.png";
import professionicon from "../../image/about/profession.png";
import Metaloading from "../common/Metaloading";

const Profile = () => {
  document.title = "Profile";
  const userDetails = JSON.parse(localStorage.getItem("userData"));

  const [showComponent, setShowComponent] = useState(
    <Timeline userid={userDetails._id} />
  );

  const [metaloading, setMetaloading] = useState(false);

  const [coverImage, setCoverImage] = useState({
    preview: null,
    file: null,
  });
  const [profileImage, setProfileImage] = useState({
    preview: null,
    file: null,
  });

  const [updateCover, setUpdateCover] = useState(false);
  const [updateProfileImage, setUpdateProfileImage] = useState(false);

  // console.log(userDetails);

  const history = useHistory();

  ///////////////////////////////cover photo/////////////////////////////////////////////

  const previewCover = async (e) => {
    e.preventDefault();
    try {
      let reader = new FileReader();

      let file = e.target.files[0];

      reader.onloadend = () => {
        setCoverImage({ file: file, preview: reader.result });
        setUpdateCover(true);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      // console.log(error);
    }
  };

  // console.log(coverImage.file);

  const updatecover = async (e) => {
    setMetaloading(true);
    e.preventDefault();
    // console.log("updating cover");
    let url = " /updateprofile/updatecover";

    try {
      if (coverImage.file !== null) {
        let formData = new FormData();
        formData.append("file", coverImage.file);
        let response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            userid: userDetails._id,
          },
        });
        // console.log(response.data);

        setCoverImage({ ...coverImage, file: null });
        if (response) {
          setMetaloading(false);
          setUpdateCover(false);
        }
      }
      // console.log("no file");
    } catch (err) {
      // console.log(err);
    }
  };
  const previewProfileImage = async (e) => {
    e.preventDefault();
    try {
      let reader = new FileReader();

      let file = e.target.files[0];

      reader.onloadend = () => {
        setProfileImage({ file: file, preview: reader.result });
        setUpdateProfileImage(true);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      // console.log(error);
    }
  };

  // console.log(coverImage.file);

  const updateprofilephoto = async (e) => {
    setMetaloading(true);
    e.preventDefault();
    console.log("updating profile photo");
    let url = " /updateprofile/updateprofilephoto";

    try {
      if (profileImage.file !== null) {
        let formData = new FormData();
        formData.append("file", profileImage.file);
        let response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            userid: userDetails._id,
          },
        });
        console.log(response.data);

        setProfileImage({ ...profileImage, file: null });

        setUpdateProfileImage(false);
        if (response) {
          setMetaloading(false);
        }
      }
      console.log("no file");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="profile-main">
          <div className="d-flex justify-content-center flex-column align-items-center dp-bio">
            {profileImage.preview !== null ? (
              <img
                src={profileImage.preview}
                alt=""
                className="image-fluid profile-logo"
              />
            ) : (
              <img
                src={userDetails.profilePicture}
                alt=""
                className="image-fluid profile-logo"
              />
            )}
            <label style={{ height: 0, display: "contents" }}>
              <span
                style={{
                  background: "#9b9b9b",
                  padding: "0.2rem",
                  borderRadius: "50%",
                  position: "relative",
                  top: "-34px",
                }}
              >
                <input
                  type="file"
                  className="my-hidden-input"
                  onChange={previewProfileImage}
                />
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  enableBackground="new 0 0 512 512"
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
            </label>
            {updateProfileImage ? (
              <div style={{ margin: "2rem", height: "0" }}>
                {metaloading ? (
                  <>
                    <span
                      style={{
                        zIndex: "9999999",
                        position: "relative",
                        bottom: "45px",
                        width: "10rem",
                      }}
                      className="btn btn-primary mx-1"
                    >
                      <Metaloading width="23pt" height="23pt" />
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        zIndex: "9999999",
                        position: "relative",
                        bottom: "38px",
                      }}
                      className="btn btn-primary mx-1"
                      onClick={updateprofilephoto}
                    >
                      Update
                    </span>

                    <span
                      style={{
                        zIndex: "9999999",
                        position: "relative",
                        bottom: "38px",
                      }}
                      className="btn btn-primary "
                      onClick={(e) => {
                        setProfileImage({ ...coverImage, preview: null });
                        setUpdateProfileImage(false);
                      }}
                    >
                      Cancel
                    </span>
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profile-img rounded flex-column align-items-end d-flex mb-4 ">
            {coverImage.preview !== null ? (
              <img
                src={coverImage.preview}
                alt=""
                className="image-fluid cover-img"
              />
            ) : (
              <img
                src={userDetails.coverPicture}
                alt=""
                className="image-fluid cover-img"
              />
            )}
            <label style={{ height: "0", position: "absolute" }}>
              {updateCover ? (
                <>
                  {metaloading ? (
                    <>
                      <span
                        style={{
                          zIndex: "9999999",
                          width: "10rem",
                        }}
                        className="btn btn-primary mx-1"
                      >
                        <Metaloading width="23pt" height="23pt" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          zIndex: "9999999",
                        }}
                        className="btn btn-primary mx-1"
                        onClick={updatecover}
                      >
                        Update
                      </span>
                      <span
                        style={{
                          zIndex: "9999999",
                        }}
                        className="btn btn-primary "
                        onClick={(e) => {
                          setCoverImage({ ...coverImage, preview: null });
                          setUpdateCover(false);
                        }}
                      >
                        Cancel
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span
                  style={{
                    zIndex: "9999999",
                  }}
                  className="btn btn-primary"
                >
                  <input
                    type="file"
                    className="my-hidden-input"
                    onChange={previewCover}
                  />
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    enableBackground="new 0 0 512 512"
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
              )}
            </label>
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
                {userDetails.post !== undefined || null ? userDetails.post : 0}
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
    </>
  );
};

export default Profile;
