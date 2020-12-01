
var xmlhttp = new XMLHttpRequest();  

document.getElementById('add').addEventListener('click' , ()=>{


    var professorName = document.getElementById('profName').value
    var contactInfo = document.getElementById('profContact').value
    var subject = document.getElementById('profSub').value



     
    var theUrl = "http://localhost:3000/professors";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        professorName,
        contactInfo,
        subject
    }));

    console.log(xmlhttp.responseText)
})

