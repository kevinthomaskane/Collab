var project_id = localStorage.getItem("project_id");
var username = localStorage.getItem("username");
var userId = localStorage.getItem("id");

$("#hiddenInput").attr("value", userId.toString())

function printCollabs() {
  $.get("/api/contributors/" + project_id).then(function(data) {
    $("#projectName").text(data.name)
    console.log(data);
    var curr;
    for (var i = 0; i < data.Users.length; i++) {
      if (data.Users[i].name === username) {
        $("#contributors").append(`
          <button data-user=${data.Users[i].id}
          type="button" class="btn btn-success">
          You</button>
          `);
      } else {
        $("#contributors").append(`
          <button data-user=${data.Users[i].id}
          type="button" class="btn btn-success">
          ${data.Users[i].username}</button>
          `);
      }
    }
  });
}

function writeEverything() {
  $("#need").empty();
  $("#doing").empty();
  $("#done").empty();

  $.get("/api/todos/" + project_id).then((data) => {
    for (let i = 0; i < data.length; i++) {
      $("#need").append(`
        <li>
         <button data-id="${data[i].id}" type="button"
         class="btn btn-primary">${data[i].content}
           <a href="" data-id="${data[i].id}" class="need">
              <i class="far fa-check-circle"></i>
           </a>
           <a href="" data-id="${data[i].id}" class="todos delete">
              <i class="far fa-times-circle"></i>
           </a>
         </button>
        </li>
      `);
    }
  });

  $.get("/api/doings/" + project_id).then((data) => {
    for (let i = 0; i < data.length; i++) {
      $("#doing").append(`
        <li>
         <button data-id="${data[i].id}"type="button"
         class="btn btn-success">${data[i].content}
          <a href="" data-id="${data[i].id}" class="doing">
           <i class="far fa-check-circle"></i>
          </a>
          <a href="" data-id="${data[i].id}" class="doings delete">
           <i class="far fa-times-circle"></i>
          </a>
         </button>
        </li>
      `);
    }
  });

  $.get("/api/dones/" + project_id).then((data) => {
    for (let i = 0; i < data.length; i++) {
      $("#done").append(`
        <li>
         <button data-id="${data[i].id}" type="button"
         class="btn btn-dark">${data[i].content}
          <a href="" data-id="${data[i].id}" class="dones delete">
           <i class="far fa-times-circle"></i>
          </a>
         </button>
        </li>
      `);
    }
  });
}


function printChats(){
  $("#newplace").html('');
  $.get("/api/chats/" + project_id).then(function(data){
    for (let i = 0; i < data.length; i++){
      if (data[i].username === username){
        $("#chatList").append(`
      <li style="text-align: left;"><span style="font-weight: bold">You:</span> ${data[i].content}</li>
      `)
      } else{
        $("#chatList").append(`
        <li style="text-align: left;"><span style="font-weight: bold">${data[i].username}:</span>  ${data[i].content}</li>
        `)
      }
    }
  })
}

function getPic(){
  $.get("/api/images/"+ userId).then(function(data){
    $("#imageLink").empty();
  //   var html = '<img src="data:'+data.image.type+';base64,'+data.image.data.toString("base64")+'" />';
    $("#imageLink").html(data);
  });
}

