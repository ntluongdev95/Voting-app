import React, { useEffect, useState } from 'react'
import './login.scss'
import{Link, useNavigate} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import{validate} from '../utils/validateForm'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { userSignupAction } from '../redux/actions/userAction'


function Signup() {
    const[show,setShow]= useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{userInfo} = useSelector(state=>state.userAuth)
    const[data,setData]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
   
    useEffect(()=>{
        const clearError =setTimeout(()=>{
            setErrors({})
        },6000)
        return ()=>clearTimeout(clearError)
    })
    const{name,email,password,confirmPassword} =data
    const[errors,setErrors] =useState({})
    const onChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        setErrors(validate(data))
        if(!errors.name && !errors.email && !errors.password && !errors.confirmPassword  ){
            dispatch(userSignupAction(name,email,password))
        }
        setData({email:'',password:'',name:'',confirmPassword:''})
    }
    useEffect(()=>{
        if(userInfo){
           navigate('/')
        }
    
    })
    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit} className='form-control'>
                <h1>Signup</h1>
                <div className='input-control'>
                    <label>Name</label>
                    <input type='text' name='name' value={name}
                    onChange={onChange}
                    placeholder='Enter your name' />
                     {errors.name && 
                     <p className='error'>{errors.name}</p>
                }
                </div>
                <div className='input-control'>
                    <label>Email</label>
                    <input type='text' name='email' value={email}
                     onChange={onChange}
                    placeholder='example@gmail.com' />
                    {errors.email && 
                    <p className='error'>{errors.email}</p>
                }
                </div>
                <div className='input-control_password'>
                    <label>Password</label>
                    <div className='password'>
                    <input type={show? 'text':'password'} name='password' value={password}
                     onChange={onChange}
                     placeholder='Enter your password'  />
                     {show? <VisibilityIcon onClick={()=>setShow(!show)} /> : <VisibilityOffIcon onClick={()=>setShow(!show)} />}
                    
                     </div>
                     {errors.password &&
                     <p className='error'>{errors.password}</p>} 
                </div>
                     
                <div className='input-control'>
                    <label>Confirm Password</label>
                    <input type='password' name='confirmPassword' value={confirmPassword}
                     onChange={onChange}
                    placeholder='Confirm password' />
                    {errors.confirmPassword &&
                    <p className='error'>{errors.confirmPassword}</p>} 
                </div>

                <button >Signup</button>
                <div className='redirectToSignup'>Have an account already?
               <Link to='/login'>Login</Link>
               </div>
            </form>

        </div>
    )
}

export default Signup
