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
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  //demo////////////////////////////////////////////////////////////////
  const [data, setData] = useState([]);
  // console.log(messages);

  ////////////////////socket.io////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewMessage("");
  };
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
                    users active <span>&#x1F30E;</span>
                  </p>
                </span>
              </div>
              <div className="message-view">
                <div className="d-block received-message m-2">
                  <p>
                    Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit
                    amet consectetur adipisicing elit.adipisicing elit.
                    Inventore, amet!
                  </p>
                </div>
                <div className=" sent-message m-2">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore, laborum magni nam maiores est facilis?
                  </p>
                </div>
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
