import React, { useContext } from 'react'
import {IoIosCall} from "react-icons/io"
import {MdCallEnd} from "react-icons/md"
import { SocketContext } from '../redux/socket/SocketProvider'
import "../styles/Notifier.scss"

const NotificationCall = ({answerCall}:any) => {
  const {call,callAccepted,}=useContext(SocketContext)
  return (
    <div className='notifier' >
       <h4> {call.from?.username} vous appel </h4>
       <div className="btns">
        <div className="accept">
         <IoIosCall onClick={()=>answerCall()} />   
        </div>
        <div className="reject">
         <MdCallEnd />   
        </div>
        </div>
    </div>
  )
}

export default NotificationCall