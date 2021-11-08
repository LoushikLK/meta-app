import React, { useEffect, useState } from "react";
import "./home.css";
import profileicon from "../../image/profiledemo/profile.jpg";

const Chatfeed = () => {
  const [chatPeople, setChatPeople] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userData"));
  // console.log(userDetails);

  useEffect(() => {
    async function getdetail() {
      try {
        let url = "/getuser/friends";
        let option = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: userDetails._id,
          }),
        };
        const response = await fetch(url, option);

        const data = await response.json();

        setChatPeople(data.message);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getdetail();
  }, []);
  return (
    <>
      <section className="home-chat-main">
        <div className="home-contact">
          <h3 className="text-secondary">Contact</h3>
          <hr />
          <div className="home-friends ">
            {chatPeople.length === 0 ? (
              "Frequent Chat Contact Will Show Here"
            ) : (
              <div className="my-2">
                <img
                  src={profileicon}
                  alt=""
                  className="profile-logo image-fluid "
                  style={{ height: "40px", width: "40px" }}
                />
                <span className="fw-bold px-2">John cena</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Chatfeed;
