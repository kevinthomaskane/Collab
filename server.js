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
var fileUpload = require('express-fileupload');
var $ = require("jquery");

// Sets up the Express App
// =============================================================
var app = express();
app.use(cookieParser());
app.use(fileUpload());
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
require("./routes/chat-api-routes.js")(app);
require("./routes/image-routes.js")(app);

db.sequelize.sync().then(function() {
  var server = app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    require("./socket.js")(server);

  });
// ============---->>>>  SOCKET.IO CODE ------->>>>>=========================================


});
