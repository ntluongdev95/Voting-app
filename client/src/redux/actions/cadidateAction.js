import axios from "axios";
import { CREATE_CADIDATE_FAIL, CREATE_CADIDATE_REQUEST, CREATE_CADIDATE_SUCCESS } from "../contants"
import { toast } from 'react-toastify';
export const createCandidateAction =(candidateInfo)=> async (dispatch,getState)=>{
    try {
       dispatch({type:CREATE_CADIDATE_REQUEST}) 
       const headers = (token) => ({
        headers: {
          'Content-Type': 'application/json', 
          Authorization: 'Bearer ' + token,
        },
      });
      const{data} = await axios.post('/candidate/add',candidateInfo,headers(getState().userAuth.userInfo.token))
      dispatch({
          type:CREATE_CADIDATE_SUCCESS,
          payload:data
      })
      toast.success("Added a candidate successfully")
    } catch (error) {
        dispatch({
            type: CREATE_CADIDATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
}