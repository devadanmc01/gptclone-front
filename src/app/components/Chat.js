"use client";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./chat.css";
import Image from "next/image";
import avatar from "../assets/avatar.png";
const socket = io.connect("https://chatgptclone-test.onrender.com");



const Chat = () => {
  const [roomId,setRoomId]= useState("")
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const userId = "12345"; // El ID del usuario actual
    socket.emit("join", userId);
    },[])
    useEffect(() => {
      socket.on("roomJoined",(roomId)=>{
        setRoomId(roomId)
      })
    },[])
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
      setLoading(false);
    });
  }, []);
  const renderLoadingDots = () => {
    return (
      <div className="message message-assistant">
        <div className="profile-message">
          <Image
            className="profileimg-message"
            src={avatar}
            alt="avatar"
            width="100"
            height="100"
          />
        </div>
        <div className="inner">
          <div className="content-msg">
            <div className="loader">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
console.log(roomId)
    if (message && roomId) {
      socket.emit("message", { roomId: roomId, message: message });
      setMessage("");
      setMessages([
        {
          username: "you",
          text: message,
          time: Date.now(),
        },
        ...messages,
      ]);
      setLoading(true);
    }
    messageRef.current.focus();
  };
  const renderMessage = (message) => {
    const { text, time, username } = message;

    if (username === "assistant") {
      return (
        <div className="message message-assistant">
          <div className="profile-message">
            <Image
              className="profileimg-message"
              src={avatar}
              alt="avatar"
              width="100"
              height="100"
            />
          </div>
          <div className="inner">
            <div className="content-msg">
              <p>{text}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="message message-you">
          <div className="inner-you">
            <div className="content-msg">
              <p>{text}</p>
            </div>
          </div>
        </div>
      );
    }
  };
  const sortedMessages = [...messages].sort((a, b) => a.time - b.time);
  return (
    <div className="chat-container">
      <div className="chat-left">
        <div className="profile">
          <a>
            <div className="picture">
              <Image
                className="avatar"
                width="100"
                height="100"
                src={avatar}
                alt="profile"
              />
            </div>
          </a>
          <div className="text">
            <h1 className="assist-name">Nacho</h1>
            <p className="assist-title">Asistente Virtual y Guia.</p>
          </div>
        </div>
        <div className="bio">
          <p>Soy un asistente virtual impulsado por inteligencia artificial.</p>
          <p>
            Puedo ayudarte a escribir, traducir y corregir textos , entre muchas
            otras cosas mas.
          </p>
          <p>Para iniciar, solo preguntame algo.</p>
        </div>
      </div>
      <div className="chat-right">
        <div className="chat-inner">
          <div className="chat-header"></div>
          <ul className="messages">{sortedMessages.map(renderMessage)}</ul>
          {loading === true ? renderLoadingDots() : null}
          <form className="message-form" onSubmit={handleMessageSubmit}>
            <input
              type="text"
              placeholder="Type your message here"
              value={message}
              onChange={handleMessageChange}
              ref={messageRef}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
