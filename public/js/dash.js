var userName = localStorage.getItem("username");
var userId = localStorage.getItem("id");

$(document).ready(function() {

  var object = {
    username: userName,
    userId: userId.toString()
  }

  $.post("/api/userProjects", object).then((data) => {
    console.log(data)
    $("#projectTiles").html("")
    for (let i = 0; i < data.Projects.length; i++) {
      $("#projectTiles").append(`
            <button type="button"
            class="btn btn-primary projectButton"
            data-id="${data.Projects[i].id}">
            ${data.Projects[i].name}</button>
            `)
      $("#projectsDrop").append("<option class='options' data-id='" +
        data.Projects[i].id + "' value='" +
        data.Projects[i].name + "'>")
    }
  });

  $("#modalSubmit").on("click", function() {
    var projObj = {
      name: $("#inputProject").val(),
      userId: userId
    };
    $("#myModal").modal("hide")
    $("#inputProject").val("")
    $.post("/api/addProject", projObj).then((data) => {
      console.log(data);
    });

  });


  $(document).on("change", "#test", () => {
    var id;
    for (let i = 0; i < $(this)["0"].activeElement.list.children.length; i++){
        if ($(this)["0"].activeElement.list.children[i].attributes[2].nodeValue === $("#test").val()){
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

  $(document).on("click", ".projectButton", (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
    var id = $(this)["0"].activeElement.attributes[2].nodeValue;
    var object = {
      id: id
    }
    localStorage.setItem("project_id", id);
    $.post("/api/currProject", object).then((data) => {
      window.location.href = "/projectDash"
    });
  });

});
