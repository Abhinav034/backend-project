const express = require('express')
const app = express()
require('./public/db/mongodb')
const cors = require('cors')                

//importing all the routes

const professorRoute = require('./public/routes/professorRoute')
const programRoute = require('./public/routes/programRoutes')
const courseRoute = require('./public/routes/courseRoutes')
const timeTableRoute = require('./public/routes/timeTableRoutes')


app.use(express.json())                        //to parse all json data 
app.use(cors())                                // to enable cross origin requests
app.use(express.static('./public'))            //path to html files
const PORT = process.env.PORT


app.use(professorRoute)
app.use(programRoute)
app.use(courseRoute)
app.use(timeTableRoute)


app.listen(PORT , ()=>{
    console.log(`Server up and running on port: ${PORT}` )
})