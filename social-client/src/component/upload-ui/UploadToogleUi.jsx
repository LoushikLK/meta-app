import React from "react";
import "./upload-ui.css";
import photosicon from "../../image/upload-ui/photos.png";
import { useHistory } from "react-router";

const UploadToogleUi = () => {
  const history = useHistory();
  let userProfile = JSON.parse(localStorage.getItem("userData"));
  // console.log(userProfile);
  return (
    <>
      <section className="uploadtogle mb-4 p-3">
        <div className="upload-profile d-flex justify-content-evenly align-items-center">
          <form action="" style={{ width: "100%" }}>
            <div className="d-flex flex-row align-items-center">
              <img
                src={userProfile.profilePicture}
                alt=""
                className="profile-logo mx-2 "
                style={{ height: "80px", width: "80px" }}
              />

              <input
                type="text"
                placeholder="What's happening?"
                className="p-1 px-5 postTab"
              />
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between mx-2">
              <span
                className="fw-bold img-label"
                onClick={() => {
                  history.push("/post");
                }}
              >
                <img
                  src={photosicon}
                  alt=""
                  className="image-fluid photo-icon"
                />{" "}
                Image
              </span>
              <span>
                <button
                  className="btn btn-primary px-4 rounded-pill"
                  type="submit"
                >
                  Post
                </button>
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UploadToogleUi;
