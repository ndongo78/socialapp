import { BsEmojiSmile } from "react-icons/bs";
import { RiMic2Fill } from "react-icons/ri";
import { SiUploaded } from "react-icons/si";

const ChatInput = () => {
  return (
    <div className="chat-footer bg-slate-800 w-full">
      <div>
        <SiUploaded className="iconsChat" />
      </div>
      <input
        type="text"
        className="chat-input w-8/12 h-11"
        placeholder="envoyer un a john ..."
      />
      <div className="flex gap-5">
        <RiMic2Fill className="iconsChat" />
        <BsEmojiSmile className="iconsChat" />
      </div>
    </div>
  );
};

export default ChatInput;
