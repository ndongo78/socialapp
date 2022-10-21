import {
  AiFillWechat,
  AiOutlineVideoCamera,
  AiOutlineWechat,
  AiOutlineSetting,
} from "react-icons/ai";
import {
  BsBookmark,
} from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoMdHelp, IoIosCall } from "react-icons/io";
import "../styles/Drawer.scss"
const Drawer = () => {
  return (
    <div className="flex items-center justify-between flex-col drawer">
      <AiFillWechat
        size={80}
        color="lightgreen"
        className="logo bg-white rounded-3xl p-1 mt-4"
      />
      <div className="links">
        <div className="iconContainer">
          <AiOutlineWechat className="icons" />
        </div>
        <div className="iconContainer">
          <FiUsers className="icons" />
        </div>
        <div className="iconContainer">
          <IoIosCall className="icons" />
        </div>
        <div className="iconContainer">
          <AiOutlineVideoCamera className="icons" />
        </div>
        <div className="iconContainer">
          <BsBookmark className="icons" />
        </div>
        <div className="iconContainer">
          <AiOutlineSetting className="icons" />
        </div>
      </div>
      <div>
        <div>
          <IoMdHelp className="icons" />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
