document.getElementById('addProf').addEventListener('click' , ()=>{

    window.location.href = "http://localhost:3000/addProfessor.html"

});

document.getElementById('addProgram').addEventListener('click' , ()=>{

    window.location.href = "http://localhost:3000/addProgram.html"

});

// document.getElementById('fetchButton').addEventListener('click' , ()=>{
    
//     fetch('http://localhost:3000/professors').then((response)=>{
//         response.json().then((data)=>{
//             data.forEach((item)=>{
//                 console.log(item)
//             })
//         })
//     }).catch((error)=>{
//         console.log(error)
//     })

    //getRequest()
// })

// async function getRequest(){
//     const response = await fetch('http://localhost:3000/professors')
//     const data = await response.json()

//     data.forEach((item)=>{
//         console.log(item)
//     })
// }