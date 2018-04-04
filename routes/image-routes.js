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
