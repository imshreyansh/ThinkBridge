import {ADD_CATEGORY,GET_ALL_CATEGORIES} from './types'


export const addCategory =(data)=>dispatch=>{
    dispatch({type: ADD_CATEGORY,payload:data})
}

export const getAllCategory = ()=>dispatch=>{
    dispatch({type: GET_ALL_CATEGORIES,payload:null})
}