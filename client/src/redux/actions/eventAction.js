import axios from "axios";
import {  toast } from 'react-toastify';
import { GET_EVENTBYID_FAIL, GET_EVENTBYID_REQUEST, GET_EVENTBYID_SUCCESS, GET_EVENT_FAIL, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, VOTING_FAIL, VOTING_REQUEST, VOTING_SUCCESS } from "../contants"
export const getEventAction =()=> async (dispatch,getState)=>{
    try {
       dispatch({type:GET_EVENT_REQUEST}) 
       const headers = (token) => ({
        headers: {
          'Content-Type': 'application/json', 
          Authorization: 'Bearer ' + token,
        },
      });
      const{data} = await axios.get('/event',headers(getState().userAuth.userInfo.token))
      dispatch({
          type:GET_EVENT_SUCCESS,
          payload:data
      })
    
    } catch (error) {
        dispatch({
            type: GET_EVENT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
}

export const getEventByIdAction =(id)=> async (dispatch,getState)=>{
  try {
     dispatch({type:GET_EVENTBYID_REQUEST}) 
     const headers = (token) => ({
      headers: {
        'Content-Type': 'application/json', 
        Authorization: 'Bearer ' + token,
      },
    });
    const{data} = await axios.get(`/event/${id}`,headers(getState().userAuth.userInfo.token))
    dispatch({
        type:GET_EVENTBYID_SUCCESS,
        payload:data
    })
  
  } catch (error) {
      dispatch({
          type: GET_EVENTBYID_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
  }
}

export const getVotingAction =(dataInput)=> async (dispatch,getState)=>{
  try {
     dispatch({type:VOTING_REQUEST}) 
     const headers = (token) => ({
      headers: {
        'Content-Type': 'application/json', 
        Authorization: 'Bearer ' + token,
      },
    });
    const{data} = await axios.put('/event/voting',dataInput,headers(getState().userAuth.userInfo.token))
    dispatch({
        type:VOTING_SUCCESS,
        payload:data
    })
    toast.success('You voted sucessfully')
  } catch (error) {
      dispatch({
          type: VOTING_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
  }
}