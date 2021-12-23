import { ADD_CATEGORY, GET_ALL_CATEGORIES, ADD_PHOTOS_IN_CATEGORY, GET_CATEGORY_DETAILS_BY_CATEGORY, SET_CATEGORY_PHOTO_AS_FAVOURITE_OR_UNFAVOURITE } from './types'


export const addCategory = (data) => dispatch => {
    dispatch({ type: ADD_CATEGORY, payload: data })
}

export const getAllCategory = () => dispatch => {
    dispatch({ type: GET_ALL_CATEGORIES, payload: null })
}

export const addPhotoInCategory = (data) => dispatch => {
    dispatch({ type: ADD_PHOTOS_IN_CATEGORY, payload: data })
}

export const getCategoryDetailsByCategory = (name) => dispatch => {
    dispatch({ type: GET_CATEGORY_DETAILS_BY_CATEGORY, payload: name })
}

export const toggleFavourite = (data) => dispatch => {
    dispatch({ type: SET_CATEGORY_PHOTO_AS_FAVOURITE_OR_UNFAVOURITE, payload: data })
}