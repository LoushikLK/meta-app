import React, { useState, useEffect } from "react";
import "./notification.css";
// import profileicon from "../../image/profiledemo/profile.jpg";
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  let user = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    const getNotification = async () => {
      const response = await fetch("/userintraction/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: user._id,
        },
      });
      const data = await response.json();
      // console.log(data);
      setNotifications(data.message);
    };
    getNotification();
  }, [user._id]);
  // console.log(notifications);
  return (
    <>
      <section className="d-flex flex-column notification-main  p-4">
        <h4 className="text-secondary text-start ms-1">Notification</h4>
        <hr />
        <div className="all-notification">
          <div className="d-flex align-items-center justify-content-around flex-column mx-3">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => {
                return (
                  <div
                    className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications"
                    key={index}
                  >
                    {/* <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              /> */}
                    {/* <span className="fw-bold px-2 ">John cena</span> */}
                    <p className="m-0">{notification}</p>{" "}
                    <span className="notification-time mx-1"> 2hr ago</span>
                  </div>
                );
              })
            ) : (
              <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
                {/* <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              /> */}
                {/* <span className="fw-bold px-2 ">John cena</span> */}
                <p className="m-0">"No new notification"</p>{" "}
                {/* <span className="notification-time mx-1"> 2hr ago</span> */}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Notification;
