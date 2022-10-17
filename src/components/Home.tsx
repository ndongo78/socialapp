import React from 'react'
import {AiFillWechat,AiOutlineVideoCamera,AiOutlineWechat,AiOutlineSetting, AiOutlineSearch} from 'react-icons/ai'
import {FaUsers} from "react-icons/fa"
import {BsTelephone,BsBookmark,BsThreeDotsVertical, BsEmojiSmile} from "react-icons/bs"
import {FiUsers} from "react-icons/fi"
import {IoMdHelp,IoIosCall} from "react-icons/io"
import {SiUploaded} from "react-icons/si"
import {RiMic2Fill} from "react-icons/ri"



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

const Home = () => {
    const links = [
        {
            icon: "<FaUsers />"
        }
    ];
  return (
    <div className='home contain'>
        <div className='flex items-center justify-between flex-col drawer' >
        <AiFillWechat size={80} color="lightgreen" className=" bg-white rounded-3xl p-1 mt-4" />
         <div className="links">
            <div className='iconContainer'>
                <AiOutlineWechat className='icons'  />
            </div>
            <div className='iconContainer'>
                <FiUsers className='icons'  />
            </div>
            <div className='iconContainer'>
                <IoIosCall className='icons'  />
            </div>
            <div className='iconContainer'>
                <AiOutlineVideoCamera className='icons'  />
            </div>
            <div className='iconContainer'>
                <BsBookmark className='icons'  />
            </div>
            <div className='iconContainer'>
                <AiOutlineSetting className='icons'  />
            </div>
         </div>
         <div>
        <div>
            <IoMdHelp className='icons'  />
        </div>
        </div>
        </div>
     <div className='user'>
        <div className="profile flex items-center justify-between">
            <div className=' w-full '>
            <div className='flex items-center  justify-between gap-5'>
            <div className=' flex gap-12 items-center'>
           <img src="https://picsum.photos/200/300"  style={{width:100,height:100,borderRadius:"50%",padding:10}} alt=""  />
            <div className="username">
                <p className=' text-2xl font-bold text-white space-x-1'>Jonh doe</p>
                <p>Mon compte</p>
                </div>
                </div>
                <BsThreeDotsVertical size={55} className="p-3 mr-3 border rounded-full cursor-pointer text-white" />
            </div>
            </div>
        </div>
        <div className="divider" />
        <div className="input flex self-center w-96 m-auto pt-6">
        <AiOutlineSearch className='search'  />
            <input type="text" placeholder='recherche un ami' className=' h-10 w-ful' />
        </div>
        <>
        <h2 className=' text-white text-3xl font-bold p-3 mt-8'>En ligne</h2>
        <div className="online flex gap-10 items-center">
            {
             users.map((user) =>(
                <div className="users flex flex-col items-center">
                     <img src={`${user.avatar}`} style={{width:100,height:100,borderRadius:"50%",padding:10}} alt=""  />
                     <p className='text-white text-xl font-semibold'> {user.name} </p>
                </div>
             ))
            }
        </div>
        </>
        <div className="messages">
            <h2 className='text-white text-3xl font-bold p-3 mt-8 mb-8'>Messages</h2>
            <div className="online flex gap-10 flex-col cursor-pointer overflow-scroll">
            {
             users.map((user) =>(
                <div className="users flex flex-row items-center justify-between ">
                     <div className="user-message flex flex-row items-center ">
                     <img src={`${user.avatar}`} style={{width:80,height:80,borderRadius:"50%",padding:10}} alt=""  />
                        <div className="user-message flex flex-col items-center ">
                        <p className='text-white text-2xl font-semibold'> {user.name} </p>
                         <p className='text-lg text-yellow-50 mt-1'>Hello john</p>
                        </div>
                     </div>
                      <p  className='text-md text-yellow-50 mr-3'>10:00 PM</p>
                </div>
             ))
            }
        </div>
        </div>
     </div>
     <div className='chat'>
       <div className=' w-full '>
            <div className='flex items-center  justify-between gap-5'>
            <div className=' flex gap-1 items-center'>
           <img src="https://picsum.photos/200/300"  style={{width:100,height:100,borderRadius:"50%",padding:10}} alt=""  />
            <div className="username">
                <p className=' text-2xl font-bold text-white space-x-1'>Jonh doe</p>
                <p></p>
                </div>
                </div>
                <div className="button flex items-center">
                <AiOutlineVideoCamera size={55} className="p-3 mr-3 border rounded-full cursor-pointer text-white" />
                <IoIosCall size={55} className="p-3 mr-3   border rounded-full cursor-pointer text-white" />
                <BsThreeDotsVertical size={55} className="p-3 mr-3 border rounded-full cursor-pointer text-white" />
                </div>
            </div>
            <div className="divider" />
            </div>
            <div className="chat-messages">
                <div className="current-user ">
                    hello world
                </div>
                <div className="sender-user flex items-end">
                    hello world
                </div>
            </div>
            <div className="chat-footer bg-slate-800 w-full">
                <div> 
                    <SiUploaded className='iconsChat' />
                 </div>
                 <input type="text" className='chat-input w-8/12 h-11' placeholder='envoyer un a john ...' />
                 <div className='flex gap-5'>
                 <RiMic2Fill className='iconsChat'/>
                 <BsEmojiSmile className='iconsChat' />
                 </div>
            </div>
     </div>
     <div className='detail'>
        <h2 className='text-white text-3xl font-bold p-3 mt-8'>Historiques</h2>
     </div>
    </div>
  )
}

export default Home