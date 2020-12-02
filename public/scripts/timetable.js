
// fetch program list
var program = document.getElementById('programs');

fetch('http://localhost:3000/programList').then((response)=>{
            response.json().then((data)=>{
                data.forEach((item)=>{
                    var s = document.createElement('option')
                    s.innerHTML = item;
                    s.setAttribute('value', item)
                    programs.appendChild(s);
                })
            })
        }).catch((error)=>{
            console.log(error)
})

// fetch cource list
var cource = document.getElementById('cources');

fetch('http://localhost:3000/courceList').then((response)=>{
            response.json().then((data)=>{
                data.forEach((item)=>{
                    var s = document.createElement('option')
                    s.innerHTML = item;
                    s.setAttribute('value', item)
                    cources.appendChild(s);
                })
            })
        }).catch((error)=>{
            console.log(error)
})


var xmlhttp = new XMLHttpRequest();  

document.getElementById('add').addEventListener('click' , ()=>{

    var programId = program.value
    var courceID = cource.value
    var day = document.getElementById('days').value
    var time = document.getElementById('time').value
    



     
    var theUrl = "http://localhost:3000/timetable";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
       programId,
       courceID,
       day,
       time
    }));

    console.log(xmlhttp.responseText)
})

