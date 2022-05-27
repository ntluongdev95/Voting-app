import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../contants"
import axios from 'axios'
import {  toast } from 'react-toastify';
export const userSignupAction =(name,email,password)=>async dispatch=>{
    try {
        dispatch({type:USER_SIGNUP_REQUEST})
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        const{data} = await axios.post('/user/signup',{name,email,password},config)
        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
        toast.success('Sign up successfully')
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
   
    }
}

export const userLoginAction =(email,password)=>async dispatch=>{
  try {
      dispatch({type:USER_LOGIN_REQUEST})
      const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      const{data} = await axios.post('/user/login',{email,password},config)
      dispatch({
          type:USER_LOGIN_SUCCESS,
          payload:data
      })
      localStorage.setItem('userInfo',JSON.stringify(data))
      toast.success('Login successfully')
  } catch (error) {
      dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
 
  }
}


//logout
export const logoutAction =()=> async dispatch =>{
  localStorage.removeItem('userInfo')
  dispatch({type:USER_LOGOUT})
  document.location.href = '/login'
}
