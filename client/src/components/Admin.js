import React, { useState } from 'react'
import './admin.scss'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Candidate from './Candidate'
import Event from './Event';
import { useNavigate } from 'react-router-dom';
function Admin() {
    const navigate = useNavigate();
    const[addCandidate,setAddCandidate] = useState(true);
    const[addEvent,setAddEvent] = useState(false);
    const handleClickEvent =()=>{
        setAddCandidate(false)
        setAddEvent(true)
    }
    const handleClickCandidate =()=>{
        setAddCandidate(true)
        setAddEvent(false)
    }
    return (
        <div className='admin-container'>
            <nav className='admin-header'>
                <KeyboardBackspaceIcon onClick={()=>navigate('/')} />
                <ul className='header-right'>
                    <li onClick={handleClickCandidate} className={addCandidate && 'active'}><span>Add Candidate</span></li>
                    <li  className={addEvent && 'active'} onClick={handleClickEvent}><span>Add Event</span></li>
                </ul>
            </nav>
            <div className='admin-body'>
           {addCandidate && <Candidate />}
            {addEvent && <Event />}
            </div>

            
        </div>
    )
}

export default Admin
