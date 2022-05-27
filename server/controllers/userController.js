import User from '../modals/userModal.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//import Candidate from '../modals/candidateModal.js'
export const signup =async(req,res)=>{
    try {
        const{name,email,password,isAdmin} = req.body
        if(!name ||!email || !password){
           return res.status(400).json({message:'Please fill in all files'})
        }
        if(!validateEmail(email))
        return res.status(400).json({message: "Invalid emails."})

        
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"This email already exists."})
       
        if(!validatePassword(password)){
            return res.status(400).json({message: "Password must contain minimum six characters, at least one uppercase letter, one lowercase letter and one number"})
            }
              
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create({
            name,email,password:hashedPassword,isAdmin
        })
        await newUser.save()
        res.json({
            result:'success',
            _id:newUser._id,
            name:newUser.name,
            voted:newUser.voted,
            isAdmin:newUser.isAdmin,
            token:token(newUser._id)
        })
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}

export const login = async(req,res)=>{
    const{email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message:"User not found"})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:"Password is incorrect"})
        res.status(200).json({
            result:'success',
            _id:user._id,
            name:user.name,
            voted:user.voted,
            isAdmin:user.isAdmin,
            token:token(user._id)
        })
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}

/*export const voting = async(req,res)=>{
    const candidateId = req.body.candidateId
    try {
        if(req.user.voted) return res.status(400).json({message:"you has voted alredy"})
        const candidate = await Candidate.find({candidateId})
        if(!candidate) return res.status(400).json({message:"No result found"})
        const newCandidate = await Candidate.findOneAndUpdate({candidateId},{votedCount:2},{new:true})
        console.log(newCandidate)
    }catch(error){
        res.status(500).json({message:'Somthing went wrong'})
    }
  
    
}
*/






const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword =(password)=>{
    const re = /^(?=.*\d)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
    return re.test(password);
   
}


const token =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
