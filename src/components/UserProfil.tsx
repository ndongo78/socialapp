import { BsThreeDotsVertical } from "react-icons/bs";

const UserProfil = () => {
  return (
    <div className=" w-full ">
      <div className="flex items-center  justify-between gap-5">
        <div className=" flex gap-12 items-center">
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
            <p className=" text-2xl font-bold text-white space-x-1">Jonh doe</p>
            <p>Mon compte</p>
          </div>
        </div>
        <BsThreeDotsVertical
          size={55}
          className="p-3 mr-3 border rounded-full cursor-pointer text-white"
        />
      </div>
    </div>
  );
};

export default UserProfil;
