$(document).ready(function() {
  var name = false;
  var user = false;
  var pass = false;

  $("#submitUser").on("click", () => {
    console.log("here");
    var userObject = {
      name: $("#name").val().trim(),
      username: $("#user").val().trim(),
      password: $("#pass").val().trim()
    }
    if (userObject.name.length > 0 &&
      userObject.username.length > 0 &&
      userObject.password.length > 0) {
      name = true;
      user = true;
      pass = true;
    }
    if (name && user && pass) {
      $.post("/api/newUser", userObject).then((data) => {
        console.log(data);
        if (data) {
          console.log("here");
          localStorage.setItem("username", data.username);
          localStorage.setItem("id", data.id);
          window.location.href = "/home";
        }
      });
    } else {
      alert("Please fill in all fields")
    }
  });

  $("#btn-login").on("click", () => {
    console.log("here");
    var userObj = {
      username: $("#login-username").val().trim(),
      password: $("#login-password").val().trim(),
      token: "t" + Math.random()
    };

    $.post("/api/login/", userObj).then(function(data) {
      console.log(data);
      localStorage.setItem("username", userObj.username);
      localStorage.setItem("id", data.id);
      window.location.href = "/home";
    });
  });
});
