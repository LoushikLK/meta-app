import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./common.css";
import Popup from "./Popup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  // const [error, setError] = useState(false);
  const [popup, setPopup] = useState(false);
  const [flashmsg, setFlashmsg] = useState("");
  const history = useHistory();

  const userValidate = RegExp(/^[a-zA-Z0-9_]+$/);
  const emailValidate = RegExp(
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  );

  console.log(userValidate.test(username));
  const formSubmit = async (e) => {
    e.preventDefault();
    if (userValidate.test(username) === false) {
      setFlashmsg("Username can only contain letters, numbers and underscore");
      setPopup(true);
      return;
    } else if (emailValidate.test(email) === false) {
      setFlashmsg("Please enter a valid email");
      setPopup(true);
      return;
    } else if (password !== confirmPassword) {
      setFlashmsg("Password and confirm password does not match");
      setPopup(true);
      return;
    }
    try {
      const url = "/usersignin/signup";
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      };

      // console.log(option.body);

      const response = await fetch(url, option);

      const data = await response.json();

      // console.log(data);

      if (data.message !== undefined) {
        setFlashmsg(data.message);
        setPopup(true);
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");

      if (response.status === 200) {
        history.push("/verifyotp");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPopup(false);
    }, 3000);
    // eslint-disable-next-line
  }, [popup]);

  // console.log(formData);

  return (
    <>
      <section className="login-main bg-primary text-light">
        {flashmsg !== "" && popup ? <Popup message={flashmsg} /> : ""}
        <div className="login-form p-4">
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
          <form>
            <label htmlFor="lname" className="fw-bold my-1 ">
              User Name
            </label>
            <input
              type="text"
              name="username"
              id="lname"
              placeholder="Username only contains letter,number & _"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />

            <label htmlFor="signupEmail" className="fw-bold my-1 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="signupEmail"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label htmlFor="signupPassword" className="fw-bold my-1 ">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="signupPassword"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            {/* <label htmlFor="loginCpassword" className="fw-bold my-1 ">
              Confirm Password
            </label> */}
            <input
              type="password"
              name="password"
              id="signupCpassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="mt-3"
              required
            />

            <button
              type="submit"
              className="btn btn-primary mt-4 fw-bold"
              onClick={formSubmit}
            >
              Create Account
            </button>
          </form>
          <p className="text-center fst-italic my-1">
            By clicking Sign Up, you agree to our{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/terms");
              }}
            >
              Terms
            </span>
            ,
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/terms");
              }}
            >
              Data Policy
            </span>{" "}
            and{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/terms");
              }}
            >
              Cookie Policy.
            </span>
          </p>
          <div className="not-account">
            <p>
              Already have an account?{" "}
              <span
                className="text-primary fw-bold text-decoration-underline "
                onClick={() => {
                  history.push("/login");
                }}
                style={{ cursor: "pointer" }}
              >
                Sign In.
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
