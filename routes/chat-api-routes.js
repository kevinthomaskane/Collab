var db = require("../models");

module.exports = function (app) {
  app.get("/api/chats/:id", function (req, res) {
    db.Chat.findAll({
      where:{
        project_id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    })
  });
};
