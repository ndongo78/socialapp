import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, userState } from '../slicers/userSlice';
import { conversationState, getOnlineUsers, updateMsg } from '../slicers/converMessageSlice';
import { createMessages } from '../middlewares/user';

const SERVER:string | undefined |any =process.env.REACT_APP_SOCKECT_SERVER

const initialState={
    myVideo:null,
    mystream:null,
    connectionRef:null,
    remotreUserStream:null,
    userVideo:null,
    call:{
    signal:"",
    from:{
        _id: "",
		username: "",
		email: "",
		password: "",
		phoneNumber: 0,
		isAdmin: false,
		friendIn: [],
		friendOut: [],
		createdAt: "",
		updatedAt: "",
		__v: 0
    },
    },
    callAccepted:false,
    callEnded:false,
    callUser:()=>{},
    leaveCall:()=>{},
    answerCall:()=>{},
    socket:null,
    mgs:"",
    setmgs:(t:string)=>{},
    handleSubmit:()=>{},
    isReceivingCall:false,
    userCaller:{},
    setMyStream:(t:any)=>{},
    peer:null,
    setCallAccepted:(t:any)=>{},
    setisReceivingCall:(t:any)=>{},
}

const SocketContext = createContext(initialState);



// const socket = io('http://localhost:5000');


