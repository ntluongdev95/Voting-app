import { CONNECTION_FAILED, CONNECTION_REQUEST, CONNECTION_SUCCESS, UPDATE_ACCOUNT } from "../contants";



const initialState={
    loading:false,
    account:null,
    contract_MM:null,
    contract_Token:null,
    contract_Infura:null,
    web3:null,
    errorMsg:''

};

 export const blockchainReducer =(state=initialState,action)=>{
    switch(action.type){
        case CONNECTION_REQUEST:
            return{
                ...state,
                loading:true
            }
        case CONNECTION_SUCCESS:
            return{
                ...state,
                loading:false,
                account:action.payload.account,
                contract_Infura:action.payload.contract_Infura,
                contract_MM:action.payload.contract_MM,
                contract_Token:action.payload.contract_Token,
                web3:action.payload.web3
            }
        case CONNECTION_FAILED:
            return{
                ...state,
                loading:false,
                errorMsg:action.payload
            }
        case UPDATE_ACCOUNT:
            return{
                ...state,
                account:action.payload.account
            }
        default:
            return state;
    }
}