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

app.listen(PORT , ()=>{
    console.log('Server up and running on port 3000')
})