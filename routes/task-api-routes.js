var db = require("../models");

module.exports = function(app) {
  app.post("/api/currProject", function(req, res) {
    db.Doing.findAll({
      where: {
        project_id: req.body.id
      }
    }).then(function() {
      res.end();
    });

    db.Done.findAll({
      where: {
        project_id: req.body.id
      }
    }).then(function() {
      res.end();
    });

    db.ToDo.findAll({
      where: {
        project_id: req.body.id
      }
    }).then(function() {
      res.end();
    });
  });

  app.get("/api/doings/:id", function(req, res) {
    db.Doing.findAll({
      where: {
        project_id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/dones/:id", function(req, res) {
    db.Done.findAll({
      where: {
        project_id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/todos/:id", function(req, res) {
    db.ToDo.findAll({
      where: {
        project_id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
};
