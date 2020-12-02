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
    
         res.send('worked')

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
app.get('/professorsList' , async (req , res)=>{

    

    try {
        
        const test = await Professor.find({})

        let nameList = test.map((item)=>{
            return item.professorName
        })
         res.send(nameList)

    } catch (error) {
        res.send(error)
    }

})

// professor all data list
app.get('/professorsData' , async (req , res)=>{

    try {
        
        const test = await Professor.find({})

         res.send(test)

    } catch (error) {
        res.send(error)
    }

})


// program list
app.get('/programList' , async (req , res)=>{

    try {
        
        const test = await Program.find({})

        let progList = test.map((item)=>{
            return item.programName
        })
         res.send(progList)

    } catch (error) {
        res.send(error)
    }
    
})

// cource list
app.get('/courceList' , async (req , res)=>{

    try {
        
        const test = await Course.find({})

        let cList = test.map((item)=>{
            return item.courseName
        })
         res.send(cList)

    } catch (error) {
        res.send(error)
    }
    
})

app.post('/cource' , async (req , res)=>{
    console.log("inside cource")

    try {
        
            
            var courceObj = req.body
            console.log(courceObj)
            
            const prof = await Professor.findOne({professorName: courceObj.profId})
            
            courceObj.profId = prof._id
            
             
            const test = new Course(courceObj)
    
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
          

            
            const c = await Course.findOne({courseName: ttObj.courseId})
            const p = await Program.findOne({programName: ttObj.programId})

            ttObj.courseId = c._id
            
            ttObj.programId = p._id
            
            console.log(ttObj)
             
            const test = new TimeTable(ttObj)

           
    
            await test.save()
    
         res.send('worked')


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
    
    var tt = await TimeTable.find({})

        for (var i = 0 ; i<tt.length ; i++){
            console.log("inside for loop")
                await tt[i].populate('programId').execPopulate()
                await tt[i].populate('courseId').execPopulate()

        }

        
        Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        Time = ['10 am - 11 am','11 am - 12 pm','12 pm - 1 pm','2 pm - 3 pm','3 pm - 4 pm','4 pm - 5 pm']


        var tableRowCol= ""

        
        console.log(Time.length)
       

        for(var i = 0 ; i < Time.length ; i++){
            console.log("inside 1st for loop")

            var cols = ""
            for(var j = 0 ; j < Days.length ; j++){
                console.log("inside 2nd st for loop")

                // find element with the same detail

                // if found than add details

                var o = tt[0];

                data = `${o.courseId.courseName}:${o.courseId.courseCode }
                ${o.time}\n
                ${o.courseId.roomNumber}
                By: Prof Peter
                `

            cols+= `<td> ${data}</td>`


            }
            tableRowCol+= `<tr>${cols}</tr>`

        }

        var cont = `
        <style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

<table>
<tr>
<th>${Days[0]}</th>
<th>${Days[1]}</th>
<th>${Days[2]}</th>
<th>${Days[3]}</th>
<th>${Days[4]}</th>
</tr>

${tableRowCol}
</table>

        `


        res.send(cont)
        console.log(tt)
        


        
})


app.listen(PORT , ()=>{
    console.log('Server up and running on port 3000')
})