
$(document).ready(function () {

    $.get("/api/todos").then((data) => {
        for (let i = 0; i< data.length; i++){
            $("#need").append(`
            <li>
                 <button id="${data[i].id}" type="button" class="btn btn-primary">${data[i].content}
                     <a href="" id="${data[i].id}" class="need">
                        <i class="far fa-check-circle"></i>
                    </a>
                     <a href="" id="${data[i].id}" class="todos delete">
                        <i class="far fa-times-circle"></i>
                    </a>
                </button>
             </li>
            `)
        } 
    })

    $.get("/api/doings").then((data) => {
        for (let i= 0; i< data.length; i++){
            $("#doing").append(`
            <li>
                <button id="${data[i].id}"type="button" class="btn btn-success">${data[i].content}
                    <a href="" id="${data[i].id}" class="doing">
                            <i class="far fa-check-circle"></i>
                    </a>
                    <a href="" id="${data[i].id}" class="doings delete">
                         <i class="far fa-times-circle"></i>
                    </a>
                </button>
            </li>
        `)
        }
        
    })

    $.get("/api/dones").then((data) => {
        for (let i = 0; i < data.length; i++){
            $("#done").append(`
            <li>
                 <button id="${data[i].id}" type="button" class="btn btn-dark">${data[i].content}
                     <a href="" id="${data[i].id}" class="dones delete">
                        <i class="far fa-times-circle"></i>
                    </a>
                </button>
             </li>
        `)
        }
        
    })


    $(".add-need").on("click", function (event) {
        event.preventDefault();
        var text = $(".need-item").val().trim();
        var todo = {
            content: text
        }
        $.post("/api/todos", todo).then((data) => {
            for (let i = 0; i < data.length; i++){
                $("#need").prepend(`
                <li>
                     <button id="${data[i].id}" type="button" class="btn btn-primary">${data[i].content}
                         <a href="" id="${data[i].id}" class="need">
                            <i class="far fa-check-circle"></i>
                        </a>
                         <a href="" id="${data[i].id}" class="todos delete">
                            <i class="far fa-times-circle"></i>
                        </a>
                    </button>
                 </li>
                `)
            }   
        });
    })

    $(document).on("click", ".need", function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        var text = $(this).parent().text();
        var id = $(this).attr("id")
        var todo = {
            content: text,
            id: id
        }
        $(this).parent().remove();
        $.ajax({
            method: "DELETE",
            url: "/api/todos",
            data: todo
        }).then((data) => {
            $.post("/api/doings", todo).then((response) => {
                for (let i = 0; i < response.length; i++){
                    $("#doing").prepend(`
                    <li>
                         <button id="${response[i].id}"type="button" class="btn btn-success">${response[i].content}
                             <a href="" id="${response[i].id}" class="doing">
                                <i class="far fa-check-circle"></i>
                            </a>
                             <a href="" id="${response[i].id}" class="doings delete">
                                <i class="far fa-times-circle"></i>
                            </a>
                        </button>
                     </li>
                    `)
                }
            })
        });
    })

    $(document).on("click", ".doing", function (event) {
        event.preventDefault();
        var text = $(this).parent().parent().text();
        var id = $(this).attr("id")
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
                for (let i = 0; i < response.length; i++){
                    $("#done").prepend(`
                    <li>
                         <button id="${response[i].id}" type="button" class="btn btn-dark">${response[i].content}
                             <a href="" id="${response[i].id}" class="dones delete">
                                <i class="far fa-times-circle"></i>
                            </a>
                        </button>
                     </li>
                    `)
                }
            })
        });
    })

    $(document).on("click", ".delete", function (event) {
        event.preventDefault();
        var id = $(this).attr("id")
        var route = $(this).attr("class").split(" ")[0]
        $(this).parent().remove();
        $.ajax({
            method: "DELETE",
            url: "/api/" + route,
            data: done
        }).then((data) => {
            console.log(data)
        });
    })


})
