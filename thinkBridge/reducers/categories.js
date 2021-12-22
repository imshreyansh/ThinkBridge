import {ADD_CATEGORY,GET_ALL_CATEGORIES} from '../actions/types'

const initialState ={categories:[{name:'Landscape',photos:[]},{name:'Abstract',photos:[]},{name:'Portrait',photos:[]}]}

export default function categories(state=initialState,action) {
    const {type,payload} = action
    switch(type){
    case ADD_CATEGORY:
       return {...state,categories:[payload,...state.categories]}
    
    case GET_ALL_CATEGORIES:
        return {...state} 

    default:
        return state
    }
}