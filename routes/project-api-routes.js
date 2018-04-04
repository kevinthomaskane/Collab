var db = require("../models");

module.exports = function(app) {
  app.post("/api/userProjects", function(req, res) {
    //console.log(req.body);
    db.User.findOne({
      where:{
        id: req.body.userId
      },
      include: [{
        model: db.Project,
        through: {
          attributes: [],
          where: {
            userId: req.body.userId
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
        project.setUsers([req.body.userId]);
        res.json(project);
      });
  });

  app.post("/api/contributors/:project_id", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.name
      }
    }).then(function (user) {
     // console.log(db.User.prototype);
      user.addProjects([req.params.project_id]);
      res.json(user);
    })
  });

  app.delete("/api/userProjects/:id", function (req, res) {
    db.Project.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.end();
    });
  });

  app.get("/api/contributors/:project_id", function (req, res) {
    //console.log(db.Project.prototype);
    db.Project.findOne({
      where:{
        id: req.params.project_id
      },
      include: [{
        model: db.User,
        through: {
          attributes: [],
        }
      }]
    }).then(function (project) {
      res.json(project);
    });
  });
};
