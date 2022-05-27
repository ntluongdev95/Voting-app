import mongoose from 'mongoose'

const candidateSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
        default:"male"
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
    },
    votedCount:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Candidate = mongoose.model('Candidate',candidateSchema)
export default Candidate