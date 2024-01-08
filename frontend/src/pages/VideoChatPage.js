import "../Chat.css";
import io from "socket.io-client";
import { useState , useEffect} from "react";
import Chat from "../components/VideoChat";
import axios from "axios"

const socket = io.connect("http://localhost:8000");

function ChatPage() {
  const [partner, setPartner] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = async () => {
      const response =  await axios.get('/getRoom', { params: {partner:partner} });
      const data=response.data;
      setRoom(data._id)
      socket.emit("join_room", data._id);
      console.log(socket)
      setShowChat(true);
    
  };
useEffect(() => {
  const id = localStorage.getItem('partner');
  console.log(id)
  setPartner(id)
}, []);
  return (
    <div className="Chat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Start Chat</h3>
           
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} partner={partner} room={room} />
      )}
    </div>
  );
}

export default ChatPage;
