const express = require('express')
const {Program} = require('../db/dbSchema')
const router = new express.Router()


router.post('/program' , async (req , res)=>{

    try {
        
        const test = new Program(req.body)
        await test.save()
    
        res.send( JSON.stringify({
            message: 'Sucessfully inserted!!', 
            progObj: test, 
            status: 'success'})
        )

    } catch (error) {
        res.send( JSON.stringify({
            message: 'Incorrect data. Try again!!',
            status: 'failure'})
        )
    }

})


router.get('/programData' , async (req , res)=>{

    try {
        
        const test = await Program.find({})
        res.send(test)

    } catch (error) {
        res.send(error)
    }

})

module.exports = router