import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, userState } from "../redux/slicers/userSlice";


export const users:{id:number,name:string,avatar:string}[] = [
    {
        id: 1,
        name: 'John Doe',
        avatar: 'https://picsum.photos/200/300'
    },
    {
        id: 2,
        name: 'Jane Doe',
        avatar: 'https://picsum.photos/200'
    },
    {
        id: 3,
        name: 'Jack Doe',
        avatar: 'https://picsum.photos/200/'
    },
    {
        id: 4,
        name: 'Jill Doe',
        avatar: 'https://picsum.photos/200/300/'
    },
    {
        id: 5,
        name: 'Joe Doe',
        avatar: 'https://picsum.photos/200/301/'
    },
];


const Users = () => {
 

  return (
    <>
      <h2 className=" text-white text-3xl font-bold p-3 mt-8">En ligne</h2>
      <div className="online flex gap-10 items-center">
        {users.map((user:any) => (
          <div className="users flex flex-col items-center">
            <img
              src={`${user.avatar}`}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                padding: 10,
              }}
              alt=""
            />
            <p className="text-white text-xl font-semibold"> {user.name} </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
