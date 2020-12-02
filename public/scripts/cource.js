
var prof = document.getElementById('pro');




    
        fetch('http://localhost:3000/professorsList').then((response)=>{
            response.json().then((data)=>{
                data.forEach((item)=>{
                    var s = document.createElement('option')
                    s.innerHTML = item;
                    s.setAttribute('value', item)
                    prof.appendChild(s);
                    
                    
                })
            })
        }).catch((error)=>{
            console.log(error)
        })




var xmlhttp = new XMLHttpRequest();  

document.getElementById('add').addEventListener('click' , ()=>{


    var courceID = document.getElementById('courceID').value
    var courseName = document.getElementById('courseName').value
    var roomNumber = parseInt(document.getElementById('roomNumber').value)
    var hours = parseInt(document.getElementById('hours').value)
    var profId = prof.value
    

    // get prof ID


    

    var theUrl = "http://localhost:3000/cource";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        courceID,
        courseName,
        roomNumber,
        hours,
        profId

    })
    );
    console.log(xmlhttp.responseText)

})

