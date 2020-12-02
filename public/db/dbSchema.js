const mongoose = require('mongoose')

const professorSchema = new mongoose.Schema({
    professorName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactInfo:{
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

    programId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'program'
    },

    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'course'
    },

    day:{
        type: String,
        required:true
    },

    time:{
        type: String,
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