import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { userState } from '../redux/slicers/userSlice'

export const MessageChat = ({message}:any) => {
    const {user}=useSelector(userState)
     const ref=useRef<any>()
     
    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

  return (
    <div 
    className={`message ${user._id === message.senderId && "owner"} `}
     key={message._id}
     ref={ref}
     >
      <div className="messageInfo">
        <img src={"https://picsum.photos/200/300"} alt="" />
      </div>
      <div className="messageContent">
        <p> {message.content} </p>
        {/* <img src={"https://picsum.photos/200/300"} alt="" /> */}
        <span style={{ textAlign: "right" }}>just now</span>
      </div>
    </div>
  )
}
