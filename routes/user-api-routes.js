var db = require("../models");

module.exports = function(app) {

  app.post("/api/login", function(req, res) {
    db.User.update(
      {token: req.body.token},
      {where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(data) {
      console.log("data" + data);
      if (data) {
        console.log("here");
        res.cookie("token", req.body.token,{maxAge: 9999});
        res.end();
      } else {
        res.end();
      }
    });
  });

  app.post("/api/newUser", function(req, res) {
    db.User.create(req.body).then(function(data) {
      res.end();
    });
  });


  //=============== Ed's cod========================
  app.get("/projectDash/:search" , function(req,res){
    db.User.findAll({
      where:{
        username: { like:req.params.search + '%'} 
      }
    }).then(function(data){
      res.json(data)
    })
  })

   







}