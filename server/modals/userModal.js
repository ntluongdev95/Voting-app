import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },
    email:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    date:{
        type:Date,
        default:Date.now
    }
    
})

const User = mongoose.model('User',userSchema)
export default User