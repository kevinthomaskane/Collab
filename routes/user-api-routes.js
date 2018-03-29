var db = require("../models");

module.exports = function (app) {

  app.get("/api/login", function (req, res) {
    db.User.findOne({
      where:{
        username: req.body.username,
        password: req.body.password
      }
    });
  });

  app.post("/api/newUser", function(req, res) {
    db.User.create(req.body).then(function (data) {
      res.end();
    });
  });

};
