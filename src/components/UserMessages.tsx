import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userState, getUsers } from "../redux/slicers/userSlice";
import { users } from "./Users";

const UserMessages = () => {
  const {userss,token}=useSelector(userState)
  console.log(userss)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers(token.token))

  }, [])
  
  return (
    <div className="online flex gap-10 flex-col cursor-pointer">
      {userss.map((user:any) => (
        <div className="users flex flex-row items-center justify-between ">
          <div className="user-message flex flex-row items-center ">
            <img
              src={`https://picsum.photos/200/`}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                padding: 10,
              }}
              alt=""
            />
            <div className="user-message flex flex-col items-center ">
              <p className="text-white text-2xl font-semibold"> {user.username} </p>
              <p className="text-lg text-yellow-50 mt-1">Hello john</p>
            </div>
          </div>
          <p className="text-md text-yellow-50 mr-3">10:00 PM</p>
        </div>
      ))}
    </div>
  );
};

export default UserMessages;
