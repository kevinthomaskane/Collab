// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var socket = require("socket.io");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var $ = require("jquery");

// Sets up the Express App
// =============================================================
var app = express();
app.use(cookieParser());
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/user-api-routes.js")(app);
require("./routes/task-api-routes.js")(app);
require("./routes/project-api-routes.js")(app);
require("./routes/html-routes.js")(app);
 
 




 

db.sequelize.sync().then(function() {
  var server = app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  
     
  });

  
  var io = socket(server) 
   
 
  io.on("connection", function(socket){
      console.log("socket connection made ",socket.id)
  var socket = io.connect("http://localhost:8080");
      socket.on("chat", function(data){
          io.sockets.emit("chat", data)
      })
  
  });
  

}); 
  