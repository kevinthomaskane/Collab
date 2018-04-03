var path = require("path");
var db = require("../models");

function checkCookie(token, cb) {
  var isTrue = false;
  db.User.findOne({
    where:{
      token: token
    }
  }).then(function (data) {
    if (data){
      isTrue = true;
      cb(isTrue);
    }
    else{
      cb(isTrue);
    }
  });
}

module.exports = app => {

  app.get("/", (req, res) => {
    console.log(req.cookies.token);
    checkCookie(req.cookies.token, function (isTrue) {
      if(isTrue){
        res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
      } else {
        res.sendFile(path.join(__dirname, "../public/html/landingpage.html"));
      }
    });

  });

  app.get("/home", (req, res) => {
    console.log(req.cookies.token);
    checkCookie(req.cookies.token, function (isTrue) {
      if(isTrue){
        res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
      } else {
        res.sendFile(path.join(__dirname, "../public/html/landingpage.html"));
      }
    });
  });

  app.get("/projectDash", (req, res) => {
    checkCookie(req.cookies.token, function (isTrue) {
      if(isTrue){
        res.sendFile(path.join(__dirname, "../public/html/projectDash.html"));
      } else {
        res.sendFile(path.join(__dirname, "../public/html/landingpage.html"));
      }
    });
  });
};
