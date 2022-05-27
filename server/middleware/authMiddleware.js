import jwt from 'jsonwebtoken'
import User from '../modals/userModal.js'


const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        res.status(401).json({message:'Not authorized, token failed'})
    }
}

const admin = async(req,res,next)=>{
    try {
        if(req.user && req.user.isAdmin){
            next()
        }
    } catch (error) {
        res.status(401).json({message:'Not authorized as an Admin'})
    }
    
}
export {auth,admin}