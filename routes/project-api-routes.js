var db = require("../models");

module.exports = function (app) {

  app.get("/api/userProjects", function (req, res) {
    db.User.findAll({
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
};
