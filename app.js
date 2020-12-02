const express = require('express')
const app = express()
require('./db/mongodb')
const cors = require('cors')
const { Professor,Program,Course,TimeTable} = require('./db/dbSchema')
app.use(express.json())   //to parse all json data 
app.use(cors())
app.use(express.static('./src'))
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

// professor list
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


//profID

app.get('/profID' , async (req , res)=>{

    

    


    try {
        
       

    } catch (error) {
        res.send(error)
    }

})

app.post('/cource' , async (req , res)=>{
    console.log("inside cource")

    try {
        

        
        const test = new Course(req.body)
    
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