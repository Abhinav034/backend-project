const express = require('express')
const app = express()
require('./public/db/mongodb')
const cors = require('cors')
const { Professor,Program,Course,TimeTable} = require('./public/db/dbSchema')

const professorRoute = require('./public/routes/professorRoute')
const programRoute = require('./public/routes/programRoutes')
const courseRoute = require('./public/routes/courseRoutes')



app.use(express.json())   //to parse all json data 
app.use(cors())
app.use(express.static('./public'))
const PORT = process.env.PORT


app.use(professorRoute)
app.use(programRoute)
app.use(courseRoute)




//delete records


// professor all data


// program all data list


// course all data list
app.get('/courseData' , async (req , res)=>{

    try {
        
        const test = await Course.find({})
        res.send(test)

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
            res.send(JSON.stringify({
                status:'success',
                message:'Schedule Inserted Successfully'
            }))

            }else{
                res.send(JSON.stringify({
                    status:'failure',
                    message:'This time slot already booked for your program - operation not allowed'
                }))
            }
    } catch (error) {
        res.send(error)
    }

})



// /// not using below method

// app.get('/professors' , async(req,res)=>{

//      try {
//         const getFromDatabase = await Professor.find({})

//         res.send(getFromDatabase)
//      } catch (error) {
//          res.send(error)
//      }
// })

app.get('/table' , async (req,res)=>{

        var prog_name = req.query.pn
        console.log(prog_name)
        var pobj = await Program.findOne({programName:prog_name});

        console.log(pobj);
    
        Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        Time = ['8 am - 9 am', '9 am - 10 am', '10 am - 11 am','11 am - 12 pm','12 pm - 1 pm','2 pm - 3 pm','3 pm - 4 pm','4 pm - 5 pm', '5 pm - 6 pm']


        var tableRowCol= ""
        for(var i = 0 ; i < Time.length ; i++){
            var cols = ""
            var data = null
            for(var j = 0 ; j < Days.length ; j++){

                var o = await TimeTable.findOne({day: Days[j], time: Time[i],programId: pobj._id })
                
                if (o === null ){

                    data = '---'

                }else{
                    await o.populate('programId').execPopulate()
                    await o.populate('courseId').execPopulate()

                    data = `${o.courseId.courseName}: ${o.courseId.courseCode }<br>
                    ${o.time}<br>
                    ${o.courseId.roomNumber}<br>
                    By: Prof ${o.courseId.profId}\n <button id='${o._id}' class="btndelete" onclick="removeEntry('${o._id}')">Delete</button>
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
                    <th>${Days[5]}</th>
                    <th>${Days[6]}</th>
                    </tr>
                    ${tableRowCol}`
                    
    
        res.send(JSON.stringify({content}))
  
})


app.listen(PORT , ()=>{
    console.log('Server up and running on port 3000')
})