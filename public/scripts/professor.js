var profTable = document.getElementById('table-prof')
var xmlhttp = new XMLHttpRequest();  

var professorName, email, contactInfo;

showProfessorsTable();

function isValid(){
    professorName = document.getElementById('pname').value
    email = document.getElementById('pemail').value
    contactInfo = document.getElementById('pcontact').value

    if(professorName == "" || email == "" || contactInfo == ""){
        return false;
    }
    return true;
}

document.getElementById('addProf').addEventListener('click' , ()=>{

    if(!isValid()){
        alert("Please fill all fields!!");
        return;
    } 
     
    var theUrl = "http://localhost:3000/professors";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        professorName,
        email,
        contactInfo
    }));

    var result = JSON.parse(xmlhttp.responseText)
    if(result.status == "failure"){
        alert(result.message);
    } else if(result.status == "success"){
        alert(result.message);

        document.getElementById('form').reset();
        
        //adding new professor
        var tr = document.createElement('tr');
        tr.setAttribute('id', result.profObj._id)
        profTable.appendChild(tr)

        var td = document.createElement('td')
        td.appendChild(document.createTextNode(professorName))
        tr.appendChild(td)

        var td1 = document.createElement('td')
        td1.appendChild(document.createTextNode(email))
        tr.appendChild(td1)

        var td2= document.createElement('td')
        td2.appendChild(document.createTextNode(contactInfo))
        tr.appendChild(td2)

        createButton(tr, function(){
            deleteRecord(result.profObj._id, 'Professor');
        })
    }

})

 //fetch all data 
function showProfessorsTable(){
    fetch('http://localhost:3000/professorsData').then((response) => {
        response.json().then((data) => {
            
            // console.log(data.length);
    
            if(data.length > 0){
    
                let tr = document.createElement('tr');
                profTable.appendChild(tr)
                
                let th = document.createElement('th');
                let pName = document.createTextNode('Name');
                th.appendChild(pName)
                tr.appendChild(th)
                let th2 = document.createElement('th');
                let pEmail = document.createTextNode('Email');
                th2.appendChild(pEmail)
                tr.appendChild(th2)
                let th3 = document.createElement('th');
                let pPhone = document.createTextNode('Phone');
                th3.appendChild(pPhone)
                tr.appendChild(th3)
            }
    
            data.forEach((item) => {
                var tr = document.createElement('tr');
                tr.setAttribute('id', item._id)
                profTable.appendChild(tr)
    
                var td = document.createElement('td')
                let name = document.createTextNode(item.professorName)
                td.appendChild(name)
                tr.appendChild(td)
    
                var td1 = document.createElement('td')
                let email = document.createTextNode(item.email)
                td1.appendChild(email)
                tr.appendChild(td1)
    
                var td2= document.createElement('td')
                let contact = document.createTextNode(item.contactInfo)
                td2.appendChild(contact)
                tr.appendChild(td2)
    
                createButton(tr, function(){
                    deleteRecord(item._id, 'Professor');
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