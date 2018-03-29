
var db = require("../models");

module.exports = function (app) {

  app.post("/api/login", function (req, res) {
    db.User.findOne({
      where:{
        username: req.body.username,
        password: req.body.password
      }
    }).then(function (data) {
      if(data){
        res.json(data);
      }
      else {
        res.end();
      }
    });
  });

  app.post("/api/newUser", function(req, res) {
    db.User.create(req.body).then(function (data) {
      res.end();
    });
  });

};
