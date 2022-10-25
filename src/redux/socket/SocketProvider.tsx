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
    stream:null,
    userVideo:null,
    call:{
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
    },
    },
    callAccepted:false,
    callEnded:false,
    callUser:()=>{},
    leaveCall:()=>{},
    answerCall:()=>{},
    socket:{},
    mgs:"",
    setmgs:(t:string)=>{},
    handleSubmit:()=>{},
    isReceivingCall:false,
    userCaller:{},
    setStream:(t:any)=>{}
}

const SocketContext = createContext(initialState);



// const socket = io('http://localhost:5000');


const ContextProvider = ({ children }:any) => {
    const {user,islogin,token}=useSelector(userState)
    const {conversations,userChat,onlineUsers}=useSelector(conversationState)
     
    const [mgs, setmgs] = useState<string>("")
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState<any>();
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
    const userVideo = useRef<any>();
    const connectionRef = useRef<any>();
    let socket=useRef<any>()
    let peer=useRef<any>()

    const dispatch = useDispatch()

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
           setsocketId(socketId)
           peer.current.on('open', (peerId: string) => {
         console.log("peerid",peerId);
          dispatch(setCurrentUser({...user,socketId:data,peerId:peerId}))
           socket.current.emit("register-new-user",{...user,socketId:data,peerId:peerId})
        });
           
         })
         
         socket.current.on('user-connected',(users:any)=>{
           dispatch(getOnlineUsers(users))
        })
        peer.current.on('error', (err: Error) =>
          console.log('Peer server error', err),
        );
   
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
      
     }
     }, [islogin])

   

    // useEffect(() => {
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        //     .then((currentStream) => {
        //         setStream(currentStream);

        //         myVideo.current.srcObject = currentStream;
        //     });

        
    // }, []);

    const answerCall = async() => {
        setCallAccepted(true);
        setisReceivingCall(false)
       await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
         // myVideo.current.srcObject = currentStream;
            //setStream(currentStream);
            peer.current.on("call",call=>{
              call.answer(currentStream)
              try {
                call.on("stream",remoteStream=>{
                  userVideo.current.srcObject=remoteStream
                })
              } catch (error) {
                console.log("call error", error);
               return alert("Error calling")
              }
            })

        });
        
        //const peer = new Peer({ initiator: true, stream:stream });
        //console.log("stream received",stream);
      //   peer.on('error', (error) => {
          
      //     console.error('peer error', error)
      //   })
      //   peer.on('signal', (data) => {
      //       //console.log("stream received data",data);
      //       socket.current.emit('answerCall', { signal: data, to: call.from });
      //   });
      //   console.log("stream received","avva")
      //   peer.on('stream', (currentStream) => {
      //    console.log("stream received",currentStream)
      //       userVideo.current.srcObject = currentStream;
      //   }); 
      //   peer.signal(call.signal);
      //   console.log(call);

      // return  connectionRef.current = peer;
    };

    const callUser = async() => {
      
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
         .then((currentStream) => {
          myVideo.current.srcObject = currentStream;
          const remoteUser=onlineUsers.find((user: { _id: string; }) => user._id ===userChat._id);

         if(remoteUser && !remoteUser.peerId){
         return alert(`${userChat.username} n'est pas connecter`)
         }
             //setStream(currentStream);
             socket.current.emit('callUser', { userToCall: remoteUser,from: user });
             var call=peer.current.call(remoteUser.peerId,currentStream)
             try {
              call.on("stream",(remoteStream)=>{
                userVideo.current.srcObject=remoteStream
              })
             } catch (error) {
              console.log("call failed", error)
              return alert("Une erreur est survenue")
             }

            //  myVideo.current.srcObject = currentStream;
         });
        
        
         // const peer = new Peer({ initiator: true, trickle: false, stream });
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
            stream,
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
            setStream
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };