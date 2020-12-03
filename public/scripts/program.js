var progTable = document.getElementById('table-prog')
var xmlhttp = new XMLHttpRequest();  
var programName, code;

function isValid(){
    programName = document.getElementById('programName').value
    code = document.getElementById('programCode').value

    if(programName == "" || code == ""){
        return false;
    }
    return true;
}

document.getElementById('addProgram').addEventListener('click' , ()=>{
    
    if(!isValid()){
        alert("Please fill all fields!!");
        return;
    }

    var theUrl = "http://localhost:3000/program";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        programName,
        code
    }));

    var result = JSON.parse(xmlhttp.responseText)
    if(result.status == "failure"){
        alert(result.message);
    } else if(result.status == "success"){
        alert(result.message);

        document.getElementById('form').reset();

        var tr = document.createElement('tr');
        tr.setAttribute('id', result.progObj._id)
        progTable.appendChild(tr)

        var td = document.createElement('td')
        td.appendChild(document.createTextNode(programName))
        tr.appendChild(td)

        var td1 = document.createElement('td')
        td1.appendChild(document.createTextNode(code))
        tr.appendChild(td1)

        createButton(tr, function(){
            deleteRecord(result.progObj._id, 'Program');
        })
    }

})

function showProgramsTable(){
    fetch('http://localhost:3000/programData').then((response) => {
    response.json().then((data) => {
        
        console.log(data.length);
        console.log(data);

        if(data.length > 0){

            let tr = document.createElement('tr');
            progTable.appendChild(tr)
            
            let th = document.createElement('th');
            th.appendChild(document.createTextNode('Name'));
            tr.appendChild(th)

            let th2 = document.createElement('th');
            th2.appendChild(document.createTextNode('Code'))
            tr.appendChild(th2)
        }

        data.forEach((item) => {
            console.log(item);
            var tr = document.createElement('tr');
            tr.setAttribute('id', item._id)
            progTable.appendChild(tr)

            var td = document.createElement('td')
            td.appendChild(document.createTextNode(item.programName))
            tr.appendChild(td)

            var td1 = document.createElement('td')
            td1.appendChild(document.createTextNode(item.code))
            tr.appendChild(td1)
            
            createButton(tr, function(){
                deleteRecord(item._id, 'Program');
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

showProgramsTable();