import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chatService from "../../services/chatService";
import axios from "axios";

const ChatTab = ({ isDark, lecture }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const params = useParams()

  const [loading, setLoading] = useState(false);

  const createMessage = async(message,type) => {
    const userMessage = {   
      type: type,
      message: message,
      course_id: params.course_id
    };
      await chatService.sendMessage(userMessage).then(response => {
      getAllMesssage()
      setNewMessage("")
      console.log("set chat user")
    })
  };  


  const handleSendMessage = async(e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    createMessage(newMessage,'user')
    console.log(newMessage)
    callApiAi(newMessage)
    console.log("chat ai")
    
  };

  const callApiAi = async (question) => {
    try {
      setLoading(true);
      // Call AI API to get the response
      const response = await chatService.chatAI(question);
      console.log(response) 
      await createMessage(response.answer, 'ai');
    } catch (error) { 
      console.error('Error fetching AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllMesssage= async() => {
    const response = await chatService.getAllMessage({
      course_id : params.course_id
    })
    setMessages(response.data)
  }

  useEffect(()=>{
    getAllMesssage()
  },[])

  // const formatTime = (timestamp) => {
  //   const date = new Date(timestamp);
  //   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Chat messages - với chiều cao cố định */}
      <div 
        className={`overflow-y-auto p-3 ${isDark ? "bg-gray-700" : "bg-gray-100"} rounded-lg mb-3`} 
        style={{ 
          height: "500px", 
          flexGrow: 0, 
          flexShrink: 0, 
          flexBasis: "auto"
        }}
      >
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-3 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[85%] rounded-lg px-3 py-2 ${
                message.type === "user" 
                  ? isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white" 
                  : isDark ? "bg-gray-600 text-white" : "bg-white text-gray-800"
              } shadow`}
            >
              <div className="flex items-center mb-1">
                <span className={`font-medium text-sm ${message.type === "user" ? "" : "text-green-400"}`}>
                  {message.type === "user" ? "Bạn" : "Hệ thống"}
                </span>
                {/* <span className={`text-xs ml-2 ${isDark ? "text-orage-300" : "text-orage-500"}`}>
                  {formatTime(message.created_at)}
                </span> */}
              </div>
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input */}
      <div className={`${isDark ? "bg-gray-700" : "bg-gray-100"} rounded-lg p-2`}>
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập câu hỏi hoặc ý kiến của bạn..."
            className={`flex-1 p-2 rounded-lg mr-2 text-sm ${
              isDark 
                ? "bg-gray-800 text-white border-gray-600" 
                : "bg-white text-gray-800 border-gray-300"
            } border`}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 rounded-lg ${
              newMessage.trim() 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-gray-400 text-gray-200"
            } flex items-center justify-center`}
          >
            <span className="material-icons text-sm">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatTab;