var db = require("../models");

module.exports = function (app) {
  app.post("/api/currProject", function (req, res) {
    db.Doing.findAll({
      where:{
        project_id: req.body.id
      }
    });
  })
};
