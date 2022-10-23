import { useContext } from "react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { conversationState, setCategory } from "../redux/slicers/converMessageSlice";
import { SocketContext } from "../redux/socket/SocketProvider";

const CurrentChatUser = () => {
  const {userChat} =useSelector(conversationState)
  const {callUser}=useContext(SocketContext)
  const dispatch = useDispatch()

  return (
    <div className=" w-full ">
      {
        userChat != null && (
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
            className="p-3 mr-3 border rounded-full cursor-pointer text-white icons"
            onClick={()=>{
            dispatch(setCategory("videoCall"))
            callUser()
          }}
          />
          <IoIosCall
            size={55}
            className="p-3 mr-3   border rounded-full cursor-pointer text-white icons"
            onClick={()=>dispatch(setCategory("audioCall"))}
         />
          <BsThreeDotsVertical
            size={55}
            className="p-3 mr-3 border rounded-full cursor-pointer text-white icons"
          />
        </div>
      </div>
        )
      }
      <div className="divider" />
    </div>
  );
};

export default CurrentChatUser;
