import React, { useState, useEffect } from "react";
const Sugesstionfeed = (props) => {
  const [profile, setProfile] = useState([]);
  // console.log(props.sugessteduser);

  useEffect(() => {
    async function getuser() {
      try {
        const url = "/getuser";

        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: props.sugessteduser,
          }),
        };
        const response = await fetch(url, option);

        const data = await response.json();

        // console.log(data);
        setProfile(data.message);
      } catch (err) {
        console.log(err);
      }
    }
    getuser();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="my-2 d-flex align-items-center flex-row">
          <img
            src={profile.profilePicture}
            alt=""
            className="profile-logo image-fluid p-1"
            style={{ height: "40px", width: "40px" }}
          />
          <span className="fw-bold px-2">{profile.profileName}</span>
        </div>
        <button
          className="home-follow btn btn-primary rounded-pill d-flex align-items-center"
          style={{ height: "32px" }}
        >
          Follow
        </button>
      </div>
    </>
  );
};

export default Sugesstionfeed;
