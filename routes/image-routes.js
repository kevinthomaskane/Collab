db = require("../models");

module.exports = function (app) {
  app.post("/upload", function (req, res) {
    console.log(req.files);
    db.User.update(
      {image: req.files.myUpload.data},
      {where: {
        id: req.body.id
      }}
    ).then(function () {
      res.end();
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
