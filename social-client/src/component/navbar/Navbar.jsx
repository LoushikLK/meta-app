import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Notification from "../notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../store";
import searchicon from "../../image/navlogo/searchbox.png";

import "./navbar.css";

export const Navbar = () => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.userDetail.isLogin);

  const [showNotification, setShowNotification] = useState(false);

  const [showSetting, setShowSetting] = useState(false);

  let userProfile = JSON.parse(localStorage.getItem("userData"));

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  // const showSearch = useSelector((state) => state.searchComponent.showSearch);
  dispatch(actionCreators.searchcomponent({ showSearch: true }));

  // console.log(showSearch);

  useEffect(() => {
    if (search === "" || search === null) {
      return;
    }
  }, [search]);

  // console.log(userProfile);

  const logout = async () => {
    let url = "/usersignin/logout";

    const response = await fetch(url);
    // const data = await response.json();
    // console.log(data);
    if (response) {
      dispatch(actionCreators.userdetail({ isLogin: false }));
      localStorage.removeItem("userData");
      history.push("/login");
    }
  };

  return (
    <>
      {isLogin ? (
        <nav className="navbar navbar-expand-lg sticky-top  px-5  navbar-main ">
          <div className="container-fluid">
            <NavLink className="navbar-brand brand-logo" to="/">
              <span className="d-flex align-items-center flex-row">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28pt"
                  height="28pt"
                  viewBox="0 0 64.000000 64.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                    fill="#1c76fc"
                    stroke="none"
                  >
                    <path
                      d="M108 505 c-57 -39 -100 -135 -102 -227 -1 -86 16 -133 55 -153 81
                    -43 143 0 230 159 l27 49 37 -59 c92 -147 111 -164 180 -164 102 0 135 159 64
                    307 -38 78 -77 108 -141 108 -41 0 -52 -5 -87 -39 l-41 -40 -32 31 c-18 17
                    -43 36 -55 42 -37 19 -95 13 -135 -14z m407 -58 c60 -60 87 -215 45 -257 -11
                    -11 -25 -20 -30 -20 -19 0 -55 43 -113 138 l-58 93 21 29 c43 60 87 65 135 17z
                    m-270 -18 c19 -17 35 -38 35 -46 0 -23 -106 -180 -134 -198 -93 -61 -104 153
                    -13 253 29 31 69 28 112 -9z"
                    />
                  </g>
                </svg>
                <span className="ms-3 text-primary">META</span>
              </span>
            </NavLink>

            <div className="searchbox d-flex">
              <form className="d-flex align-items-center">
                <label htmlFor="nav-search" className="nav-search-label">
                  <img
                    src={searchicon}
                    alt="Profile"
                    className="profile-logo "
                    style={{
                      height: "13pt",
                      width: "13pt",
                      backgroundColor: "transparent",
                    }}
                  />

                  <input
                    className=" searcharea "
                    type="search"
                    id="nav-search"
                    placeholder="Search friends,family,people across META"
                    aria-label="Search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </label>
              </form>
            </div>

            <div className="nav nav-icons">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
                <li className="nav-item">
                  <NavLink className="nav-link mx-1" aria-current="page" to="/">
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24pt"
                      height="24pt"
                      viewBox="0 0 64.000000 64.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                        fill="#545454"
                        stroke="none"
                      >
                        <path
                          d="M153 498 c-79 -79 -146 -153 -149 -165 -8 -29 12 -62 41 -69 25 -6
                          25 -8 25 -114 0 -106 1 -109 27 -130 22 -17 38 -20 92 -18 l66 3 5 95 5 95 55
                          0 55 0 5 -95 5 -95 54 -3 c119 -7 131 7 131 149 0 90 3 109 15 109 23 0 55 37
                          55 63 0 33 -286 317 -319 317 -18 0 -63 -38 -168 -142z m314 -30 c73 -73 133
                          -141 133 -150 0 -13 -8 -18 -30 -18 l-30 0 0 -111 c0 -138 -5 -149 -70 -149
                          l-50 0 0 77 c0 101 -18 123 -97 123 -44 0 -58 -5 -78 -25 -22 -21 -25 -33 -25
                          -100 l0 -76 -52 3 -53 3 -5 125 -5 125 -28 3 c-57 7 -44 29 94 168 74 74 140
                          134 149 134 8 0 74 -60 147 -132z"
                        />
                      </g>
                    </svg>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link mx-1" to="/messages">
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24pt"
                      height="24pt"
                      viewBox="0 0 64.000000 64.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                        fill="#545454"
                        stroke="none"
                      >
                        <path
                          d="M20 540 c-19 -19 -20 -33 -20 -220 0 -187 1 -201 20 -220 19 -19 33
                      -20 300 -20 267 0 281 1 300 20 19 19 20 33 20 220 0 187 -1 201 -20 220 -19
                      19 -33 20 -300 20 -267 0 -281 -1 -300 -20z m515 -66 c-27 -25 -87 -77 -132
                      -116 l-83 -70 -28 24 c-88 74 -232 201 -232 204 0 2 118 4 263 4 l262 -1 -50
                      -45z m-348 -125 c69 -60 129 -109 134 -109 4 0 67 52 141 116 l133 116 3 -163
                      c1 -90 0 -169 -2 -176 -4 -11 -61 -13 -278 -11 l-273 3 -3 173 c-2 120 1 171
                      8 167 6 -4 67 -56 137 -116z"
                        />
                      </g>
                    </svg>
                  </NavLink>
                </li>
                <li className="nav-item mx-1">
                  <div
                    className="nav-link"
                    onClick={() => {
                      showNotification
                        ? setShowNotification(false)
                        : setShowNotification(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24pt"
                      height="24pt"
                      viewBox="0 0 64.000000 64.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                        fill="#545454"
                        stroke="none"
                      >
                        <path
                          d="M280 620 c-11 -11 -20 -26 -20 -34 0 -8 -9 -18 -20 -21 -33 -10 -80
                        -55 -99 -94 -12 -23 -21 -70 -25 -131 -4 -73 -12 -106 -31 -143 -14 -27 -25
                        -57 -25 -68 0 -24 45 -47 117 -60 41 -8 64 -19 84 -40 37 -39 81 -39 118 0 20
                        21 43 32 84 40 72 13 117 36 117 60 0 11 -11 41 -25 68 -19 37 -27 70 -31 143
                        -4 61 -13 108 -25 131 -19 39 -66 84 -99 94 -11 3 -20 13 -20 21 0 21 -37 54
                        -60 54 -11 0 -29 -9 -40 -20z m60 -25 c11 -13 8 -15 -20 -15 -28 0 -31 2 -20
                        15 7 8 16 15 20 15 4 0 13 -7 20 -15z m57 -61 c64 -31 84 -70 98 -198 8 -78
                        19 -127 34 -155 11 -23 21 -46 21 -51 0 -23 -80 -35 -230 -35 -150 0 -230 12
                        -230 35 0 5 10 28 21 51 15 28 26 77 34 155 11 96 17 120 38 147 48 64 140 85
                        214 51z m-41 -489 c-25 -19 -47 -19 -72 0 -17 13 -15 14 36 14 51 0 53 -1 36
                        -14z"
                        />
                      </g>
                    </svg>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {userProfile !== null ? (
                      <img
                        src={userProfile.profilePicture}
                        alt="Profile"
                        className="profile-logo "
                        style={{ height: "24pt", width: "24pt" }}
                      />
                    ) : (
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24pt"
                        height="24pt"
                        viewBox="0 0 64.000000 64.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                          fill="#545454"
                          stroke="none"
                        >
                          <path
                            d="M255 626 c-102 -44 -124 -181 -41 -254 140 -123 338 67 219 209 -47
                              55 -116   72 -178 45z"
                          />
                          <path
                            d="M129 307 c-41 -27 -57 -58 -71 -135 -14 -78 4 -130 52 -154 29 -15
                            63 -18 210 -18 203 0 236 9 257 70 26 75 -11 204 -69 240 -42 26 -62 25 -106
                            -2 -23 -14 -52 -22 -82 -22 -30 0 -59 8 -82 22 -45 28 -67 28 -109 -1z"
                          />
                        </g>
                      </svg>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item mx-1">
                  <div
                    className="nav-link btn"
                    onClick={() => {
                      if (showSetting === false) {
                        setShowSetting(true);
                      } else {
                        setShowSetting(false);
                      }
                    }}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24pt"
                      height="24pt"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#545454"
                        stroke="none"
                      >
                        <path
                          d="M2452 5104 c-99 -26 -164 -65 -242 -144 -59 -60 -81 -91 -103 -146
                            -78 -189 -224 -351 -351 -389 -114 -35 -311 -14 -465 47 -137 55 -281 49 -418
                            -19 -222 -108 -321 -384 -225 -625 48 -120 65 -213 61 -341 -4 -98 -8 -119
                            -32 -168 -31 -64 -125 -163 -206 -218 -31 -21 -104 -61 -162 -89 -87 -42 -115
                            -61 -165 -114 -196 -210 -189 -485 16 -688 61 -60 90 -81 148 -105 182 -74
                            350 -225 387 -347 35 -116 15 -312 -47 -467 -55 -137 -49 -281 19 -418 108
                            -222 384 -321 624 -225 155 62 351 82 465 47 126 -37 278 -209 355 -399 31
                            -78 149 -200 231 -239 155 -74 281 -74 436 0 87 42 199 160 235 249 57 137
                            157 270 260 345 114 83 345 81 556 -3 137 -55 281 -49 418 19 222 108 321 384
                            225 624 -61 154 -82 351 -47 465 38 127 200 273 389 351 55 22 86 44 146 103
                            81 80 118 144 145 246 39 150 -9 313 -129 442 -50 53 -78 72 -165 114 -217
                            104 -348 224 -386 352 -35 114 -14 311 47 465 55 137 49 281 -19 418 -108 222
                            -384 321 -624 225 -154 -61 -351 -82 -465 -47 -127 38 -273 200 -351 389 -22
                            55 -44 86 -103 146 -134 135 -299 187 -458 144z m248 -1619 c360 -54 655 -311
                            759 -663 113 -378 -38 -806 -361 -1029 -175 -121 -324 -167 -538 -167 -307 -1
                            -567 129 -757 379 -173 227 -226 553 -136 839 120 380 481 648 883 655 30 0
                            98 -6 150 -14z"
                        />
                      </g>
                    </svg>
                  </div>
                  {showSetting && (
                    <ul className="setting-dropdown">
                      <li>
                        <div>Change Theme</div>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <div
                          className="d-flex align-items-center"
                          style={{ backgroundColor: "transparent" }}
                          onClick={logout}
                        >
                          Logout
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24pt"
                            height="24pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                            style={{
                              backgroundColor: "transparent",
                              marginLeft: "5px",
                            }}
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#545454"
                              stroke="none"
                            >
                              <path d="M2495 4963 c-115 -29 -1800 -508 -1830 -521 -56 -24 -112 -77 -143 -136 l-27 -51 0 -1695 c0 -1602 1 -1697 18 -1733 22 -46 78 -110 120 -136 18 -10 442 -135 942 -278 825 -234 917 -258 985 -258 64 0 83 4 128 30 30 16 67 46 83 66 64 80 59 -88 57 2324 -3 2122 -4 2201 -22 2237 -55 111 -195 179 -311 151z"></path>
                              <path d="M403 4745 c-102 -31 -176 -96 -222 -195 l-26 -55 0 -1935 0 -1935 26 -56 c37 -79 90 -133 167 -171 l67 -33 395 -2 c217 -1 391 0 385 2 -5 3 -137 41 -293 85 -155 44 -304 91 -332 105 -104 53 -197 181 -220 304 -14 74 -14 3328 0 3402 23 121 111 243 217 301 27 15 179 64 338 108 160 45 292 84 294 86 2 2 -166 4 -375 3 -284 0 -390 -4 -421 -14z"></path>
                              <path d="M2983 4715 c4 -26 7 -442 7 -924 0 -817 1 -874 16 -851 36 53 91 103 139 126 42 20 65 24 153 24 l103 0 -3 708 -3 707 -26 55 c-57 122 -166 192 -308 198 l-84 4 6 -47z"></path>
                              <path d="M4190 3279 c-14 -6 -36 -20 -48 -32 -44 -41 -52 -69 -52 -187 l0 -110 -423 0 c-591 0 -552 27 -552 -385 0 -254 1 -272 21 -305 11 -19 35 -45 54 -57 33 -23 33 -23 466 -23 l434 0 0 -102 c0 -57 5 -120 10 -140 13 -45 68 -95 114 -103 75 -15 92 -2 423 329 265 265 313 317 324 354 25 86 19 95 -314 430 -343 344 -372 365 -457 331z"></path>
                              <path d="M2980 1284 l0 -927 78 5 c141 8 260 86 315 206 22 47 22 52 25 755 l3 707 -103 0 c-87 0 -111 4 -153 24 -54 25 -118 84 -141 129 -8 15 -17 27 -19 27 -3 0 -5 -417 -5 -926z"></path>
                            </g>
                          </svg>
                        </div>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
              {/* <div className="searchbox d-flex">
                <form className="d-flex align-items-center">
                  <input
                    className="form-control ms-5 searcharea "
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{
                      borderRadius: "2rem",
                      backgroundColor: "#0067ff36",
                      border: "none",
                      color: "#ffffff",
                    }}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />

                </form>
              </div> */}
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}

      {showNotification ? <Notification /> : ""}
    </>
  );
};
