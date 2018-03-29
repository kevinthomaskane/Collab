
var userName = JSON.parse(localStorage.getItem("username"))
var userId = JSON.parse(localStorage.getItem("id"))

$(document).ready(function () {

    var object ={
        username: userName,
        userId: userId
    }
    
    $.get("/api/userProjects", object).then((data)=>{
        for (let i=0;  i<data.length; i++){
            $("#projectTiles").append(`
            <button class="projectButton">${data[i].projectName}</button>
            `)
            $("#projectsDrop").append(`
            <options value="${data[i].projectName}" id="${data[i].projectName}">
            `)
        }
    })
  
  });