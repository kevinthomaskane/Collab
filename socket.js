var db = require("./models");

function addChat(message, username, project_id) {
  db.Chat.create({
    content: message,
    username: username,
    project_id: project_id
  });
};

module.exports = function (server) {
  var io = require("socket.io")(server);
  io.sockets.on("connection", function(socket){
    console.log("socket connection made ",socket.id)
    socket.on("room", function(room){
      console.log("room", room);
      // io.sockets.emit("chat", data)
      socket.join(room);

      socket.on("message", function(data) {
        console.log(data);
        io.sockets.in(room).emit('message', {message: data.message,username:data.username});
        addChat(data.message, data.username, data.project_id);
      });
      socket.on("typing",function(data){
        socket.broadcast.in(room).emit("typing",{username:data.username})
      });
    });
  });
}
