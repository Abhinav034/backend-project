
var xmlhttp = new XMLHttpRequest();  

document.getElementById('postButton').addEventListener('click' , ()=>{


    var professorName = document.getElementById('profName').value
    var contactInfo = document.getElementById('profID').value
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

document.getElementById('fetchButton').addEventListener('click' , ()=>{
    
    fetch('http://localhost:3000/professors').then((response)=>{
        response.json().then((data)=>{
            data.forEach((item)=>{
                console.log(item)
            })
        })
    }).catch((error)=>{
        console.log(error)
    })


})