import React, { useState } from "react";
import "./common.css";
import addimage from "../../image/default/addimage.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import uploadgif from "../../image/upload-ui/uploading.gif";

const CompleteProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profilePreview, setProfilePreview] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [relationStatus, setRelationStatus] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("male");
  const [dateofbirth, setDateofbirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  // console.log(dateofbirth);

  const [uploadanimation, setUploadanimation] = useState(false);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      profilePhoto === "" ||
      bio === "" ||
      location === "" ||
      relationStatus === "" ||
      profession === "" ||
      dateofbirth.day === "" ||
      dateofbirth.month === "" ||
      dateofbirth.year === ""
    ) {
      console.log("fill all the blanks");
      return;
    }
    try {
      setUploadanimation(true);

      let uri = "/updateprofile";

      let formData = new FormData();

      formData.append("file", profilePhoto);

      let details = {
        location: location,
        bio: bio,
        relationStatus: relationStatus,
        profession: profession,
        gender: gender,
        dateofbirth: `${dateofbirth.day}/${dateofbirth.month}/${dateofbirth.year}`,
      };

      formData.append("details", JSON.stringify(details));

      axios
        .post(uri, formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          setUploadanimation(false);
          // console.log(res.data);
          if (res.status === 200) {
            // console.log("hello");
            history.push("/login");
          }
          return;
        })
        .catch((error) => {
          console.log(error);
        });

      setProfilePhoto(null);
      setBio("");
      setLocation("");
      setRelationStatus("");
      setProfession("");
      setDateofbirth({ day: "", month: "", year: "" });
    } catch (error) {
      console.log(error);
    }
  };

  ////////////////////////////day month year for date of birth/////////////////////////////
  let day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  let month = [
    { month: "January", value: 1 },
    { month: "February", value: 2 },
    { month: "March", value: 3 },
    { month: "April", value: 4 },
    { month: "May", value: 5 },
    { month: "June", value: 6 },
    { month: "July", value: 7 },
    { month: "August", value: 8 },
    { month: "September", value: 9 },
    { month: "October", value: 10 },
    { month: "November", value: 11 },
    { month: "December", value: 12 },
  ];

  let year = [];

  for (let i = 1900; i <= 2020; i++) {
    year.push(i);
  }

  return (
    <>
      {uploadanimation ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "#rgb(124 124 124 / 20%)",
            position: "absolute",
          }}
        >
          <img
            src={uploadgif}
            alt="Loading..."
            style={{
              height: "20rem",
              width: "25rem",
              boxShadow: "0px 0px 10px #000",
            }}
          />
        </div>
      ) : null}
      <div className="profile-complete d-flex flex-column mt-3">
        <h1 className="text-center">Complete Your Profile In few Step</h1>
        <div className="upload-profile-detail">
          <form className="d-flex align-items-center justify-content-center flex-column complete-profile-form">
            <label className="d-flex flex-column align-items-center ">
              {profilePhoto !== "" ? (
                <img
                  src={profilePreview}
                  alt="Add Profile Pic"
                  className="img-fluid"
                  style={{ height: "280px", width: "280px" }}
                />
              ) : (
                <img
                  src={addimage}
                  alt="Add Profile Pic"
                  className="img-fluid"
                  style={{ height: "280px", width: "280px" }}
                />
              )}

              <span className="btn btn-primary my-2">Add Profile Photo</span>
              <input
                type="file"
                style={{ visibility: "hidden", width: 0, height: 0 }}
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
            <h2 className="d-flex w-100 my-2">Edit basic details</h2>
            {/* <label htmlFor="add-bio">
              Add Bio</label> */}
            <input
              type="text"
              id="add-bio"
              placeholder="Add Bio"
              className="p-2 px-5 my-1"
              onChange={(e) => {
                setBio(e.target.value);
              }}
              value={bio}
            />

            {/* <label htmlFor="home-location">
              Where Do You Live? </label> */}
            <input
              type="text"
              id="home-location"
              placeholder="Add  Home Town/State"
              className="p-2 px-5 my-1"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              value={location}
            />

            {/* <label htmlFor="add-profession">What Do You Do? </label> */}
            <input
              type="text"
              id="add-profession"
              placeholder="Add your profession"
              className="p-2 px-5 my-1"
              onChange={(e) => {
                setProfession(e.target.value);
              }}
              value={profession}
            />

            <select
              className="form-select my-3"
              onChange={(e) => {
                setRelationStatus(e.target.value);
              }}
            >
              <option value="" selected>
                Select your relationship status
              </option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Friendzoned">Other</option>
            </select>
            <select
              className="form-select my-1"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value="" selected>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label className="w-100 m-2">Enter date of birth.</label>
            <div className="d-flex flex-row mb-3">
              <select
                className="form-select my-1"
                onChange={(e) => {
                  console.log(e.target.value);
                  setDateofbirth({ ...dateofbirth, day: e.target.value });
                }}
              >
                <option value="" selected>
                  Select day
                </option>
                {day.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <select
                className="form-select my-1"
                onChange={(e) => {
                  console.log(e.target.value);
                  setDateofbirth({ ...dateofbirth, month: e.target.value });
                }}
              >
                <option value="" selected>
                  Select Month
                </option>
                {month.map((item) => {
                  return <option value={item.value}>{item.month}</option>;
                })}
              </select>
              <select
                className="form-select my-1"
                onChange={(e) => {
                  console.log(e.target.value);
                  setDateofbirth({ ...dateofbirth, year: e.target.value });
                }}
              >
                <option value="" selected>
                  Select year
                </option>
                {year.reverse().map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>

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
