var db = require("../models");

module.exports = function(app) {

  app.post("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(data) {
      if (data) {
        res.json(data);
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

   
app.get("/",function(req,res){
  
    if(){
      var token = "t"+ Math.rendom();
      res.cookie("token", token, {maxAge:999});
      return res.send()
    }
  } 
})
 


};