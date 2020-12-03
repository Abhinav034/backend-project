var coursesTable = document.getElementById('table-courses')
var prof = document.getElementById('instructor');

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

document.getElementById('addCourse').addEventListener('click' , ()=>{

    var courseCode = document.getElementById('courseID').value
    var courseName = document.getElementById('courseName').value
    var roomNumber = parseInt(document.getElementById('roomNumber').value)
    var hours = parseInt(document.getElementById('courseHours').value)
    var profId = prof.value

    // get prof ID

    var theUrl = "http://localhost:3000/course";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        courseCode,
        courseName,
        roomNumber,
        hours,
        profId

    })
    );
    console.log(xmlhttp.responseText)



    fetch('http://localhost:3000/courseData').then((response) => {
        response.json().then((data) => {
            let lastItem = data[data.length - 1]

            if(data.length == 1){

                let tr = document.createElement('tr');
                coursesTable.appendChild(tr)
                
                let th = document.createElement('th');
                th.appendChild(document.createTextNode('Course name'));
                tr.appendChild(th)

                let th2 = document.createElement('th');
                th2.appendChild(document.createTextNode('Professor'))
                tr.appendChild(th2)

                let th3 = document.createElement('th');
                th3.appendChild(document.createTextNode('Room number'))
                tr.appendChild(th3)

                let th4 = document.createElement('th');
                th4.appendChild(document.createTextNode('Course Hours'))
                tr.appendChild(th4)
            }

            var tr = document.createElement('tr');
            coursesTable.appendChild(tr)

            var td = document.createElement('td')
            td.appendChild(document.createTextNode(lastItem.courseName))
            tr.appendChild(td)

            var td1 = document.createElement('td')
            td1.appendChild(document.createTextNode(lastItem.profId))
            tr.appendChild(td1)

            var td2 = document.createElement('td')
            td2.appendChild(document.createTextNode(lastItem.roomNumber))
            tr.appendChild(td2)

            var td3 = document.createElement('td')
            td3.appendChild(document.createTextNode(lastItem.hours))
            tr.appendChild(td3)
              
        })
    })

})


fetch('http://localhost:3000/courseData').then((response) => {
    response.json().then((data) => {

        if(data.length > 0){

            let tr = document.createElement('tr');
            coursesTable.appendChild(tr)
            
            let th = document.createElement('th');
            th.appendChild(document.createTextNode('Course name'));
            tr.appendChild(th)

            let th2 = document.createElement('th');
            th2.appendChild(document.createTextNode('Professor'))
            tr.appendChild(th2)

            let th3 = document.createElement('th');
            th3.appendChild(document.createTextNode('Room number'))
            tr.appendChild(th3)

            let th4 = document.createElement('th');
            th4.appendChild(document.createTextNode('Course Hours'))
            tr.appendChild(th4)
        }

        data.forEach((item) => {
            console.log(item);
            var tr = document.createElement('tr');
            coursesTable.appendChild(tr)

            var td = document.createElement('td')
            td.appendChild(document.createTextNode(item.courseName))
            tr.appendChild(td)

            var td1 = document.createElement('td')
            td1.appendChild(document.createTextNode(item.profId))
            tr.appendChild(td1)

            var td2 = document.createElement('td')
            td2.appendChild(document.createTextNode(item.roomNumber))
            tr.appendChild(td2)

            var td3 = document.createElement('td')
            td3.appendChild(document.createTextNode(item.hours))
            tr.appendChild(td3)
            
        })
    })
})
