var project_id = localStorage.getItem("project_id");
var username = localStorage.getItem("username");

function printCollabs() {
  $.get("/api/contributors/" + project_id).then(function (data) {
    console.log(data);
    var curr;
    for (var i = 0; i < data.Users.length; i++) {
      if(data.Users[i].name === username){
        $("#contributors").append(`
          <button data-user=${data.Users[i].id}
          type="button" class="btn btn-success">
          You</button>
          `);
      } else {
        $("#contributors").append(`
          <button data-user=${data.Users[i].id}
          type="button" class="btn btn-success">
          ${data.Users[i].name}</button>
          `);
      }
    }
  });
}

function writeEverything(){
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
 
$(document).ready(function() {

  writeEverything();
  printCollabs();

  $(".add-need").on("click", function(event) {
    event.preventDefault();
    var text = $(".need-item").val().trim();
    var todo = {
      content: text,
      project_id: project_id
    }
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
    });
    writeEverything();
  });

  $(".add-doing").on("click", function(event) {
    event.preventDefault();
    var text = $(".doing-item").val().trim();
    var todo = {
      content: text,
      project_id: project_id
    }
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
    });
    writeEverything();
  });

  $(".add-done").on("click", function(event) {
    event.preventDefault();
    var text = $(".done-item").val().trim();
    var todo = {
      content: text,
      project_id: project_id
    }
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
    });
    writeEverything();
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
          `)
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

  $("#addUser").on("click", function () {
    var user = $("#submitContributer").val().trim();
    var userObj = {
      name: user
    };
    console.log(user);
    $.post("/api/contributors/" + project_id, userObj).then(function (response) {
      console.log(response);
      $("#contributors").empty();
      printCollabs();
    });
  });
  
  $("#logout").on("click", function(){
    localStorage.removeItem("username")
    localStorage.removeItem("project_id")
    localStorage.removeItem("id")
  })

});
