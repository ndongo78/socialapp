import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import { useSelector } from "react-redux";
import { conversationState } from "../redux/slicers/converMessageSlice";

const CurrentChatUser = () => {
  const {userChat} =useSelector(conversationState)
  console.log("userChat",userChat)
  return (
    <div className=" w-full ">
      <div className="flex items-center  justify-between gap-5">
        <div className=" flex gap-1 items-center">
          <img
            src="https://picsum.photos/200/300"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              padding: 10,
            }}
            alt=""
          />
          <div className="username">
            <p className=" text-2xl font-bold text-white space-x-1"> {userChat?.username} </p>
            <p></p>
          </div>
        </div>
        <div className="button flex items-center">
          <AiOutlineVideoCamera
            size={55}
            className="p-3 mr-3 border rounded-full cursor-pointer text-white"
          />
          <IoIosCall
            size={55}
            className="p-3 mr-3   border rounded-full cursor-pointer text-white"
          />
          <BsThreeDotsVertical
            size={55}
            className="p-3 mr-3 border rounded-full cursor-pointer text-white"
          />
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default CurrentChatUser;
