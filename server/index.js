const express = require("express")
const  socket =require ("socket.io")
const cors = require("cors")

const PORT=process.env.PORT || 5000
let onlineUser=[]

const addUser=(username,socketId)=>{
   if(username && socketId){
  !onlineUser.some((user)=>user._id === username._id)
  && onlineUser.push({username,socketId:socketId})
}
}

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.username._id === userId);
};

const app=express()
app.use(cors())


app.get("/", (req,res)=>{
  res.send("welcome to node server")
})


const server=app.listen(PORT,()=>{
  console.log (`server is running on http://localhost:${PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection",socket=>{
  socket.emit('connectionUser',socket.id)
  socket.on("register-new-user",data=>{
    addUser(data,socket.id)
    
    socket.emit("user-connected",onlineUser)
  })

  socket.on('sendMessage',(data)=>{
    const userTo=onlineUser.find(user=>user.username._id === data.receiverId)
    console.log("userTo: ",userTo)
    console.log("sendMessage",data) 
    socket.to(userTo.socketId).emit('messages',data) 
  })

  
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", onlineUser);
  });
})