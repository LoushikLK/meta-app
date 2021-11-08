import React, { useEffect, useState } from "react";
import "./common.css";
import googleicon from "../../image/login-signup/googleicon.png";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../store";
import Popup from "./Popup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(false);
  const [flashmsg, setFlashmsg] = useState("");

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

      console.log(response.status);

      if (data.message !== undefined && response.status !== 200) {
        setFlashmsg(data.message);
        setPopup(true);
      }

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(data.message));
        dispatch(actionCreators.userdetail({ isLogin: true }));

        console.log(data.message);
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  if (userDetail.isLogin === true) {
    history.push("/");
  }

  useEffect(() => {
    setTimeout(() => {
      setPopup(false);
    }, 5000);
  }, [popup]);
  return (
    <>
      <section className="login-main ">
        {popup ? <Popup message={flashmsg} /> : ""}
        <div className="login-form p-4">
          <form action="/usersignin/login" method="post">
            <label htmlFor="loginEmail" className="fw-bold my-1 ">
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
              Log In
            </button>

            <span className="text-center mt-3">Forget Password?</span>
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
          <p className="text-primary fw-bold">Or</p>
          <div className="google-login">
            <button className="btn">
              <img
                src={googleicon}
                alt=""
                className="image-fluid mx-1"
                style={{ width: "35%" }}
              />{" "}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
