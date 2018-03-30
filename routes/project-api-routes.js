var db = require("../models");

module.exports = function(app) {
  app.post("/api/userProjects", function(req, res) {
    console.log(req.body);
    db.User.findOne({
      include: [{
        model: db.Project,
        through: {
          attributes: [],
          where: {
            UserId: req.body.userId
          }
        }
      }]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/addProject", function(req, res) {
    db.Project.create({
        name: req.body.name,
      })
      .then(function(project) {
        console.log(db.Project.prototype);
        project.setUsers([req.body.userId]);
        res.json(project);
      });
  });
};
