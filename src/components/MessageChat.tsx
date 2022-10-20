import React from 'react'
import { useSelector } from 'react-redux'
import { userState } from '../redux/slicers/userSlice'

export const MessageChat = ({message}:any) => {
    const {user}=useSelector(userState)
  return (
    <div className={`message ${user._id === message.senderId && "owner"} `} key={message._id}>
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
