'use client';
import React, { useState, useEffect, useRef } from 'react';
import './chat.css';
import Image from 'next/image';
import avatar from '../assets/avatar.png';
import { useChat } from 'ai/react';

const Chat = () => {
  const { isLoading, messages, input, handleInputChange, handleSubmit } =
    useChat({
      api: '/api/chat',
    });
  const renderLoadingDots = () => {
    return (
      <div className="messages message-assistant">
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
  const renderMessage = (messages) => {
    return messages?.map((message) => {
      if (message?.role === 'assistant') {
        return (
          <div key={message.id} className="message message-assistant">
            <div className="profile-message">
              <Image
                className="profileimg-message"
                src={avatar}
                alt="avatar"
                width="50"
                height="50"
              />
            </div>
            <div className="inner">
              <div className="content-msg">
                <p>{message?.content}</p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={message.id} className="message message-you">
            <div className="inner-you">
              <div className="content-msg-you">
                <p>{message?.content}</p>
              </div>
            </div>
          </div>
        );
      }
    });
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
          <ul className="messages">{renderMessage(messages)}</ul>
          {isLoading === true ? renderLoadingDots() : null}
          <form className="message-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message here"
              value={input}
              onChange={handleInputChange}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Chat;
