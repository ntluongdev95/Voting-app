import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../contants";

export const userAuthReducer =(state={},action)=>{
  switch(action.type){
      case USER_SIGNUP_REQUEST:
      case USER_LOGIN_REQUEST:
          return{
              loading:true
          }
      case USER_SIGNUP_SUCCESS:
      case USER_LOGIN_SUCCESS:
          return{
              loading:false,
              userInfo:action.payload
            }
      case USER_SIGNUP_FAIL:
      case USER_LOGIN_FAIL:
          return{
              loading:false,
              error:action.payload
          }
    case USER_LOGOUT:
          return {
              userInfo:null
          }
     default:
         return state

  }
}