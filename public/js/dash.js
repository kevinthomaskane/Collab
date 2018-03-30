var userName = localStorage.getItem("username")
var userId = localStorage.getItem("id")
console.log(userId.toString());
$(document).ready(function() {

  var object = {
    username: userName,
    userId: userId.toString()
  }

  $.post("/api/userProjects", object).then((data) => {
    console.log(data)
    for (let i = 0; i < data.Projects.length; i++) {
      $("#projectTiles").append(`
            <button type="button"
            class="btn btn-primary projectButton"
            id="${data.Projects[i].id}">
            ${data.Projects[i].name}</button>
            `)
      $("#projectsDrop").append("<option id='" +
        data.Projects[i].id + "' value='" +
        data.Projects[i].name + "'>")
    }
  });

  $("#addProj").on("click", function() {

    var projObj = {
      name: "test",
      userId: userId
    };

    $.post("/api/addProject", projObj).then((data) => {
      console.log(data);
    });

  });

  $(document).on("click", "option", () => {
    var id = $(this).attr("id")
    var object = {
      id: id
    }
    $.post("/api/userProjects", object).then((data) => {
      window.location.href = "/projectDash";
    })
  })

  $(document).on("click", ".projectButton", () => {
    var id = $(this).attr("id")
    var object = {
      id: id
    }
    $.post("/api/userProjects", object).then((data) => {
      window.location.href = "/projectDash"
    })
  })

});
