import { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { conversationState } from '../redux/slicers/converMessageSlice';
import "../styles/Video.scss"
import {ImPhoneHangUp} from 'react-icons/im'
import { SocketContext } from '../redux/socket/SocketProvider';
import { userState } from '../redux/slicers/userSlice';
import NotificationCall from './NotificationCall';

const VideoCall = () => {
    const {userChat}=useSelector(conversationState)
    const {myVideo,
      isReceivingCall , answerCall    }=useContext(SocketContext)
    const userVideo=useRef<any>()
   const {islogin}=useSelector(userState)

    const navigate=useNavigate()
    useEffect(() => {
      if (!islogin) {
        navigate("/")
       }
    }, [islogin])


//add the video to display in
  
   
  
return (
<>
<div className="modale"
  >
    {
    isReceivingCall &&
    <NotificationCall answerCall={answerCall} />
    }
  <div className="userto">
    <h3> {userChat?.username} </h3>
    <p>Appel en cour</p>
  </div>
  <div className=' flex'>
    <div className=" ">
   
    <video playsInline  ref={myVideo}  autoPlay className="video" />
    
    </div>
   <div className=''>
    <video playsInline  ref={userVideo}  autoPlay className="video" />
   </div>
   
  </div>
  
  
  <div className="btn-container">
    <ImPhoneHangUp size={50}/>
  </div>
</div>
</>
  )
}

export default VideoCall