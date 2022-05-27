import mongoose from 'mongoose'
const eventSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },
    candidates:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidate'
    }],
    backgroundImage:{
        type:String,
        require:true
    },
    start:{
        type:Date
    },

    end:{
        type:Date
    },
    votedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidate'
    },
    date:{
        type:Date,
        default:Date.now
    }

})
const Event = mongoose.model('Event',eventSchema)
export default Event