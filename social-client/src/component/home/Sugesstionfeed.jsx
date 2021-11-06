import React, { useState, useEffect } from "react";
const Sugesstionfeed = () => {
  const [profile, setProfile] = useState([]);
  const [buttonType, setButtonType] = useState("follow");

  const userDetails = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function getuser() {
      try {
        const url = "/homefeed/sugesteduser";

        let option = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userid: userDetails._id,
          },
        };
        const response = await fetch(url, option);

        const data = await response.json();

        console.log(data);

        setProfile(data.message);
      } catch (err) {
        console.log(err);
      }
    }
    getuser();
  }, []);

  const handleFollow = async (id) => {
    console.log(buttonType);
    console.log(id);

    let url = `/userintraction/${buttonType}`;
    let option = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: userDetails._id,
        interectId: id,
      }),
    };

    const response = await fetch(url, option);

    const data = await response.json();

    console.log(data);
  };

  // console.log(profile);

  return (
    <>
      {profile.map((value, index) => {
        if (value._id !== userDetails._id) {
          return (
            <div
              className="d-flex align-items-center justify-content-between"
              key={value._id}
            >
              <div className="my-2 d-flex align-items-center flex-row">
                <img
                  src={value.profilePicture}
                  alt=""
                  className="profile-logo image-fluid p-1"
                  style={{ height: "40px", width: "40px" }}
                />
                <span className="fw-bold px-2">{value.profileName}</span>
              </div>
              <button
                className="home-follow btn btn-primary rounded-pill d-flex align-items-center"
                style={{ height: "32px" }}
                onClick={() => {
                  handleFollow(value._id);
                  setButtonType("unfollow");
                }}
              >
                {buttonType}
              </button>
            </div>
          );
        }
      })}
    </>
  );
};

export default Sugesstionfeed;
