var userName = localStorage.getItem("username");
var userId = localStorage.getItem("id");


var deleteProject = false;
var project_id;

function getPic(){
  $.get("/api/images/"+ userId).then(function(data){
    $("#imageLink").empty();
  //   var html = '<img src="data:'+data.image.type+';base64,'+data.image.data.toString("base64")+'" />';
    $("#imageLink").html(data);
  });
}

console.log(document.cookie);

if(!!window.performance && window.performance.navigation.type === 2)
{
    console.log('Reloading');
    window.location.reload();
}

$(document).ready(function() {

  $("#hiddenInput").attr("value", userId.toString())


  var object = {
    username: userName,
    userId: userId.toString()
  }
  writeProjects();
  getPic();

  function writeProjects() {
    $.post("/api/userProjects", object).then(function (data) {
      $("#projectTiles").html("")
      console.log(data)
      for (let i = 0; i < data.Projects.length; i++) {
        $("#projectTiles").append(`
          <div class="projectButton">
          <p data-id="${data.Projects[i].id}"
          class="projText">${data.Projects[i].name}</p>
          <a href="" data-toggle="modal" data-target="#deleteModal"
          data-id="${data.Projects[i].id}" class="delete"><i
          class="fas fa-times-circle"></i></a></div>`);

        $("#projectsDrop").append("<option class='options' data-id='" +
          data.Projects[i].id + "' value='" +
          data.Projects[i].name + "'>");
      }
    });
  }

  $("#modalSubmit").on("click", function() {
    var projObj = {
      name: $("#inputProject").val(),
      userId: userId
    };
    if (projObj.name.length > 1){
      $("#myModal").modal("hide");
      $("#inputProject").val("");
      $.post("/api/addProject", projObj).then((data) => {
        writeProjects();
      });
    }
  });

  $(document).on("click", ".projText", function (event) {
    var id = $(this).attr("data-id");
    var object = {
      id: id
    }
    console.log("here");
    localStorage.setItem("project_id", id);
    $.post("/api/currProject", object).then(function (data) {
      console.log(window.location.href);
      window.location.href = "/projectDash"
    });
  });

  $("#projectTiles").on("click", ".delete", function () {
    project_id  = $(this).attr("data-id");
  });

  $("#deleteModal").on("click", function () {
    deleteProject = true;
    if (deleteProject) {
      $.ajax({
        method: "DELETE",
        url: "/api/userProjects/"+project_id
      }).then((data) => {
        writeProjects();
      });
    }
  });

  $("#logout").on("click", function(){
    localStorage.removeItem("username")
    localStorage.removeItem("project_id")
    localStorage.removeItem("id")
    document.cookie = "token=; expires= Thu, 01 Jan 1970 00:00:00 UTC;";
  });


  $("#imageLink").on("click", function(event){
    event.preventDefault();
  })
});
