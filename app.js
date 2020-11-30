const express = require('express')
const app = express()
require('./db/mongodb')
const {Test} = require('./db/testSchema')
app.use(express.json())   //to parse all json data 

const PORT = process.env.PORT

app.get('/' , async (req , res)=>{

    const test = new Test({
        professor_name: 'Peter',
        subject:'backend'
    })

    //await test.save()

    const getFromDatabase = await Test.find({professor_name:'Peter'})

    res.send(getFromDatabase)

})

app.listen(PORT , ()=>{
    console.log('Server up and running on port 3000')
})