import {
  AiOutlineSearch,
} from "react-icons/ai";
import "../styles/Message.scss";
import Message from "../components/Message";
import Users from "../components/Users";
import Drawer from "../components/Drawer";
import UserProfil from "../components/UserProfil";
import UserMessages from "../components/UserMessages";
import CurrentChatUser from "../components/CurrentChatUser";
import ChatInput from "../components/ChatInput";

const Home = () => {
    


  return (
    <div className="home contain">
      <Drawer />
      <div className="user">
        <div className="profile flex items-center justify-between">
          <UserProfil />
        </div>
        <div className="divider" />
        <div className="input flex self-center w-96 m-auto pt-6">
          <AiOutlineSearch className="search" />
          <input
            type="text"
            placeholder="recherche un ami"
            className=" h-10 w-ful"
          />
        </div>
        <Users />
        <div className="messages">
          <h2 className="text-white text-3xl font-bold p-3 mt-8 mb-8">
            Messages
          </h2>
          <UserMessages />
        </div>
      </div>
      <div className="chat">
        <CurrentChatUser />
        <div className="chat-messages">
          <Message />
          <Message />
        </div>
        <ChatInput />
      </div>
      <div className="detail">
        <h2 className="text-white text-3xl font-bold p-3 mt-8">Historiques</h2>
      </div>
    </div>
  );
};

export default Home;
