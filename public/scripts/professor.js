
var xmlhttp = new XMLHttpRequest();  

document.getElementById('addProf').addEventListener('click' , ()=>{


    var professorName = document.getElementById('pname').value
    var email = document.getElementById('pemail').value
    var contactInfo = document.getElementById('pcontact').value

     
    var theUrl = "http://localhost:3000/professors";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        professorName,
        email,
        contactInfo
    }));

    console.log(xmlhttp.responseText)
})

