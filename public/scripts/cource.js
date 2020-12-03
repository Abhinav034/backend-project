var coursesTable = document.getElementById('table-courses')
var prof = document.getElementById('instructor');
var courseCode, courseName, roomNumber, hours;

function isValid(){
    courseCode = document.getElementById('courseID').value
    courseName = document.getElementById('courseName').value
    roomNumber = parseInt(document.getElementById('roomNumber').value)
    hours = parseInt(document.getElementById('courseHours').value)

    if(courseCode == "" || courseName == "" || document.getElementById('roomNumber').value == "" || document.getElementById('courseHours').value == ""){
        return false;
    }
    return true;
}

fetch('http://localhost:3000/professorsData').then((response)=>{
    response.json().then((data)=>{
        data.forEach((item)=>{
            var s = document.createElement('option')
            s.innerHTML = item.professorName;
            s.setAttribute('value', item.professorName)
            prof.appendChild(s);
            
        })
    })
}).catch((error)=>{
    console.log(error)
})

var xmlhttp = new XMLHttpRequest();  

document.getElementById('addCourse').addEventListener('click' , ()=>{

    if(!isValid()){
        alert("Please fill all fields!!");
        return;
    }

    var profId = prof.value

    var theUrl = "http://localhost:3000/course";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        courseCode,
        courseName,
        roomNumber,
        hours,
        profId

    }));

    var result = JSON.parse(xmlhttp.responseText)
    if(result.status == "failure"){
        alert(result.message);
    } else if(result.status == "success"){
        alert(result.message);

        document.getElementById('form').reset();

        var tr = document.createElement('tr');
        tr.setAttribute('id', result.courseObj._id)
        coursesTable.appendChild(tr)

        var td = document.createElement('td')
        td.appendChild(document.createTextNode(courseCode))
        tr.appendChild(td)

        var td4 = document.createElement('td')
        td4.appendChild(document.createTextNode(courseName))
        tr.appendChild(td4)

        var td1 = document.createElement('td')
        td1.appendChild(document.createTextNode(profId))
        tr.appendChild(td1)

        var td2 = document.createElement('td')
        td2.appendChild(document.createTextNode(roomNumber))
        tr.appendChild(td2)

        var td3 = document.createElement('td')
        td3.appendChild(document.createTextNode(hours))
        tr.appendChild(td3)

        createButton(tr, function(){
            deleteRecord(result.courseObj._id, 'Course');
        })
    }
    


})

function showAllCourses(){
    fetch('http://localhost:3000/courseData').then((response) => {
    response.json().then((data) => {

        if(data.length > 0){

            let tr = document.createElement('tr');
            coursesTable.appendChild(tr)
            
            let th = document.createElement('th');
            th.appendChild(document.createTextNode('Course code'));
            tr.appendChild(th)

            let th1 = document.createElement('th');
            th1.appendChild(document.createTextNode('Course name'));
            tr.appendChild(th1)

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
            tr.setAttribute('id', item._id)
            coursesTable.appendChild(tr)

            var td = document.createElement('td')
            td.appendChild(document.createTextNode(item.courseCode))
            tr.appendChild(td)

            var td4 = document.createElement('td')
            td4.appendChild(document.createTextNode(item.courseName))
            tr.appendChild(td4)

            var td1 = document.createElement('td')
            td1.appendChild(document.createTextNode(item.profId))
            tr.appendChild(td1)

            var td2 = document.createElement('td')
            td2.appendChild(document.createTextNode(item.roomNumber))
            tr.appendChild(td2)

            var td3 = document.createElement('td')
            td3.appendChild(document.createTextNode(item.hours))
            tr.appendChild(td3)

            createButton(tr, function(){
                deleteRecord(item._id, 'Course');
            })
            
        })
    })
    })
}

function createButton(context, func){
    var button = document.createElement('button');
    var td = document.createElement('td')
    td.style.textAlign = "center"
    button.id = "btn-delete"
    button.textContent = "Delete";
    button.onclick = func;
    td.appendChild(button)
    context.appendChild(td);

}

function deleteRecord(id, tableName){
    fetch(`http://localhost:3000/deleteRecord?id=${id}&table=${tableName}`).then(response => {
        
        response.json().then((data)=>{
            
            alert(data.message)
            document.getElementById(id).remove();
            
            
        })

    }).catch((error) => {
        console.log(error);
    })
}

showAllCourses();