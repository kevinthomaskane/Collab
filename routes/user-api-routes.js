var db = require("../models/index.js");
db.User



//---->>>>BASIC API ROUT SET UP <<<-------------
//---->>>CHANCH TO CORRECT ROUT<<<---------//
module.exports = app => {
    app.get("/api/files", (req,res) => {
        db.User.findAll({}).then(data => {
            res.json(data);
        });
    });




app.post("/newUser", (req,res) => {
    db.User.create({
        name:req.body.name,
        userNmae:req.body.userNmae,
        password:req.body.password
    }).then(data => {
        res.json(data);
    });
});


app.put("/api/file", (req, res) => {
    db.User.update(req.body, {
      where:{
        id:req.body.id
      }
    }).then(data => {
      res.json(data);
    })
  });
 

app.delete("/api/file/:id",(req, res) => {
    db.User.destroy({
      where: {
        id:req.params.id
    }
  }).then(result =>{
   res.end()
  })
});
   

};