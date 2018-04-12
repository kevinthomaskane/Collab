db = require("../models");

module.exports = function (app) {
  app.post("/api/upload", function (req, res) {
    console.log(req);
    db.User.update(
      {image: req.files.uploadFile.data},
      {where: {
        id: req.body.userId
      }}
    ).then(function () {
      res.redirect("/home");
    });
  });

  app.get("/api/images/:id", function (req, res) {
    db.User.findOne({
      where:{
        id: req.params.id
      }
    }).then(function (data) {
      console.log(data);
      var html =
      `<img id="profilePic" data-toggle="modal" data-target="#imageModal" src="data:${data.image.type};base64,${data.image.toString("base64")}" />`;
      res.send(html);
    });
  });

  app.get("/test", function(req, res) {
  // send html form with encoding type attr
  res.send(`
    <form method='POST' action='/upload' encType='multipart/form-data'>
      <input type='text' name='myName' />
      <input type='file' name='myUpload' />
      <input type='submit' value='Submit' />
    </form>
  `);
});
};
