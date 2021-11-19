import React, { useState, useEffect, useRef } from "react";
import "./message.css";
// import searchlogo from "../../image/navlogo/searchbox.png";
// import profileicon from "../../image/profiledemo/profile.jpg";
import sendicon from "../../image/message/send.png";
import emojiicon from "../../image/message/happy.png";
import doticon from "../../image/message/three-dots.png";
// import axios from "axios";
import { io } from "socket.io-client";

const Message = () => {
  document.title = "Messages";
  const user = JSON.parse(localStorage.getItem("userData"));
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [receivedMessage, setReceivedMessage] = useState([]);
  const scrollRef = useRef();
  const [allUser, setAllUser] = useState(null);

  ////////////////////socket.io////////////////////////////////////////////

  const socketRef = useRef();

  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    socketRef.current = io("/", {
      transports: ["websocket"],
    });
    let userconnected = JSON.stringify({
      name: user.profileName,
      image: user.profilePicture,
    });

    socketRef.current.on("connect", () => {
      // console.log("connected to socket io");
      socketRef.current.emit("new-user-joined", userconnected);
    });
    socketRef.current.on("recieve-chat-message", (data) => {
      // console.log("recieved message", data);
      setConversations([...conversations, data]);
    });
    return () => socketRef.current.disconnect();
  }, [conversations, user.profileName, user.profilePicture]);

  useEffect(() => {
    socketRef.current.on("user-joined", (details) => {
      // console.log(details);
      let data = JSON.parse(details);
      // console.log(data);
      setAllUser(data.length);
      // console.log(name + " joined");
    });
    socketRef.current.on("user-left", (details) => {
      // console.log(details);
      let data = JSON.parse(details);
      // console.log(data);
      setAllUser(data.length);
      // console.log(name + " left");
    });
  }, [socketRef]);

  //////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    if (newMessage !== "") {
      e.preventDefault();
      socketRef.current.emit("send-chat-message", {
        message: newMessage,
        user: user.profileName,
        image: user.profilePicture,
      });

      setNewMessage("");
    }
    return;
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (conversations.length > 0) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return;
    };
    scrollToBottom();
  }, [conversations]);

  // console.log(allUser);

  // console.log(conversations + "conversation");

  const renderChat = () => {
    return conversations.map((value, index) => {
      console.log(value.user === user.profileName);

      return (
        <div
          key={index}
          style={{ backgroundColor: "transparent" }}
          ref={scrollRef}
        >
          {value.user === user.profileName ? (
            <>
              <div className="sent-message m-2" key={index}>
                <img
                  src={value.image}
                  alt=""
                  className="profile-logo mx-2 "
                  style={{ height: "30px", width: "30px" }}
                />

                <p> {value.message}</p>
              </div>
            </>
          ) : (
            <>
              <div className=" d-block received-message m-2" key={index}>
                <img
                  src={value.image}
                  alt=""
                  className="profile-logo mx-2 "
                  style={{ height: "30px", width: "30px" }}
                />

                <p>
                  <span style={{ color: "#00ffff" }}>{value.user}</span> :{" "}
                  {value.message}
                </p>
              </div>
            </>
          )}
          {/* <div
            className={` ${
              value.user === user.profileName
                ? "sent-message"
                : " d-block received-message"
            } m-2`}
            key={index}
          >
            <p>
              {value.user}: {value.message}
            </p>
          </div> */}
        </div>
      );
    });
  };

  return (
    <>
      <section className="message-main  mt-5">
        <div className="message-container">
          <div className="sender-detail ">
            <span className="d-flex flex-column align-items-start">
              <h3 className="fw-bold">Meta Chat Room</h3>
              <p>
                {allUser} users active <span>&#x1F30E;</span>
              </p>
            </span>
          </div>
          <div className="message-view">
            {renderChat()}

            {/* <div className="d-block received-message m-2">
                  <p>
                    {receivedMessage.user} : {receivedMessage.message}
                  </p>
                </div> */}

            {/* <div className=" sent-message m-2">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore, laborum magni nam maiores est facilis?
                  </p>
                </div> */}
            {/* {userMessage.length > 0 &&
              userMessage.map((value, index) => {
                return (
                  <div className=" sent-message m-2" key={index}>
                    <p>You: {value.message}</p>
                  </div>
                );
              })} */}
          </div>
        </div>
        <div className="message-type-area">
          <form className="d-flex  align-items-center justify-content-center message-form">
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter Messages..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <div className="d-flex flex-row flex-nowrap">
              <button
                type="submit"
                className="btn  d-flex px-2 align-items-center justify-content-center "
                onClick={handleSubmit}
              >
                <img src={sendicon} alt="" style={{ width: "2rem" }} />
              </button>
              <button className="btn  d-flex px-2 align-items-center justify-content-center message-extra-button">
                <img src={emojiicon} alt="" style={{ width: "2rem" }} />
              </button>
              <button className="btn  d-flex px-2 align-items-center justify-content-center message-extra-button">
                <img src={doticon} alt="" style={{ width: "2rem" }} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Message;
