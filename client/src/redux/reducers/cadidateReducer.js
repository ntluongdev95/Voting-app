import { CREATE_CADIDATE_FAIL, CREATE_CADIDATE_REQUEST, CREATE_CADIDATE_SUCCESS } from "../contants";

export const createCandidateReducer =(state={},action)=>{
      switch(action.type){
          case CREATE_CADIDATE_REQUEST:
              return{
                  loading:true
              }
          case CREATE_CADIDATE_SUCCESS:
              return{
                  loading:false,
                  candidateInfo:action.payload
              }
          case CREATE_CADIDATE_FAIL:
              return{
                  loading:false,
                  error:action.payload
              }
         default:
             return state
      }
}