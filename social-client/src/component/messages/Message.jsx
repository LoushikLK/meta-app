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
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  // console.log(messages);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section className="message-main container mt-5">
        <div className="row">
          <div className="col-4 message-sneak p-0">
            <div className="message-head">
              <h3 className="text-secondary text-center">Message</h3>
              <span>
                <img src={searchlogo} alt="" style={{ width: "1.5rem" }} />
              </span>
            </div>

            <div className="people-message">
              <div className="d-flex message-previews">
                <div className="my-2">
                  <img
                    src={profileicon}
                    alt=""
                    className="profile-logo image-fluid p-1"
                    style={{ height: "55px", width: "55px" }}
                  />
                </div>
                <div className="d-flex flex-column my-2">
                  <span className="fw-bold px-2">John cena</span>
                  <span className="actual-message px-2">
                    Lorem ipsum dolor elit. Saepe quidem est accusamus.
                  </span>
                </div>
              </div>
              <div className="d-flex message-previews">
                <div className="my-2">
                  <img
                    src={profileicon}
                    alt=""
                    className="profile-logo image-fluid p-1"
                    style={{ height: "55px", width: "55px" }}
                  />
                </div>
                <div className="d-flex flex-column my-2">
                  <span className="fw-bold px-2">John cena</span>
                  <span className="actual-message">
                    Lorem ipsum dolor elit. Saepe quidem est accusamus.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="message-container">
              <div className="sender-detail ">
                <span>
                  <img
                    src={profileicon}
                    alt=""
                    className="profile-logo image-fluid p-1"
                    style={{ height: "60px", width: "60px" }}
                  />
                </span>
                <span className="d-flex flex-column align-items-start">
                  <h3 className="fw-bold">John cena</h3>
                  <p>Active Now </p>
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
                  ></textarea>
                  <div className="d-flex flex-row flex-nowrap">
                    <button
                      type="submit"
                      className="btn  d-flex px-2 align-items-center justify-content-center "
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
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
