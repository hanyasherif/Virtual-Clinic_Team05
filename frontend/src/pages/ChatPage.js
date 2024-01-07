import "../Chat.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../components/Chat";
import axios from "axios"

const socket = io.connect("http://localhost:8000");

function ChatPage() {
  const [partner, setPartner] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = async () => {
    if (partner !== "") {
      const response =  await axios.get('/getRoom', { params: {partner:partner} });
      const data=response.data;
      setRoom(data._id)
      socket.emit("join_room", data._id);
      console.log(socket)
      setShowChat(true);
    }
  };

  return (
    <div className="Chat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setPartner(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} partner={partner} room={room} />
      )}
    </div>
  );
}

export default ChatPage;