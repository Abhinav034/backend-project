
// fetch program list
var program = document.getElementById('programs');

fetch('http://localhost:3000/programData').then((response)=>{
            response.json().then((data)=>{
                data.forEach((item)=>{
                    var s = document.createElement('option')
                    s.innerHTML = item.programName;
                    s.setAttribute('value', item.programName)
                    programs.appendChild(s);
                })
            })
        }).catch((error)=>{
            console.log(error)
})

// fetch cource list
var course = document.getElementById('courses');

fetch('http://localhost:3000/courseData').then((response)=>{
            response.json().then((data)=>{
                data.forEach((item)=>{
                    var s = document.createElement('option')
                    s.innerHTML = item.courseName;
                    s.setAttribute('value', item.courseName)
                    course.appendChild(s);
                })
            })
        }).catch((error)=>{
            console.log(error)
})

var xmlhttp = new XMLHttpRequest();  

document.getElementById('btnSchedule').addEventListener('click' , ()=>{

    var programId = program.value
    var courseId = course.value
    var day = document.getElementById('day').value
    var time = document.getElementById('time').value
    
    var theUrl = "http://localhost:3000/timetable";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
       programId,
       courseId,
       day,
       time
    }));

    console.log(xmlhttp.responseText)
})

