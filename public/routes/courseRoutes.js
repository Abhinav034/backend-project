const express = require('express')
const {Course} = require('../db/dbSchema')
const router = new express.Router()


router.post('/course' , async (req , res)=>{
    console.log("inside course")

    try {
        const test = new Course(req.body )
        await test.save()

        res.send( JSON.stringify({
            message: 'Sucessfully inserted!!', 
            courseObj: test, 
            status: 'success'})
        )

    } catch (error) {
        res.send( JSON.stringify({
            message: 'Incorrect data. Try again!!',
            status: 'failure'})
        )
    }

})

module.exports = router