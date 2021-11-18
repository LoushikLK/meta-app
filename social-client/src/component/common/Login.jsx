import React, { useEffect, useState } from "react";

import "./common.css";
// import googleicon from "../../image/login-signup/googleicon.png";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../store";
import Popup from "./Popup";
import Metaloading from "./Metaloading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(false);
  const [flashmsg, setFlashmsg] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);

  // console.log(userDetail.isLogin);

  const handleLogin = async (e) => {
    if (email === "" || password === "") {
      setPopup(true);
      setFlashmsg("Please Enter Both  Required Field.");
      return;
    }

    try {
      setLoading(true);
      e.preventDefault();
      // console.log(gender);
      const url = "/usersignin/login";
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      // console.log(option.body);

      const response = await fetch(url, option);

      const data = await response.json();

      // console.log(response.status);

      if (data.message !== undefined && response.status !== 200) {
        setFlashmsg(data.message);
        setPopup(true);
      }

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(data.message));
        dispatch(actionCreators.userdetail({ isLogin: true }));
        history.push("/");

        // console.log(data.message);
      }
      setLoading(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (userDetail.isLogin === true) {
      return history.push("/");
    }
    return () => {
      setLoading(false);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setPopup(false);
    }, 5000);
  }, [popup]);
  return (
    <>
      <section className="login-main bg-primary">
        {popup ? <Popup message={flashmsg} /> : ""}
        <div className="login-form p-5">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="45pt"
            height="45pt"
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
          <form action="/usersignin/login" method="post">
            <label htmlFor="loginEmail" className="fw-bold  ">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="loginEmail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Your Email"
              required
            />
            <label htmlFor="loginPassword" className="fw-bold my-1 ">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="loginPassword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Your Password"
              required
            />
            <button
              type="submit"
              className="btn btn-primary mt-4 fw-bold"
              onClick={handleLogin}
            >
              {loading ? <Metaloading width="3rem" /> : "Login"}
            </button>

            <span
              className="text-center  text-primary mt-3 "
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/changepassword");
              }}
            >
              Forget Password?
            </span>
          </form>
          <div className="not-account">
            <p>
              Don't have an account?{" "}
              <span
                className="text-primary fw-bold text-decoration-underline"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Create Account.
              </span>
            </p>
          </div>
          {/* <p className="text-primary fw-bold">Or</p>
          <div className="google-login">
            <button className="btn">
              <img
                src={googleicon}
                alt=""
                className="image-fluid mx-1"
                style={{ width: "35%" }}
              />{" "}
            </button>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Login;
