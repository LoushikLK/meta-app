import React, { useState } from "react";
import "./common.css";
import addimage from "../../image/default/addimage.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CompleteProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [relationStatus, setRelationStatus] = useState("");
  const [profession, setProfession] = useState("");

  const userDetail = JSON.parse(localStorage.getItem("userData"));

  // console.log(userDetail);

  const handleSubmit = async (e) => {
    const history = useHistory();

    e.preventDefault();
    if (
      userDetail._id === null ||
      profilePhoto === "" ||
      bio === "" ||
      location === "" ||
      relationStatus === "" ||
      profession === ""
    ) {
      console.log("fill all the blanks");
      return;
    }
    try {
      let uri = "/updateprofile";

      let formData = new FormData();

      formData.append("file", profilePhoto);

      let details = JSON.stringify({
        id: userDetail._id,
        location: location,
        bio: bio,
        relationStatus: relationStatus,
        profession: profession,
      });

      formData.append("details", details);

      axios
        .post(uri, formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            history.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setProfilePhoto(null);
      setBio("");
      setLocation("");
      setRelationStatus("");
      setProfession("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="profile-complete d-flex flex-column">
        <h1 className="text-center">Complete Your Profile In few Step</h1>
        <div className="upload-profile-detail">
          <form className="d-flex align-items-center justify-content-center flex-column complete-profile-form">
            <label className="d-flex flex-column align-items-center ">
              {profilePhoto !== "" ? (
                <img
                  src={profilePreview}
                  alt="Add Profile Pic"
                  className="profile-logo"
                  style={{ height: "8rem", width: "8rem" }}
                />
              ) : (
                <img
                  src={addimage}
                  alt="Add Profile Pic"
                  className="profile-logo"
                  style={{ height: "8rem", width: "8rem" }}
                />
              )}

              <span className="btn btn-primary">Add Profile Photo</span>
              <input
                type="file"
                style={{ visibility: "hidden", width: 0 }}
                onChange={async (e) => {
                  try {
                    e.preventDefault();
                    let reader = new FileReader();

                    let file = e.target.files[0];
                    setProfilePhoto(file);
                    reader.onloadend = () => {
                      setProfilePreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            </label>
            <label htmlFor="add-bio">Add Bio</label>
            <input
              type="text"
              id="add-bio"
              placeholder="Add Bio"
              className="p-2 px-5"
              onChange={(e) => {
                setBio(e.target.value);
              }}
              value={bio}
            />
            <label htmlFor="home-location">Where Do You Live?</label>
            <input
              type="text"
              id="home-location"
              placeholder="Add  Home Town/State"
              className="p-2 px-5"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              value={location}
            />
            <label htmlFor="add-profession">What Do You Do?</label>
            <input
              type="text"
              id="add-profession"
              placeholder="Add your profession"
              className="p-2 px-5"
              onChange={(e) => {
                setProfession(e.target.value);
              }}
              value={profession}
            />
            <label htmlFor="add-relationship">Add Relationship status?</label>
            <span>
              Single
              <input
                type="radio"
                id="addrelationshipn"
                name="relationship status"
                value="Single"
                onFocus={(e) => {
                  setRelationStatus(e.target.value);
                }}
              />
            </span>
            <span>
              Married
              <input
                type="radio"
                name="relationship status"
                value="Married"
                onFocus={(e) => {
                  setRelationStatus(e.target.value);
                }}
              />
            </span>
            <span>
              Friendzoned
              <input
                type="radio"
                name="relationship status"
                value="Friendzoned"
                onFocus={(e) => {
                  setRelationStatus(e.target.value);
                }}
              />
            </span>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary my-3"
            >
              Update Your Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
