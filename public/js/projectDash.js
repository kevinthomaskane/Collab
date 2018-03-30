$(document).ready(function() {

  $.get("/api/todos").then((data) => {
    $("#need").append(`
        <li>
         <button id="${data.id}" type="button" class="btn btn-primary">${data.content}
           <a href="" id="${data.id}" class="need">
              <i class="far fa-check-circle"></i>
          </a>
           <a href="" id="${data.id}" class="todos delete">
              <i class="far fa-times-circle"></i>
          </a>
        </button>
         </li>
        `)
  });

  $.get("/api/doings").then((data) => {
    $("#doing").append(`
        <li>
          <button id="${data.id}"type="button" class="btn btn-success">${data.content}
            <a href="" id="${data.id}" class="doing">
                    <i class="far fa-check-circle"></i>
            </a>
            <a href="" id="${data.id}" class="doings delete">
                 <i class="far fa-times-circle"></i>
            </a>
          </button>
        </li>
    `)
  });

  $.get("/api/dones").then((data) => {
    $("#done").append(`
        <li>
           <button id="${data.id}" type="button" class="btn btn-dark">${data.content}
             <a href="" id="${data.id}" class="dones delete">
                <i class="far fa-times-circle"></i>
             </a>
           </button>
         </li>
      `)
  });


  $(".add-need").on("click", function(event) {
    event.preventDefault();

    var text = $(".need-item").val().trim();
    var todo = {content: text};

    $.post("/api/todos", todo).then((data) => {
      $("#need").prepend(`
          <li>
           <button id="${data.id}" type="button" class="btn btn-primary">${data.content}
             <a href="" id="${data.id}" class="need">
                <i class="far fa-check-circle"></i>
             </a>
             <a href="" id="${data.id}" class="todos delete">
                <i class="far fa-times-circle"></i>
             </a>
           </button>
          </li>
          `)
    });
  });

  $(document).on("click", ".need", function(event) {
    event.preventDefault();

    var text = $(this).parent().text();
    var id = $(this).attr("id");

    var todo = {
      content: text,
      id: id
    };

    $(this).parent().remove();
    $.ajax({
      method: "DELETE",
      url: "/api/todos",
      data: todo
    }).then((data) => {
      $.post("/api/doings", todo).then((response) => {
        $("#doing").prepend(`
            <li>
             <button id="${response.id}"type="button" class="btn btn-success">${response.content}
               <a href="" id="${response.id}" class="doing">
                  <i class="far fa-check-circle"></i>
               </a>
               <a href="" id="${response.id}" class="doings delete">
                  <i class="far fa-times-circle"></i>
               </a>
             </button>
             </li>
            `)
      });
    });
  });

  $(document).on("click", ".doing", function(event) {
    event.preventDefault();

    var text = $(this).parent().parent().text();
    var id = $(this).attr("id");

    var done = {
      content: text,
      id: id
    }

    $(this).parent().parent().remove();
    $.ajax({
      method: "DELETE",
      url: "/api/doing",
      data: done
    }).then((data) => {
      $.post("/api/dones", todo).then((response) => {
        $("#done").prepend(`
            <li>
             <button id="${response.id}" type="button" class="btn btn-dark">${response.content}
                 <a href="" id="${response.id}" class="dones delete">
                    <i class="far fa-times-circle"></i>
                 </a>
             </button>
            </li>
            `)
      });
    });
  })

  $(document).on("click", ".delete", function(event) {
    event.preventDefault();
    var id = $(this).attr("id");
    var route = $(this).attr("class").split(" ")[0];
    $(this).parent().remove();
    $.ajax({
      method: "DELETE",
      url: "/api/" + route,
      data: done
    }).then((data) => {
      console.log(data);
    });

  });







})
