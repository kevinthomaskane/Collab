$(document).ready(function () {

    
    $(".add-need").on("click", function(event){
        event.preventDefault();
        var text = $(".need-item").val().trim();
        var todo ={
            item: text
        }
        $.post("/api/todos", todo).then((data)=>{
            $("#need").prepend(`
            <li id="${data.id}">
                 <button id="${data.id}" type="button" class="btn btn-primary">${data.item}
                     <a href="" id="${data.id}" class="need">
                        <i class="far fa-check-circle"></i>
                    </a>
                     <a href="" id="${data.id}" class="delete">
                        <i class="far fa-times-circle"></i>
                    </a>
                </button>
             </li>
            `)
          });
    })
    
    $(document).on("click", ".need", function (event) {
        event.preventDefault();
        console.log("hi there")
        var text = $(this).parent().text();
        var id = $(this).attr("id")
        $(this).parent().remove();
        $("#doing").prepend(`
        <li>
             <button type="button" class="btn btn-success">${text}
                 <a href="" class="doing">
                    <i class="far fa-check-circle"></i>
                </a>
                 <a href="" class="delete">
                    <i class="far fa-times-circle"></i>
                </a>
            </button>
         </li>
        `)
    })

    $(document).on("click", ".doing", function (event) {
        event.preventDefault();
        var text = $(this).parent().parent().text();
        $(this).parent().parent().remove();
        $("#done").prepend(`
        <li>
             <button type="button" class="btn btn-dark">${text}
                 <a href="" class="delete">
                    <i class="far fa-times-circle"></i>
                </a>
            </button>
         </li>
        `)
    })

    $(document).on("click", ".delete", function (event) {
        event.preventDefault();
        $(this).parent().remove();
    })







})