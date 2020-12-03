var profTable = document.getElementById('table-prog')
var xmlhttp = new XMLHttpRequest();  

document.getElementById('addProgram').addEventListener('click' , ()=>{


    var programName = document.getElementById('programName').value
    var code = document.getElementById('programCode').value
    
    var theUrl = "http://localhost:3000/program";
    xmlhttp.open("POST", theUrl , false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        programName,
        code
    }));
    

    var res = xmlhttp.responseText
    console.log(res.name)

    //refresh table
    fetch('http://localhost:3000/programData').then((response) => {
        response.json().then((data) => {
            
            let lastItem = data[data.length - 1]

            if(data.length == 1){

                let tr = document.createElement('tr');
                profTable.appendChild(tr)
                
                let th = document.createElement('th');
                th.appendChild(document.createTextNode('Name'))
                tr.appendChild(th)

                let th2 = document.createElement('th');
                th2.appendChild(document.createTextNode('Email'))
                tr.appendChild(th2)
            }

                var tr = document.createElement('tr');
                profTable.appendChild(tr)

                var td = document.createElement('td')
                td.appendChild(document.createTextNode(lastItem.programName))
                tr.appendChild(td)

                var td1 = document.createElement('td')
                td1.appendChild(document.createTextNode(lastItem.code))
                tr.appendChild(td1)
            
        })
    })

})

fetch('http://localhost:3000/programData').then((response) => {
    response.json().then((data) => {
        
        console.log(data.length);
        console.log(data);

        if(data.length > 0){

            let tr = document.createElement('tr');
            profTable.appendChild(tr)
            
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
            profTable.appendChild(tr)

            var td = document.createElement('td')
            td.appendChild(document.createTextNode(item.programName))
            tr.appendChild(td)

            var td1 = document.createElement('td')
            td1.appendChild(document.createTextNode(item.code))
            tr.appendChild(td1)
            
        })
    })
})

