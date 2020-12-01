
var xmlhttp = new XMLHttpRequest();  

document.getElementById('add').addEventListener('click' , ()=>{


    var programName = document.getElementById('programName').value
    var code = document.getElementById('code').value
    



     
    var theUrl = "http://localhost:3000/program";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        programName,
        code
    }));

    console.log(xmlhttp.responseText)
})

