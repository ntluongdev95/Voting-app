import React from 'react'
import './toast.scss'
import DoneIcon from '@mui/icons-material/Done';
function Toast() {
    return (
        <div className='toast-container'>
             <DoneIcon style={{color:"green",fontSize:'1rem'}} />
            <p className='toats-message'> Login successfully</p>
            
        </div>
    )
}

export default Toast
