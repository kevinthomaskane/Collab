var db = require("../models");

module.exports = function (app) {
  app.post("/api/currProject", function (req, res) {
    db.Doing.findAll({
      where:{
        project_id: req.body.id
      }
    }).then(function () {
      res.end();
    });
  });

  app.get("/api/doings/:id", function (req, res) {
    db.Doing.findAll({
      where:{
        project_id: "1"
      }
    }).then(function (data) {
      console.log(data);
      res.json(data);
    });
  });
};
