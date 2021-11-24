import React, { useState, useEffect } from "react";
const Sugesstionfeed = () => {
  const [profile, setProfile] = useState([]);

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

        // console.log(data);
        if (response.status === 200) {
          setProfile(data.message);
        }
      } catch (err) {
        // console.log(err);
      }
    }
    getuser();
    return () => {
      setProfile([]);
    };
  }, [userDetails._id]);

  const handleFollow = async (name) => {
    // console.log(id);

    let url = `/userintraction/follow`;
    let option = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        myname: userDetails.profileName,
        interectname: name,
      }),
    };

    const response = await fetch(url, option);

    const data = await response.json();

    // console.log(data);
  };

  // console.log(profile);

  return (
    <>
      {profile.length > 0
        ? profile.map((value, index) => {
            return (
              <div
                className="d-flex align-items-center justify-content-between"
                key={value._id}
              >
                {value._id !== userDetails._id ? (
                  <>
                    <div className="my-2 d-flex align-items-center flex-row">
                      <img
                        src={value.profilePicture}
                        alt=""
                        className="profile-logo image-fluid "
                        style={{ height: "40px", width: "40px" }}
                      />
                      <span className=" px-2">{value.profileName}</span>
                    </div>
                    <button
                      className="home-follow btn btn-primary rounded-pill d-flex align-items-center"
                      style={{ height: "32px" }}
                      onClick={() => {
                        handleFollow(value.profileName);
                      }}
                    >
                      follow
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            );
          })
        : "No suggestion"}
    </>
  );
};

export default Sugesstionfeed;
