const express = require("express")
const  socket =require ("socket.io")
const cors = require("cors")

const PORT=process.env.PORT || 5000
let onlineUser=[]

const addUser=(username,socketId)=>{
  const islog= onlineUser.some(user=>user._id ===username._id)
  console.log(islog)
  !onlineUser.some((user)=>user._id ===username._id)
  && onlineUser.push({username,socketId:socketId})
}

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
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
  
  socket.on("register-new-user",data=>{
    addUser(data,socket.id)
    
    socket.emit("user-connected",onlineUser)
  })
  
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", onlineUser);
  });
})