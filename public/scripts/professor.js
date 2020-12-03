var profTable = document.getElementById('table-prof')
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

    //refresh table
    fetch('http://localhost:3000/professorsData').then((response) => {
    response.json().then((data) => {
        
        let lastItem = data[data.length - 1]

        if(data.length == 1){

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

            var tr = document.createElement('tr');
            profTable.appendChild(tr)

            var td = document.createElement('td')
            td.appendChild(document.createTextNode(lastItem.professorName))
            tr.appendChild(td)

            var td1 = document.createElement('td')
            td1.appendChild(document.createTextNode(lastItem.email))
            tr.appendChild(td1)

            var td2= document.createElement('td')
            td2.appendChild(document.createTextNode(lastItem.contactInfo))
            tr.appendChild(td2)
           
    })
})



})



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
            // console.log(item);
            var tr = document.createElement('tr');
            tr.setAttribute("id", "row");
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
            
        })
    })
})





