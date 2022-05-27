import { GET_EVENTBYID_FAIL, GET_EVENTBYID_REQUEST, GET_EVENTBYID_SUCCESS, GET_EVENT_FAIL, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, VOTING_FAIL, VOTING_REQUEST, VOTING_SUCCESS } from "../contants"

export const getEventReducer =(state={},action)=>{
    switch(action.type){
        case GET_EVENT_REQUEST:
            return{
                loading:true
            }
        case GET_EVENT_SUCCESS:
            return{
                loading:false,
                allEvents:action.payload
            }
        case GET_EVENT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
       default:
           return state
    }
}

export const getEventByIdReducer =(state={},action)=>{
    switch(action.type){
        case GET_EVENTBYID_REQUEST:
            return{
                loading:true
            }
        case GET_EVENTBYID_SUCCESS:
            return{
                loading:false,
                eventItem:action.payload
            }
        case GET_EVENTBYID_FAIL:
            return{
                loading:false,
                error:action.payload
            }
       default:
           return state
    }
}

export const votingReducer =(state={},action)=>{
    switch(action.type){
        case VOTING_REQUEST:
            return{
                loading:true
            }
        case VOTING_SUCCESS:
            return{
                loading:false,
                voted:action.payload
            }
        case VOTING_FAIL:
            return{
                loading:false,
                error:action.payload
            }
       default:
           return state
    }
}