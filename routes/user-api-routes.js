var db = require("../models");

module.exports = function (app) {

  app.get("/api/login/:username/:password", function (req, res) {
    db.User.findOne({
      where:{
        username: req.params.username,
        password: req.params.password
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/newUser", function(req, res) {
    db.User.create(req.body).then(function (data) {
      res.end();
    });
  });

};