const ContextProvider = ({ children }:any) => {
    const {user,islogin,token}=useSelector(userState)
    const {conversations,userChat,onlineUsers}=useSelector(conversationState)
     
    const [mgs, setmgs] = useState<string>("")
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [callEnded, setCallEnded] = useState(false);
    const [mystream, setMyStream] = useState<any>();
    const [remotreUserStream,setRemotreUserStream]=useState<any>()
    const [isReceivingCall, setisReceivingCall] = useState(false);
    const [call, setCall] = useState<{signal:any,from:any}>({
        signal:{},
        from:{
        _id: "",
		username: "",
		email: "",
		password: "",
		phoneNumber: 0,
		isAdmin: false,
		friendIn: [],
		friendOut: [],
		createdAt: "",
		updatedAt: "",
		__v: 0
	}    
    });
    const [userCaller, setuserCall] = useState<any>();

    const [socketId, setsocketId] = useState("")
    const myVideo = useRef<any>(initialState.myVideo);
    const userVideo = useRef<any>(initialState.userVideo);
    const connectionRef = useRef<any>();
    const [currentCall, setCurrentCall] = useState<any>()
    let socket=useRef<any>()
    let peer=useRef<any>()

    const dispatch = useDispatch()


    // useEffect(() => {
    //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //   .then((mediaStream) => {
    //      // console.log("currentStream",mediaStream)
    //       setMyStream(mediaStream);
    //       myVideo.current.srcObject = mediaStream;
          
    //   }).catch(err => console.log("err: ", err));
     
    // }, [])
    
    useEffect(() => {
        if(islogin){
           peer.current = new Peer( {
            path: '/',
            //host: "192.168.1.12",
           // host:"https://chabackendapi.herokuapp.comnnn",
            //port:5000,
            secure: true,
            config: {
              iceServers: [
                {
                  urls: [
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                  ],
                },
              ],
            },
          });
         socket.current=io(SERVER)
         socket.current.on("connection",(data:string)=>{
           console.log("on connection",data)
           peer.current.on('open',(peerId: string)=>{
            console.log("peerId",peerId)
            setsocketId(socketId)
            dispatch(setCurrentUser({...user,socketId:data}))
             socket.current.emit("register-new-user",{...user,socketId:data,peerId:peerId})
           })
         })
         socket.current.on('user-connected',(users:any)=>{
           dispatch(getOnlineUsers(users))
        })
        // peer.current.on('error', (err: Error) =>
        //   console.log('Peer server error', err),
        // );
   
        socket.current.on("messages",(data:any)=>{
         console.log("messages",data)
         dispatch(updateMsg(data)) 
         //setnewMessage(data)
       })
       socket.current.on("disconnect",()=>{
         socket.current.on('getUsers',(users:any)=>{
           dispatch(getOnlineUsers(users))
         })
       })
       socket.current.on('callUser', (data:any) => {
        console.log("callUser",data)
       setisReceivingCall(true)
       setuserCall(data.from)
       setCall({ signal:data.signal, from:data.from });
   });
   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
   .then((mediaStream) => {
      // console.log("currentStream",mediaStream)
       //setMyStream(mediaStream);
       myVideo.current.srcObject = mediaStream;
       peer.current.on("call",(call)=>{
         //setCurrentCall(call)
         call.answer(mediaStream)
         try {
           call.on("stream",(remoteStream: any)=>{
             userVideo.current.srcObject=remoteStream
           })
         } catch (error) {
           console.log("call error", error);
          return alert("Error calling")
         }
         console.log("callEvent",call)
       })
       
   }).catch(err => console.log("err: ", err));
     }
     }, [islogin])

  //    const answerCall = () => {
  //     setCallAccepted(true);

  //     const peer = new Peer({ initiator: false, trickle: false, stream:mystream });

  //     peer.on('signal', (data) => {
  //         socket.current.emit('answerCall', { signal: data, to: call.from });
  //       });
  //       peer.on('stream', (currentStream) => {
          
  //           //userVideo.current.srcObject = currentStream;
  //       });
  //       console.log("call.signal",call.signal)
  //       peer.signal(call.signal);
  
  
  //       connectionRef.current = peer;

  // };

  // const callUser = () => {
  //     const peer = new Peer({ initiator: true, trickle: false, stream:mystream });

  //     peer.on('signal', (data) => {
  //       //console.log("signal",data);
  //         socket.current.emit('callUser',  { userToCall: userChat, signalData: data, from: user });
  //     });
  //     console.log("callUser stream1",userVideo.current);
  //     peer.on('stream', (currentStream) => {
  //       console.log("callUser stream",userVideo.current);
  //         userVideo.current.srcObject = currentStream;
  //     });

  //     socket.current.on('callAccepted', (signal) => {
  //         console.log("signal accepted", signal);
  //         setCallAccepted(true);

  //         peer.signal(signal);
  //     });
  //     connectionRef.current = peer;
  // };

  //  useEffect(()=>{
  //   if(peer.current){
  //     peer.current.on("call",(call)=>{
  //       setCurrentCall(call)
  //       try {
  //         call.on("stream",(remoteStream: any)=>{
  //           userVideo.current.srcObject=remoteStream
  //         })
  //       } catch (error) {
  //         console.log("call error", error);
  //        return alert("Error calling")
  //       }
  //       console.log("callEvent",call)
  //     })
  //   }
  //  },[peer])


    const answerCall = () => {
        setCallAccepted(true);
        setisReceivingCall(false)
     // currentCall.answer(mystream)
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
         // console.log("currentStream",mediaStream)
          //setMyStream(mediaStream);
          myVideo.current.srcObject = mediaStream;
          peer.current.on("call",(call)=>{
            //setCurrentCall(call)
            call.answer(mediaStream)
            try {
              call.on("stream",(remoteStream: any)=>{
                userVideo.current.srcObject=remoteStream
              })
            } catch (error) {
              console.log("call error", error);
             return alert("Error calling")
            }
            console.log("callEvent",call)
          })
          
      }).catch(err => console.log("err: ", err));
      
    };

    const callUser = async() => {
          const remoteUser=onlineUsers.find((user: { _id: string; }) => user._id ===userChat._id);
         if(remoteUser && !remoteUser.peerId){
         return alert(`${userChat.username} n'est pas connecter`)
         }
             //setStream(currentStream);
             navigator.mediaDevices.getUserMedia({ video: true, audio: true })
             .then((mediaStream) => {
                // console.log("currentStream",mediaStream)
                 //setMyStream(mediaStream);
                 myVideo.current.srcObject = mediaStream;
                 socket.current.emit('callUser', { userToCall: remoteUser,from: user });
                 try {
                   var call=peer.current.call(remoteUser.peerId,mediaStream)
                  call.on("stream",(remoteStream)=>{
                    userVideo.current.srcObject=remoteStream
                  })
                 } catch (error) {
                  console.log("call failed", error)
                  return alert("Une erreur est survenue")
                 }
                 
             }).catch(err => console.log("err: ", err));
             
            

            //  myVideo.current.srcObject = currentStream;
         
        
        
        //  const peer = new Peer({ initiator: true, trickle: false, stream:mystream });
        // peer.on('signal', (data) => {
        //     console.log("signal", data);
        //     socket.current.emit('callUser', { userToCall: userChat, signalData: data, from: user });
        // });
        // peer.on('stream', (currentStream) => {
        //     userVideo.current.srcObject = currentStream;
        // });
        // socket.current.on('callAccepted', (signal:any) => {
        //     setCallAccepted(true);
        //     peer.signal(signal);
        // });
        // connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };

    const handleSubmit = ()=>{
        if(conversations){
           const mgsTo={
              conversationId:conversations._id,
              senderId:user._id,
              receiverId:userChat._id,
              content:mgs,
              //socketId:recever.socketId
            }
            dispatch(updateMsg(mgsTo)) 
            socket.current.emit("sendMessage",mgsTo)
            createMessages(mgsTo,token.token)
            .then(data=>{
              //dispatch(updateMsg(data)) 
              setmgs("")
            })
            .catch(err=>{
              console.log(err)
            })
        } 
       }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            mystream,
            callEnded,
            callUser,
            leaveCall,
            answerCall,
            socket,
            mgs,
            setmgs,
            handleSubmit,
            isReceivingCall,
            userCaller,
            setMyStream,
            remotreUserStream,
            peer,
            setCallAccepted,
            connectionRef,
            setisReceivingCall
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };