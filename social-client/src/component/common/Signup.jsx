import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./common.css";
import Popup from "./Popup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  // const [error, setError] = useState(false);
  const [popup, setPopup] = useState(false);
  const [flashmsg, setFlashmsg] = useState("");
  const history = useHistory();

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(gender);

      if (password === confirmPassword) {
        const url = "/usersignin/signup";
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            password,
            gender,
          }),
        };

        console.log(option.body);

        const response = await fetch(url, option);

        const data = await response.json();

        console.log(data);

        if (data.message !== undefined) {
          setFlashmsg(data.message);
          setPopup(true);
        }

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setGender("male");
        if (response.status === 200) {
          history.push("/login");
        }
      } else {
        setPopup(true);
        setFlashmsg("Password Doesnot Match Try Again");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPopup(false);
    }, 5000);
    // eslint-disable-next-line
  }, [popup]);

  // console.log(formData);

  return (
    <>
      {flashmsg !== "" && popup ? <Popup message={flashmsg} /> : ""}

      <section className="login-main bg-dark text-light">
        <div className="login-form p-4">
          <h4 className="text-center text-bold fs-1 m-2">CREATE AN ACCOUNT</h4>
          <form method="post">
            <label htmlFor="fname" className="fw-bold my-1 ">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="fname"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />

            <label htmlFor="lname" className="fw-bold my-1 ">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lname"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
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
            <div className="gender-picker d-flex flex-column my-1">
              <span className="fw-bold">Gender</span>
              <span className="d-flex align-items-center my-1 rounded-pill btn btn-primary">
                <label htmlFor="gMale">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="gMale"
                  value="male"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <label htmlFor="gFemale">Female</label>
                <input
                  type="radio"
                  name="gender"
                  id="gFemale"
                  value="female"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <label htmlFor="gOther">Other</label>
                <input
                  type="radio"
                  name="gender"
                  id="gOther"
                  value="other"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </span>
            </div>

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
            <span className="text-primary">Terms</span>,
            <span className="text-primary">Data Policy</span> and{" "}
            <span className="text-primary">Cookie Policy.</span>
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
