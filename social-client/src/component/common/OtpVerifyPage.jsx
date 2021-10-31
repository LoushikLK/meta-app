import React, { useState } from "react";

const OtpVerifyPage = () => {
  const [otp, setOtp] = useState("");
  async function handleSubmit(e) {
    try {
      if (otp === "") {
        return;
      }
      e.preventDefault();
      const url = "/usersignin/emailverification";
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
        }),
      };

      console.log(option.body);

      const response = await fetch(url, option);

      const data = await response.json();

      console.log(data);
    } catch (error) {}
  }
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <header className="btn btn-primary px-4 fs-3">
          Thank You For Sign Up
        </header>
        <p>
          Please verify your email by submiting the otp sent to the email
          account.
        </p>
        <form>
          <div class="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter OTP..."
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              value={otp}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default OtpVerifyPage;
