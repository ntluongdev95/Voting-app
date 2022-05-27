import Candidate from "../modals/candidateModal.js";

export const createCandidate = async(req,res)=>{
    try {
        
        const{name,dob,description,gender,image} = req.body
        const candidate = await Candidate.create({
            name,dob,gender,description,image
        })
        await candidate.save()
        res.status(201).json(candidate)
        
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}

export const getAllCandidate = async(req,res)=>{
    try {
        const candidates = await Candidate.find()
        res.status(200).json(candidates)
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}

export const findCandidate = async(req,res)=>{
    const keyword =req.params.keyword
     try {
         const users = await Candidate.find( { "name":{"$regex":new RegExp(keyword, "i")}}).select('-password')
         res.json(users)
     } catch (error) {
        res.status(500).json({message:error.message}) 
     }
}
