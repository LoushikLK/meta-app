import React, { useEffect, useState } from "react";
import Metaloading from "./Metaloading";
import { useHistory } from "react-router-dom";
import Popup from "./Popup";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const history = useHistory();

  const updatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPopupMessage("Password does not match");
      setPopup(true);
      return;
    } else if (otp.length !== 4) {
      setPopupMessage("OTP must be 4 digit.");
      setPopup(true);
      return;
    } else if (password.length < 6 || password.length > 20) {
      setPopupMessage("Password must be between 6 to 20 character.");
      setPopup(true);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/usersignin/setnewpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, otp }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setPopupMessage("Password Changes sucessesfully.");
        setPopup(true);
        history.push("/login");
      } else {
        setPopupMessage(data.message);
        setPopup(true);
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    if (popup) {
      setTimeout(() => {
        setPopup(false);
      }, 3000);
    }
    return () => {
      setPopup(false);
    };
  }, [popup]);
  return (
    <div>
      {popup ? <Popup title="Response" message={popupMessage} /> : null}

      <h3> Enter OTP provided to your email.</h3>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Enter OTP."
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value);
        }}
      />
      <h3>Type a new password</h3>

      <form>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="form-control my-2"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          className="form-control"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button className="btn btn-primary my-4" onClick={updatePassword}>
          {loading ? (
            <Metaloading height="1.7rem" width="6rem" />
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
