import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import homelogo from "../../image/navlogo/home.png";
import chatlogo from "../../image/navlogo/chat.png";
import notificationlogo from "../../image/navlogo/bell.png";
import profilelogo from "../../image/navlogo/user.png";
import Notification from "../notification/Notification";
import metalogo from "../../image/navlogo/meta-logo.png";
// import searchlogo from "../../image/navlogo/searchbox.png";

import "./navbar.css";

export const Navbar = () => {
  const [showNotification, setShowNotofication] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top  px-5  navbar-main ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <span className="d-flex align-items-center flex-row">
              <img src={metalogo} alt="" style={{ width: "3rem" }} /> META
            </span>
          </NavLink>

          <div className="nav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  <img
                    src={homelogo}
                    alt="Home"
                    className="img-fluid navlogo mx-2"
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/messages">
                  <img
                    src={chatlogo}
                    alt="Chat"
                    className="img-fluid navlogo mx-2"
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => {
                    showNotification
                      ? setShowNotofication(false)
                      : setShowNotofication(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={notificationlogo}
                    alt="Notification"
                    className="img-fluid navlogo mx-2"
                  />
                </div>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  <img
                    src={profilelogo}
                    alt="Profile"
                    className="img-fluid navlogo mx-2"
                  />
                </NavLink>
              </li>
            </ul>
            <div className="searchbox d-flex">
              <form className="d-flex align-items-center">
                <input
                  className="form-control ms-5 searcharea "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />

                {/* <img
                  src={searchlogo}
                  alt="Search"
                  className="img-fluid navlogo "
                /> */}
              </form>
            </div>
          </div>
        </div>
      </nav>

      {showNotification ? <Notification /> : ""}
    </>
  );
};
