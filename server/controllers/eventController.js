import Candidate from "../modals/candidateModal.js";
import Event from "../modals/eventModal.js";


export const createEvent =async(req,res)=>{
    const{name,candidates,image,start,end}= req.body
    if(candidates.length <2) return res.status(400).json({message:'More than 2 candidate are required to form an event'})

    try {
        const newEvent = await Event.create({
            name,candidates,backgroundImage:image,start,end
        })
        const fullEvent = await Event.findOne({_id:newEvent._id})
        .populate('candidates','-password')
        await fullEvent.save()
        res.json(fullEvent)
        
    } catch (error) {
        res.status(500).json({message:`${error}`})
    }
}

export const getEvents =async(req,res)=>{
    try {
        const event = await Event.find().populate('candidates','-password')
        res.json(event)
    } catch (error) {
        res.status(500).json({message:`${error}`})
    }
}

export const getEventById =async(req,res)=>{
    try {
        const event = await Event.findById({_id:req.params.id}).populate('candidates','-password')
        if(!event) return res.status(400).json({message:'Not found this event'})
        res.json(event)
    } catch (error) {
        res.status(500).json({message:`${error}`})
    }
}

export const voting =async(req,res)=>{
    try {
        const event1 = await Event.find({_id:req.body.id,votedBy:req.user._id})
        if(event1.length > 0) return res.json({message:'you has voted'})
        const event = await Event.findById({_id:req.body.id})
        if(!event)  return res.status(400).json({message:'Not found this event'})
        event.votedBy.push(req.user._id)
         await Promise.all (event.candidates?.map(async(c)=>{
            if(c.toString() ===req.body.candidateId.toString()){
              const candidate = await  Candidate .findById({_id:req.body.candidateId})
              candidate.votedCount += 1;
              await candidate.save()
            }
        }))
        await event.save();
        res.json({voted:true})
    } catch (error) {
        res.status(500).json({message:`${error}`})
    }
}