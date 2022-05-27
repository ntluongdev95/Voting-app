import React, { useEffect, useState } from 'react'
import './login.scss' 
import{Link, useNavigate} from 'react-router-dom'
import { userLoginAction } from '../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
function Login() {
    const navigate = useNavigate()
    const{userInfo} = useSelector(state=>state.userAuth)
    const[dataForm,setDataForm] = useState({
        email:'',
        password:''
    })
    const dispatch = useDispatch()
    const onChange =(e)=>{
        setDataForm({...dataForm,[e.target.name]:e.target.value})
    }
    const{email,password} =dataForm
    const handleLogin =(e)=>{
       e.preventDefault()
       dispatch(userLoginAction(email,password))
       setDataForm({email:'',password:''})
    }
    useEffect(()=>{
        if(userInfo ){
           navigate('/')
        }
    })
    return (
        <div className='login-container'>
           
            <form onSubmit={handleLogin} className='form-control'>
                <h1>Login</h1>
                <div className='input-control'>
                    <label>Email</label>
                    <input type='email'  placeholder='example@gmail.com'
                    name='email' value={email}  onChange={onChange}
                    />
                </div>
                <div className='input-control'>
                    <label>Password</label>
                    <input type='password'  placeholder='Enter your password' 
                    name='password' value={password}  onChange={onChange}
                    />
                </div>
                <button>Login</button>
                <div type='password' className='forgetPassword'>Forgot<a href='/reset'>Password</a>
                </div>
                <div className='redirectToSignup'>Dont have an account?
               <Link to='/signup'>Sign up</Link>
               </div>
            </form>
        </div>
    )
}
            
            



export default Login