$(document).ready(function() {


  writeEverything();
  printCollabs();
  printChats();
  getPic();

  $(".add-need").on("click", function(event) {
    event.preventDefault();
    var text = $(".need-item").val().trim();
    var todo = {
      content: text,
      project_id: project_id
    }
    if (text.length >= 1){
      $(".need-item").val('');
      $.post("/api/todos", todo).then((data) => {
        for (let i = 0; i < data.length; i++) {
          $("#need").prepend(`
            <li>
             <button data-id="${data[i].id}" type="button"
             class="btn btn-primary">${data[i].content}
              <a href="" data-id="${data[i].id}" class="need">
               <i class="far fa-check-circle"></i>
              </a>
              <a href="" data-id="${data[i].id}" class="todos delete">
               <i class="far fa-times-circle"></i>
              </a>
             </button>
            </li>
          `);
        }
        writeEverything();
      });
    }
  });

  $(".add-doing").on("click", function(event) {
    event.preventDefault();
    var text = $(".doing-item").val().trim();
    var todo = {
      content: text,
      project_id: project_id
    }
    if(text.length>=1){
      $(".doing-item").val('');
      $.post("/api/doings", todo).then((data) => {
        for (let i = 0; i < data.length; i++) {
          $("#doing").prepend(`
            <li>
             <button data-id="${data[i].id}" type="button"
             class="btn btn-success">${data[i].content}
              <a href="" data-id="${data[i].id}" class="need">
               <i class="far fa-check-circle"></i>
              </a>
              <a href="" data-id="${data[i].id}" class="todos delete">
               <i class="far fa-times-circle"></i>
              </a>
             </button>
            </li>
          `);
        }
        writeEverything();
      });
    }

  });

  $(".add-done").on("click", function(event) {
    event.preventDefault();
    var text = $(".done-item").val().trim();
    var todo = {
      content: text,
      project_id: project_id
    }
    if(text.length>=1){
      $(".done-item").val('');
      $.post("/api/dones", todo).then((data) => {
        for (let i = 0; i < data.length; i++) {
          $("#done").prepend(`
            <li>
             <button data-id="${data[i].id}" type="button"
             class="btn btn-dark">${data[i].content}
              <a href="" data-id="${data[i].id}" class="need">
               <i class="far fa-check-circle"></i>
              </a>
              <a href="" data-id="${data[i].id}" class="todos delete">
               <i class="far fa-times-circle"></i>
              </a>
             </button>
            </li>
          `);
        }
        writeEverything();
      });
    }
  
  });

  $(document).on("click", ".need", function(event) {
    event.preventDefault();
    var text = $(this).parent().text().trim();
    var id = $(this).parent().attr("data-id");
    var todo = {
      content: text,
      project_id: project_id
    }
    console.log(todo.project_id);
    $(this).parent().remove();
    $.ajax({
      method: "DELETE",
      url: "/api/todos/" + id
    }).then((data) => {
      $.post("/api/doings", todo).then((response) => {
        for (let i = 0; i < response.length; i++) {
          $("#doing").prepend(`
            <li>
             <button data-id="${response[i].id}"type="button"
             class="btn btn-success">${response[i].content}
                 <a href="" data-id="${response[i].id}" class="doing">
                  <i class="far fa-check-circle"></i>
                 </a>
                 <a href="" data-id="${response[i].id}"
                 class="doings delete">
                  <i class="far fa-times-circle"></i>
                 </a>
             </button>
            </li>
          `);
        }
        writeEverything();
      });
    });

  });

  $(document).on("click", ".doing", function(event) {
    event.preventDefault();
    var text = $(this).parent().parent().text().trim();
    var id = $(this).parent().attr("data-id")
    var done = {
      content: text,
      project_id: project_id
    };
    $(this).parent().parent().remove();
    $.ajax({
      method: "DELETE",
      url: "/api/doings/" + id,
    }).then((data) => {
      $.post("/api/dones", done).then((response) => {
        for (let i = 0; i < response.length; i++) {
          $("#done").prepend(`
            <li>
             <button data-id="${response[i].id}" type="button"
             class="btn btn-dark">${response[i].content}
              <a href="" data-id="${response[i].id}"
              class="dones delete">
               <i class="far fa-times-circle"></i>
              </a>
             </button>
            </li>
          `);
        }
        writeEverything();
      });
    });

  });

  $(document).on("click", ".delete", function(event) {
    event.preventDefault();
    var id = $(this).parent().attr("data-id")
    var route = $(this).attr("class").split(" ")[0]
    console.log(id);
    $(this).parent().remove();
    $.ajax({
      method: "DELETE",
      url: "/api/" + route + "/" + id
    }).then((data) => {
      console.log(data)
      writeEverything();
    });
  });

  $("#addUser").on("click", function() {
    var user = $("#usersSearch").val().trim();
    var userObj = {
      name: user
    };
    console.log(user);
    $.post("/api/contributors/" + project_id, userObj).then(function(response) {
      console.log(response);
      $("#contributors").empty();
      printCollabs();
    });
  });

  $("#logout").on("click", function() {
    localStorage.removeItem("username");
    localStorage.removeItem("project_id");
    localStorage.removeItem("id");
    document.cookie = "token=; expires= Thu, 01 Jan 1970 00:00:00 UTC;";
  })

  $("#imageLink").on("click", function(event){
    event.preventDefault();
  })

});

var currentURL= document.location.host;
var socket = io.connect(currentURL);
var message = $("#messageField").val()
var room = project_id;

//send message click funct.
$(document).on("click", "#sendMessage", function(event) {

  var message = $("#messageField").val();
  console.log(message);
  socket.emit("message",  {message: message,
    username: username,
    project_id:project_id});
  $('#newplace').html('');
  $("#messageField").val("");
  // socket.emit("typing",  {username: username});
  
});

socket.on('connect', function() {
  socket.emit('room', room);
});


$(document).on('input',"#messageField",function(){
  socket.emit("typing",{username:username})
})


socket.on("typing",function(data){
  $("#newplace").html( "<p id='typer' ><b>" + data.username+"</b>"+": is typing" +  "</p>")
})


socket.on("message", (data) =>{
  $('#newplace').html('');
  if (data.username === username){
    $("#chatList").append(`
  <li style="text-align: left;"><span style="font-weight: bold">You:</span> ${data.message}</li>
  `)
  } else{
    $("#chatList").append(`
    <li style="text-align: left;"><span style="font-weight: bold">${data.username}:</span>  ${data.message}</li>
    `)
  }
});



//=========---->>>>>dropdown user search <<<<<---==================
var names = [];
function filterFunction() {

  var usersSearch = $("#usersSearch").val();
  if (usersSearch.length >= 1){
    $.get("/projectDash/" + usersSearch).then(function(data){
      $("#dropdown-content").empty();
      for (var i = 0; i < data.length; i++) {
        names.push(data[i].username);
        console.log(names)
        $("#dropdown-content").append("<option data-id='" +
          data[i].id + "' value='" +
          data[i].username + "'>")
        }
    });
  }
}


$(document).on("change", "#usersSearch", function() {
  var selection = $("#usersSearch").val().trim();
  var object = {
    name: $("#usersSearch").val().trim()
  }
  for (let i = 0; i < names.length; i++){
    if (names[i] === selection){
      $.post("/api/contributors/" + project_id, object).then(function(data){
        console.log("post successful")
        $("#contributors").empty();
        printCollabs();
        });
        $("#usersSearch").val("");
        i = names.length-1;
    }

  }

});
