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

  app.post("/api/todos", function (req, res) {
    db.ToDo.create({
      content: req.body.content,
      project_id: req.body.project_id
    }).then(function (todo) {
      res.json(todo);
    });
  });

  app.post("/api/doings", function (req, res) {
    db.Doing.create({
      content: req.body.content,
      project_id: req.body.project_id
    }).then(function (todo) {
      res.json(todo);
    });
  });

  app.post("/api/dones", function (req, res) {
    db.Done.create({
      content: req.body.content,
      project_id: req.body.project_id
    }).then(function (todo) {
      res.json(todo);
    });
  });

  app.delete("/api/todos/:id", function (req, res) {
    db.ToDo.destroy({
      where:{
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  app.delete("/api/doings/:id", function (req, res) {
    db.Doing.destroy({
      where:{
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  app.delete("/api/dones/:id", function (req, res) {
    db.Done.destroy({
      where:{
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });
};
