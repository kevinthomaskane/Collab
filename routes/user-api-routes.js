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
      if (data) {
        console.log("here");
        res.cookie("token", req.body.token,{maxAge: 999999999});
        db.User.findOne({
          where:{
            username: req.body.username
          }
        }).then(function (data) {
          res.json(data);
        });
      } else {
        res.end();
      }
    });
  });

  app.post("/api/newUser", function(req, res) {
    req.body.token =  "t"+Math.random();
    console.log(req.body.token);
    db.User.create(req.body).then(function(data) {
      res.cookie("token", req.body.token,{maxAge: 999999999});
      res.json(data);
    });
  });


  //=============== Ed's cod========================
  app.get("/projectDash/:search" , function(req,res){
    db.User.findAll({
      where:{
        username: { like:req.params.search + '%'}
      }
    }).then(function(data){
      console.log("this is data sent back from user search", data)
      res.json(data)
    })
  })









}
