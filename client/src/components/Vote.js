
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { getEventByIdAction, getVotingAction } from '../redux/actions/eventAction';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Winner from './Winner';
import {  toast } from 'react-toastify';
import './vote.scss'
const contractAddress ='0x2057Ee7b3cd3844cA6b3040482fC3Aa354184005'
const Vote = () => {
    const dispatch = useDispatch()
    const{userInfo} = useSelector(state=>state.userAuth)
    const{eventItem} = useSelector(state=>state.eventItem)
    const[displayed,setDisplayed] = useState(false)
    const[reload,setReload] = useState(false)
    const {account,contract_MM,web3,contract_Token} = useSelector(state=>state.blockchain)
    const navigate = useNavigate()
     const dateStart =(new Date(eventItem?.start).getTime());
     const dateEnd =(new Date(eventItem?.end).getTime())
    
    useEffect(()=>{
       const now = new Date().getTime()
       if(now > dateEnd){
           setDisplayed(true)
       }
    },[dateEnd])
    const {id} = useParams()
    useEffect(()=>{
       dispatch(getEventByIdAction(id))
    },[dispatch,id,reload])

    const handleVoteClick =async (inputId)=>{
        const findUserVoted = eventItem?.votedBy.find(i=>i.toString()===userInfo._id.toString())
        if(findUserVoted) return toast.warn('You already voted')
        const eventToBytes32 = web3.utils.sha3(eventItem._id)
        const userToBytes32 = web3.utils.sha3(userInfo._id)
        const candidateToBytes32 =web3.utils.sha3(inputId)
        const now = new Date().getTime();
          if(now < dateStart) return toast.warn('The event not started yet')
          if(now > dateEnd)  return toast.warn('The event already finished')
          if(dateStart < now <dateEnd && !findUserVoted){
            const fee = await contract_MM.methods.getFee().call()
            await contract_Token.methods.approve(contractAddress,fee).send({
                from:account})
             await contract_Token.methods.allowance(account,contractAddress).send({from:account})
             contract_MM?.methods.vote(userToBytes32,eventToBytes32,candidateToBytes32).send({
                 from:account,
             }).then(async(receipt)=>{
                dispatch(getVotingAction({
                    id:id,
                    candidateId:inputId
                })).then((data)=>{
                    setReload(true)
                })
             })
          }
    }
    
    return (
        <div style={{backgroundImage:`url(${eventItem?.backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
         }}
         className='vote__container'>
            <div className='vote__layer'>
                <div className='vote__header'>
                   <IconButton onClick={()=>navigate('/')} style={{color:'white'}} ><KeyboardBackspaceIcon /></IconButton> 
                   <div className='vote__title'>{eventItem?.name}</div>
                      <a rel="noreferrer"  className='linkBuy' target="_blank" href ='https://rinkeby.etherscan.io/address/0x705df1d757d92fc8d7d5b6f719fa1988a0b9dc5a' >Click here to buy <span className='anl' >ANL</span> token</a>
                </div>
                <div className ='vote__cadidate'>
                    {eventItem?.candidates.map(c=>(
                    <div key={c._id} className='candidate__container'>
                        <img src={c.image} alt='' />
                        <div className='votes'>
                            Votes :{c.votedCount}
                        </div>
                        <div className='candidate__name'>{c.name}</div>
                        <div onClick={()=>handleVoteClick(c._id)} className='vote__button'>Vote</div>
                    </div>
                    ))}
                </div>
            </div>
            {displayed && <Winner eventId ={id} />}
          <ToastContainer />
        </div>
    );
};

export default Vote;