import React, { useState, useEffect, useRef } from "react";
import "./message.css";
import searchlogo from "../../image/navlogo/searchbox.png";
import profileicon from "../../image/profiledemo/profile.jpg";
import sendicon from "../../image/message/send.png";
import emojiicon from "../../image/message/happy.png";
import doticon from "../../image/message/three-dots.png";
import axios from "axios";
import { io } from "socket.io-client";

const Message = () => {
  document.title = "Messages";
  const user = JSON.parse(localStorage.getItem("userData"));
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const scrollRef = useRef();
  const [allUser, setAllUser] = useState(null);

  //demo////////////////////////////////////////////////////////////////
  const [data, setData] = useState([]);
  // console.log(messages);

  ////////////////////socket.io////////////////////////////////////////////
  const socket = io("/", {
    transports: ["websocket", "polling", "flashsocket"],
  });

  useEffect(() => {
    let userconnected = JSON.stringify({
      name: user.profileName,
      image: user.profilePicture,
    });
    socket.emit("new-user-joined", userconnected);
  }, [user.profileName, user.profilePicture]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
    socket.on("user-joined", (details) => {
      // console.log(details);
      let data = JSON.parse(details);
      // console.log(data);
      setAllUser(data.length);
      // console.log(name + " joined");
    });
    socket.on("recieve-chat-message", (data) => {
      // console.log(data);

      if (receivedMessage !== null) {
        setReceivedMessage([...receivedMessage, data]);
      } else {
        setReceivedMessage([data]);
      }
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newMessage !== "") {
      socket.emit("send-chat-message", {
        message: newMessage,
        user: user.profileName,
        image: user.profilePicture,
      });
      setNewMessage("");
    }
    return;
  };

  const showmessages = (details, position) => {
    if (position === "left") {
      return (
        <div className="d-block received-message m-2">
          <p>{details.message}</p>
        </div>
      );
    } else if (position === "right") {
      return (
        <div className="d-block sent-message m-2">
          <p>{details.message}</p>
        </div>
      );
    }
  };
  console.log(allUser);
  console.log(receivedMessage);
  return (
    <>
      <section className="message-main container mt-5">
        <div className="">
          <div className="">
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
                {receivedMessage !== null
                  ? receivedMessage.map((details, i) => {
                      return (
                        <div className="d-block received-message m-2" key={i}>
                          <p>
                            {details.user} : {details.message}
                          </p>
                        </div>
                      );
                    })
                  : null}

                {/* <div className=" sent-message m-2">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore, laborum magni nam maiores est facilis?
                  </p>
                </div> */}
              </div>
              <div className="message-type-area">
                <form className="d-flex flex-row align-items-center justify-content-center">
                  <textarea
                    type="text"
                    className="form-control w-75"
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
                    <button className="btn  d-flex px-2 align-items-center justify-content-center ">
                      <img src={emojiicon} alt="" style={{ width: "2rem" }} />
                    </button>
                    <button className="btn  d-flex px-2 align-items-center justify-content-center ">
                      <img src={doticon} alt="" style={{ width: "2rem" }} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Message;
