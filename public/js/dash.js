
var userName = localStorage.getItem("username")
var userId = localStorage.getItem("id")
console.log(userId.toString());
$(document).ready(function () {

    var object ={
        username: userName,
        userId: userId.toString()
    }

    console.log(object)
    
    $.post("/api/userProjects", object).then((data)=>{
        console.log(data)
        for (let i=0;  i<data.Projects.length; i++){
            $("#projectTiles").append(`
            <button class="projectButton">${data.Projects[i].name}</button>
            `)
            $("#projectsDrop").append(`
            <options value="${data.Projects[i].name}" id="${data.Projects[i].name}"/>
            `)
        }
    })
  
  });