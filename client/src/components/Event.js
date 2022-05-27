import axios from 'axios';
import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import './event.scss'
const admin='0xb05e0C83Bf8f872D8EBA7a2519dc3b5d55DcDEA6'
function Event() {
    const[key,setKey] = useState('')
    const [candidateList,setCandidateList] = useState([])
    const{userInfo} = useSelector(state=>state.userAuth)
    const navigate = useNavigate();
    const[selectedResults,setSelectedResults] = useState([])
    const[image,setImage] = useState('')
    const[start,setStart] = useState('')
    const[end,setEnd] = useState('')
    const [name,setName] = useState('')
    const {account,contract_MM,web3} = useSelector(state=>state.blockchain)
    const handleSearch =async(word)=>{
       setKey(word)
       if(!word){
           setCandidateList([])
           return
       }
       const headers = (token) => ({
        headers: {
          'Content-Type': 'application/json', 
          Authorization: 'Bearer ' + token,
        },
      });
      try {
        const{data} = await axios.get(`/candidate/${word}`,headers(userInfo.token))
        setCandidateList(data)
      } catch (error) {
        const message =
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        console.log(message)
      }
    }
    const handleDelete =(deleUser)=>{
        setSelectedResults(selectedResults.filter(u=>u._id !== deleUser._id))
    }
    const handleChangeFile =async(e)=>{
        const file=e.target.files[0]
        file.preview=URL.createObjectURL(file)
        const formData = new FormData()
        formData.append('avata',file)
        try {
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                } 
            }
            const {data }= await axios.post('/upload',formData,config)
            setImage(data)
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmitEvent =async(e)=>{
        e.preventDefault()
        if(admin.toLowerCase() === account.toLowerCase()){
        const headers = (token) => ({
            headers: {
              'Content-Type': 'application/json', 
              Authorization: 'Bearer ' + token,
            },
          });
          await axios.post('/event/create',{name,candidates:selectedResults,image,start,end},headers(userInfo.token))
         .then((data)=>{
            const newArray =selectedResults.map((s)=>{
                return web3.utils.sha3(s._id)
            })
            const eventIdToBytes =web3.utils.sha3(data.data._id)
            const startToSecond = (new Date(start).getTime())/1000
            const endToSecond = (new Date(end).getTime())/1000
            if(account !=null){
                contract_MM.methods.createEvent(eventIdToBytes,startToSecond,endToSecond,newArray).send({
                    from:account,
                }).then(receipt=>{
                     navigate('/')
                })
            }
         })}else{
            toast.warning("User need to login the right Metamask account"); 
         }
        
    }
    console.log(start);
    const handleFunction =(userToAdd)=>{
        if(selectedResults?.some(user=>user._id === userToAdd._id)) {
           toast.warning("User already added");
           return;
        }
       setSelectedResults([...selectedResults,userToAdd])
      
    }
    return (
        <div className='candidate-container'>
            <form onSubmit ={handleSubmitEvent} className='candidate-form'>
                <h1>ADD EVENT</h1>
                    <div className='row row'>
                        <label>Name :</label>
                        <input name='name'  value={name} onChange={(e)=>setName(e.target.value)} className='input' type='text'    />
                    </div>
                <div className='row'>
                    <div className='collum age'>
                        <label>Starting date :</label>
                        <input type='date'  name='start' value={start} onChange={(e)=>setStart( e.target.value)}  />
                    </div>
                    <div className='collum age'>
                        <label>Expire date :</label>
                        <input type='date' name='end' value={end} onChange={(e)=>setEnd( e.target.value)}  />
                    </div>
                </div>
                <div className='candidate__add'>
                    <input  name='key' value={key} onChange={(e)=>handleSearch(e.target.value)} className='search' type='text' placeholder='Search a candidate' />
                </div>
                <div className='selected_results'>
                  {selectedResults?.map(c=>(
                   <div  className='selected_user'>
                       <span className='selected_user-name'>{c?.name?.length >10 ? c?.name.substring(0,10) +"..." :c.name}</span>
                       <CloseIcon onClick={()=>handleDelete(c)} style={{fontSize:'1rem',cursor:'pointer'}} />
                   </div>
                   ))}
                  </div>
                <div  className='search_results'>
                      {candidateList?.map(u=>(
                      <div  onClick={()=>handleFunction(u)}  className='serach_user'>
                          <img className='user_image' src={u.image} alt='' />
                          <div className='user_info'>
                              <h5 className='user_name'>{u.name}</h5>
                              <p>ID : <span className='user_email'>{u._id}</span></p>
                          </div>
                      </div>
                     ))} 
                  </div>
                <div className='file'>
                     <input type='file' onChange={handleChangeFile} />
                </div>
               
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Event;

/*dispatch(createEventAction({
            name,candidates:selectedResults,backgroundImage:image,start,end
        })) */