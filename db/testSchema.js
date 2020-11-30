const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    professor_name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    }
    
})

const Test = mongoose.model('professor' , testSchema)

module.exports = {
    Test
}