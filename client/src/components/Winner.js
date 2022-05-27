import React, { useEffect, useState } from 'react';
import './winner.scss'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Winner = ({eventId}) => {
    const{eventItem} = useSelector(state=>state.eventItem)
    const navigate = useNavigate()
    const [winner,setWinner] = useState({})
    const {contract_MM,web3} = useSelector(state=>state.blockchain)
    useEffect(async()=>{
        const eventIdToBytes =  web3?.utils.sha3(eventId)
        const winner = await contract_MM?.methods.getResult(eventIdToBytes).call()
       const accountN = await Promise.all (winner.map(w=>{
              return  ( Number(w.voteCount)) ;
        }))
        const maxN = Math.max(...accountN)
        const Id =  winner.find(wi=>Number(wi.voteCount)=== maxN)
       const finalUser =  eventItem?.candidates.find(c=>
           web3.utils.sha3(c._id) ===Id.candidateId
        )
        setWinner(finalUser);
    },[eventId,web3,contract_MM,eventItem])
    return (
        <div className='winner__wrapper'>
            <div className='winner__center'>
                <h1 className='winner_h1'>Winner</h1>
                <div onClick={()=>navigate('/')} className='close'>
                    <IconButton><CloseIcon style={{color:'red'}} /></IconButton>
                </div>
                <div className='image__center'>
                    <img className='image__winner' src={winner?.image} alt='' />
                </div>
            </div>
            
        </div>
    );
};

export default Winner;