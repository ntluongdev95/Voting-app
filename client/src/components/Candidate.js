import React, { useEffect, useRef, useState } from 'react'
import './candidate.scss'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { IconButton } from '@mui/material';

import { createCandidateAction } from '../redux/actions/cadidateAction';
import { useDispatch } from 'react-redux';
import axios from 'axios';
function Candidate() {
    const dispatch = useDispatch()
    const[name,setName] = useState('')
    const[country,setCountry] = useState('')
    const[date,setDate] = useState()
    const[gender,setGender] = useState('Male')
    const[description,setDescription] = useState('')
    const[image,setImage]= useState('')
    const[avata,setAvata]=useState({
        preview:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIOEBAPDxMSEA0PEQ0PDw8QDg8VEA8QFREWFhURFRMYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NGg8NEisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EACcQAQACAQIFBAIDAAAAAAAAAAABESHR8AISQaHxMVFhscHhcYGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAAAAAAAAAAAAAAAAAAAAAAABFABAUAAAAAAAAAAgIAAAAAAAAAAAAAAAAABAUQABngmetRnsDSoAqAAJxXcVUx1UFEAUAAAAAAgIAAAAAAAAAAAAACywELLAZ4eK5mIm5ic10Uj79aA7BZe5A+uqpeq2CWpBYCRLVpMAEfK2AgoDPNmrzXo0lf77gKAAAAQEAAAAAAAAAAAIIC2lpMpM6gtpM90mdUmdwDV7lL1Zme3uzwRUZmZz6/AOnNrgvXLF9sYW9Absti9CJ0wDpe5LYvfUsHSy2LWwatWLWwaEsBRnii6zVevy0CgAAAEBAAAAAAAAACKgIktMgk7pmd/w14wlf10BlPGGq3KadAZ8HjKpMa5BN4X8nuvkE3k84Wtyv4BPK+ci1pkEVYjQiNAFKWAIUUEWEUBUUAAAgIAAAAAAAAAKAESmgGJhJjV0QGJjXKTGrolA5pX26crPJIMjXJO5OWQZiNFiNGuWTl3YJH6wsR391paBKWlUGaKaARQBKFQFAAAAICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAf//Z'
    })
    const handleCandidateSubmit=(e)=>{
        e.preventDefault()
         dispatch(createCandidateAction({
        name,dob:date,gender,description,image}))
        setName('')
        setCountry('')
        setDate('')
        setDescription('')
        setImage('')
    }


    const inputFile = useRef()
    const handleUploadImage =()=>{
        inputFile.current.click()
    
    }
    const handleChangeAvata =async(e)=>{
        const file=e.target.files[0]
        file.preview=URL.createObjectURL(file)
        setAvata(file)
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
    useEffect(()=>{
        return ()=>{
            avata && URL.revokeObjectURL(avata.preview)
        }
     },[avata])
 
    

    return (
       
        <div className='candidate-container'>
            <form onSubmit={handleCandidateSubmit} className='candidate-form'>
                <h1>ADD CANDIDATE</h1>
                <div className='row'>
                    <div className='collum name'>
                        <label>Name :</label>
                        <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className='collum country'>
                        <label>Country :</label>
                        <input type='text' name='country' value={country} onChange={(e)=>setCountry(e.target.value)} />
                    </div>
                </div>
                <div className='row'>
                    <div className='collum age'>
                        <label>D.O.B :</label>
                        <input type='date'  name='date' value={date} onChange={(e)=>setDate( e.target.value)} />
                    </div>
                    <div className='collum-gender'>
                        <label>Gender :</label>
                        <div className='radio'>
                            <label>
                            <input type='radio' value='Male' checked={gender ==='Male'} onChange={(e)=>setGender(e.target.value)} />
                            Male </label>
                        </div>
                        <div className='radio'>
                            <label>
                            <input type='radio' value='Female' checked={gender ==='Female'} onChange={(e)=>setGender(e.target.value)} />
                            Female
                            </label>

                        </div>
                    </div>
                </div>
                <div className='image'>
                    <img src={avata.preview} alt='' />
                    <input ref={inputFile} type='file' onChange={handleChangeAvata} />
                    <div className='img-wrapper'>
                       <IconButton onClick={handleUploadImage} ><AddToPhotosIcon style={{fontSize:'2rem'}} /></IconButton>
                    </div>
                </div>
                <p>Description: </p>
                <textarea rows='5' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

                

export default Candidate
