import { GET_SOCKET } from "../contants";

export const socketReducer =(state={},action)=>{
      switch(action.type){
          case GET_SOCKET:
              return  action.payload
        default:
               return state
      }
}