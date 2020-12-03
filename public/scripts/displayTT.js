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




var t = document.getElementById('tt');
var prog = document.getElementById('programs')

document.getElementById('show').addEventListener('click' , ()=>{

    fetch(`http://localhost:3000/table?pn=${prog.value}`).then((response)=>{
            

            console.log(response)
            response.json().then((data)=>{
                
                console.log(data)
                t.innerHTML = data.content;
            })
        }).catch((error)=>{
            console.log(error)
})
   
})

function removeEntry(id){


    fetch(`http://localhost:3000/remove?id=${id}`).then((response)=>{
            

            console.log(response)
            response.json().then((data)=>{
                
                console.log(data)


        fetch(`http://localhost:3000/table?pn=${prog.value}`).then((response)=>{
            

            console.log(response)
            response.json().then((data)=>{
                
                console.log(data)
                t.innerHTML = data.content;
            })
        }).catch((error)=>{
            console.log(error)
})
                
            })
        }).catch((error)=>{
            console.log(error)
})

}