const mongoose = require('mongoose')

const professorSchema = new mongoose.Schema({
    professorName:{
        type:String,
        required:true
    },
    contactInfo:{
        type:String,
        required:true,
        unique:true
    },
    subject:{
        type:String,
        required:true
    }   
})

const programSchema = new mongoose.Schema({

    programName:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
    }
})

const coursesSchema = new mongoose.Schema({

    courceID:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    roomNumber:{
        type:Number,
        required:true
    },
    hours:{
        type:Number,
        required:true
    },
    profId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'professor'
    }
})

const timeTableSchema = new mongoose.Schema({

    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'course'
    },

    day:{
        type:Date,
        required:true
    },

    time:{
        type:Number,
        required:true
    }
})



const Professor = mongoose.model('professor' , professorSchema)
const Program = mongoose.model('program' , programSchema)
const Course = mongoose.model('course' , coursesSchema)
const TimeTable = mongoose.model('timetable' ,timeTableSchema )

module.exports = {
    Professor,
    Program,
    Course,
    TimeTable
}