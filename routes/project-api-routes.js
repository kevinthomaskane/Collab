var db = require("../models");

module.exports = function (app) {
  app.get("/api/userProjects", function (req, res) {
    db.User.findOne({
      include:[{
        model: db.Project,
        through: {
          attributes:[],
          where:{
            UserId: req.body.userId
          }
        }
      }]
    }).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/addProject", function (req, res) {
    db.Project.create(req.body)
    .then(function (project) {
      project.addDone();
      res.json(project);
    });
  });
};
