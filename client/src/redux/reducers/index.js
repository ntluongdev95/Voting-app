import {combineReducers} from 'redux'
import { blockchainReducer } from './blockchainReducer'
import { createCandidateReducer } from './cadidateReducer'
import { getEventByIdReducer, getEventReducer, votingReducer } from './eventReducer'
import { userAuthReducer } from './userReducer'



export default combineReducers({
 userAuth:userAuthReducer,
 candidateInfo:createCandidateReducer,
 allEvents:getEventReducer,
 blockchain:blockchainReducer,
 eventItem:getEventByIdReducer,
 voted:votingReducer,
})