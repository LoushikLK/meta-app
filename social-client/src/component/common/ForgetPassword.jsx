import React, { useState } from "react";
import Metaloading from "./Metaloading";
import UpdatePassword from "./UpdatePassword";
const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [updatepage, setUpdatepage] = useState(false);

  const serachemail = async () => {
    if (email === "" || email === null) {
      return alert("Please enter your email");
    }
    try {
      setLoading(true);
      let url = "/usersignin/updatepassword";

      let option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      };

      const response = await fetch(url, option);

      const data = await response.json();

      console.log(data);
      setEmail("");

      if (response.status === 200) {
        setUpdatepage(true);
      }
      alert(data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-3 d-flex flex-column align-items-center justify-content-center ">
      {updatepage ? (
        <UpdatePassword />
      ) : (
        <>
          <h2 className="mx-2 text-center">Search your account.</h2>
          <form className="d-flex mx-2">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Enter Your Email"
              //   aria-label="Search"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={serachemail}
            >
              {loading ? (
                <Metaloading height="1.5rem" width="3rem" />
              ) : (
                "Search"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgetPassword;
