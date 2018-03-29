$(document).ready(function () {
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
      if (userObject.name.length > 0 && userObject.username.length > 0 && userObject.password.length > 0) {
          name = true;
          user = true;
          pass = true;
      }
      if (name && user && pass) {
          $.post("/api/newUser", userObject).then((data) => {
              if (data) {
                  alert("Thank you for signing up, now please log in")
              }
          });
      } else {
          alert("Please fill in all fields")
      }
  });


  $("#login").on("click", () => {
      var returnUser = {
          userName: $("#returnName").val().trim(),
          password: $("#returnPass").val().trim()

      }
  });
});
