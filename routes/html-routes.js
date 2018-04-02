var path = require("path");

module.exports = app => {

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
  });

  app.get("/projectDash", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/projectDash.html"));
  });

 

};
