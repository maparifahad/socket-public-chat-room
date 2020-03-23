const express  = require("express");
const app = express();
const socket = require("socket.io");

const server = app.listen(process.env.PORT || 5000);
app.use(express.static("public"));

const io = socket(server);

io.on("connection", (socket)=>{
   
    socket.on("chat", (data)=>{
        socket.broadcast.emit("chat", data);
    });

    socket.on("typing", (data)=>{
        socket.broadcast.emit("typing", data)
    });
})