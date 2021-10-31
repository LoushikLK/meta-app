import React from "react";
import "./notification.css";
import profileicon from "../../image/profiledemo/profile.jpg";
const Notification = () => {
  return (
    <>
      <section className="d-flex flex-column notification-main bg-light p-4">
        <h4 className="text-secondary text-start ms-1">Notification</h4>
        <hr />
        <div className="all-notification">
          <div className="d-flex align-items-center justify-content-around flex-column mx-3">
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">
                liked your photo Lorem ipsum dolor sit Lorem ipsum dolor sit
                amet. amet consectetur.
              </p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">
                liked your photo Lorem ipsum dolor sit Lorem ipsum Lorem ipsum
                dolor sit amet consectetur, adipisicing elit. Distinctio totam
                perferendis odio, expedita dolores facere debitis, nihil enim,
                ducimus hic fugiat iste vero? dolor sit amet. amet consectetur.
              </p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
            <div className="my-2 d-flex flex-row w-100 flex-wrap align-items-center notifications">
              <img
                src={profileicon}
                alt=""
                className="profile-logo image-fluid p-1"
                style={{ height: "40px", width: "40px" }}
              />
              <span className="fw-bold px-2 ">John cena</span>
              <p className="m-0">liked your photo .</p>{" "}
              <span className="notification-time mx-1"> 2hr ago</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notification;
