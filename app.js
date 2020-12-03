const express = require('express')
const app = express()
require('./public/db/mongodb')
const cors = require('cors')
const { Professor,Program,Course,TimeTable} = require('./public/db/dbSchema')
app.use(express.json())   //to parse all json data 
app.use(cors())
app.use(express.static('./public'))
const PORT = process.env.PORT

app.post('/professors' , async (req , res)=>{

    try {
        
        const test = new Professor(req.body)
        
        await test.save()
        
         res.send( JSON.stringify({
             message: 'Sucessfully inserted!!', 
             profObj: test, 
             status: 'success'})
         )

    } catch (error) {
        res.send(error)
    }

})

app.post('/program' , async (req , res)=>{

    try {
        
        const test = new Program(req.body)
    
        await test.save()
    
         res.send('worked')

    } catch (error) {
        res.send(error)
    }

})

// professor names list
// app.get('/professorsList' , async (req , res)=>{

    

//     try {
        
//         const test = await Professor.find({})

//         let nameList = test.map((item)=>{
//             return item.professorName
//         })
//          res.send(nameList)

//     } catch (error) {
//         res.send(error)
//     }

// })

//delete records
app.get('/deleteRecord', async(req, res) => {
    console.log("inside deletion");
    try{
        switch(req.query.table){
            case "Professor":
                await Professor.findByIdAndRemove(req.query.id)
                break;
            case "Program":
                await Program.findByIdAndRemove(req.query.id)
                break;
            case "Course":
                await Course.findByIdAndRemove(req.query.id)
                break;
            case "TimeTable":
                await TimeTable.findByIdAndRemove(req.query.id)
                break;
        
        }

        res.send({message: 'successfully deleted!!'})
    } catch(error){
        res.send(error)
    }
})

// professor all data
app.get('/professorsData' , async (req , res)=>{

    try {
        
        const test = await Professor.find({})

         res.send(test)

    } catch (error) {
        res.send(error)
    }

})


// // program list
// app.get('/programList' , async (req , res)=>{

//     try {
        
//         const test = await Program.find({})

//         let progList = test.map((item)=>{
//             return item.programName
//         })
//          res.send(progList)

//     } catch (error) {
//         res.send(error)
//     }
    
// })

// program all data list
app.get('/programData' , async (req , res)=>{

    try {
        
        const test = await Program.find({})
        res.send(test)

    } catch (error) {
        res.send(error)
    }

})

// cource list
// app.get('/courseList' , async (req , res)=>{

//     try {
        
//         const test = await Course.find({})

//         let cList = test.map((item)=>{
//             return item.courseName
//         })
//          res.send(cList)

//     } catch (error) {
//         res.send(error)
//     }
    
// })

// course all data list
app.get('/courseData' , async (req , res)=>{

    try {
        
        const test = await Course.find({})
        res.send(test)

    } catch (error) {
        res.send(error)
    }

})

app.post('/course' , async (req , res)=>{
    console.log("inside course")

    try {
        
            
            var courseObj = req.body 
            const test = new Course(courseObj)
    
            await test.save()
    
         res.send('worked')

    } catch (error) {
        res.send(error)
    }

})

app.post('/timetable' , async (req , res)=>{
    console.log("inside timetable")

    try {
        
            
            var ttObj = req.body
            console.log(ttObj)
            console.log(1)
            const p = await Program.findOne({programName: ttObj.programId})
            console.log(p)
            console.log(2)
            var v = await TimeTable.findOne({programId: p._id, day: ttObj.day, time: ttObj.time})
            console.log(3)
            console.log(v)
            console.log(4)
            if (v === null){

            const c = await Course.findOne({courseName: ttObj.courseId})
            
            ttObj.courseId = c._id
            ttObj.programId = p._id
            console.log(ttObj)
            const test = new TimeTable(ttObj)
            await test.save()
            res.send('worked')

            }else{

                res.send('this time slot already booked for your program - operation not allowed')

            }
          

            


    } catch (error) {
        res.send(error)
    }

})



/// not using below method

app.get('/professors' , async(req,res)=>{

     try {
        const getFromDatabase = await Professor.find({})

        res.send(getFromDatabase)
     } catch (error) {
         res.send(error)
     }
})

app.get('/table' , async (req,res)=>{

        var prog_name = req.query.pn
        console.log(prog_name)
        var pobj = await Program.findOne({programName:prog_name});

    
        Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        Time = ['10 am - 11 am','11 am - 12 pm','12 pm - 1 pm','2 pm - 3 pm','3 pm - 4 pm','4 pm - 5 pm']


        var tableRowCol= ""
        for(var i = 0 ; i < Time.length ; i++){
            var cols = ""
            var data = null
            for(var j = 0 ; j < Days.length ; j++){

                var o = await TimeTable.findOne({day: Days[j], time: Time[i],programId: pobj._id })

                
                if (o == null ){

                    data = 'N A'

                }else{
                    await o.populate('programId').execPopulate()
                    await o.populate('courseId').execPopulate()

                    data = `${o.courseId.courseName}:${o.courseId.courseCode }
                    ${o.time}\n
                    ${o.courseId.roomNumber}
                    By: Prof ${o.courseId.profId} <button id='${o._id}' onclick="removeEntry('${o._id}')">Delete</button>
                    `
                }
     
            cols+= `<td> ${data}</td>`
            }
            tableRowCol+= `<tr>${cols}</tr>`

        }

        var content = `<tr>
                    <th>${Days[0]}</th>
                    <th>${Days[1]}</th>
                    <th>${Days[2]}</th>
                    <th>${Days[3]}</th>
                    <th>${Days[4]}</th>
                    </tr>
                    ${tableRowCol}`
                    
    
        res.send(JSON.stringify({content}))
  
})


app.listen(PORT , ()=>{
    console.log('Server up and running on port 3000')
})