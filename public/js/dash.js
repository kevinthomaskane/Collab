var userName = localStorage.getItem("username");
var userId = localStorage.getItem("id");

var deleteProject = false;

$(document).ready(function() {

  var object = {
    username: userName,
    userId: userId.toString()
  }

  writeProjects();

  function writeProjects() {
    $.post("/api/userProjects", object).then((data) => {
      $("#projectTiles").html("")
      console.log(data.Projects)
      for (let i = 0; i < data.Projects.length; i++) {
        $("#projectTiles").append(`
          <button type="button"
          class="btn btn-primary projectButton">
          <a data-id="${data.Projects[i].id}"
          class="projText">${data.Projects[i].name}</a>
          <a data-toggle="modal" data-target="#deleteModal"
          data-id="${data.Projects[i].id}" class="delete"><i
          class="fas fa-times-circle"></i></a></button>`);

        $("#projectsDrop").append("<option class='options' data-id='" +
          data.Projects[i].id + "' value='" +
          data.Projects[i].name + "'>")
      }
    });
  }

  $("#modalSubmit").on("click", function() {
    var projObj = {
      name: $("#inputProject").val(),
      userId: userId
    };
    $("#myModal").modal("hide")
    $("#inputProject").val("")
    $.post("/api/addProject", projObj).then((data) => {
      writeProjects()
    });

  });

  $(document).on("change", "#test", () => {
    var id;
    for (let i = 0; i < $(this)["0"].activeElement.list.children.length; i++) {
      if ($(this)["0"].activeElement.list.children[i].attributes[2].nodeValue === $("#test").val()) {
        id = $(this)["0"].activeElement.list.children[i].attributes[2].nodeValue
      }
    }
    var object = {
      id: id
    }
    $.post("/api/currProject", object).then((data) => {
      window.location.href = "/projectDash";
    });

  });

  $(document).on("click", ".projText", (event) => {
    var id =
      $(this)["0"].activeElement.children["0"].attributes["0"].nodeValue;
    var object = {
      id: id
    }
    localStorage.setItem("project_id", id);
    $.post("/api/currProject", object).then((data) => {
      window.location.href = "/projectDash"


    });
  });

  $("#projectTiles").on("click", ".delete", () => {
    var id = $(this)["0"].activeElement.attributes[2].nodeValue;
    if (deleteProject) {
      var object = {
        id: id
      };
      $.ajax({
        method: "DELETE",
        url: "/api/userProjects",
        data: object
      }).then((data) => {
        writeProjects();
      });
    }

  })

  $("#deleteModal").on("click", () => {
    deleteProject = true;
  });

});
