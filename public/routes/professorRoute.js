const express = require('express')
const {Professor , Program , Course , TimeTable} = require('../db/dbSchema')
const router = new express.Router()


router.post('/professors' , async (req , res)=>{

    try {
        
        const test = new Professor(req.body)
        await test.save()
        
        res.send( JSON.stringify({
            message: 'Sucessfully inserted!!', 
            profObj: test, 
            status: 'success'})
        )

    } catch (error) {
        res.send( JSON.stringify({
            message: 'Incorrect data. Try again!!',
            status: 'failure'})
        )
    }

})

router.get('/professorsData' , async (req , res)=>{
    try {
        const test = await Professor.find({})

         res.send(test)

    } catch (error) {

        res.send(error)
    }
})

router.get('/deleteRecord' ,  async(req, res) => {
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
                deleteSchedules(req.query.id) 
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

async function deleteSchedules(courseId){

    const schedules = await TimeTable.find({courseId})
    
    for (var i = 0 ; i<schedules.length ; i++){
      const removed = await TimeTable.findByIdAndRemove(schedules[i]._id)
      console.log(removed)
    }

}



module.exports = router