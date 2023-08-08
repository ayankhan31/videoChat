import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "./lobby.css";
const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="register">
      <h1 className="heading animate-charcter">Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control registerInput "
            id="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email ID</label>
        </div>
        <br />
        <div className="form-floating mb-3">
        
        <input
          type="text"
          className="form-control registerInput"
          id="room"
          placeholder="Enter Room Number..."
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <label htmlFor="room">Room Number</label>
        </div>
        <br />
        <button className="btn btn-success registerButton">Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
