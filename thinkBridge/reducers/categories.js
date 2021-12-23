import { ADD_CATEGORY, GET_ALL_CATEGORIES, ADD_PHOTOS_IN_CATEGORY, GET_CATEGORY_DETAILS_BY_CATEGORY, SET_CATEGORY_PHOTO_AS_FAVOURITE_OR_UNFAVOURITE } from '../actions/types'

const initialState = { categories: [{ name: 'Landscape', photos: [] }, { name: 'Abstract', photos: [] }, { name: 'Portrait', photos: [] }], categoryById: '' }

export default function categories(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case ADD_CATEGORY:
            return { ...state, categories: [payload, ...state.categories] }

        case GET_ALL_CATEGORIES:
            return { ...state }

        case ADD_PHOTOS_IN_CATEGORY:
            state.categories.map((d) => {
                if (d.name === payload.name) {
                    d.photos.push(payload.image)
                }
            })
            return { ...state, categories: [...state.categories] }

        case GET_CATEGORY_DETAILS_BY_CATEGORY:
            let findByName = state.categories.filter(d => d.name === payload.name)[0]
            return { ...state, categoryById: findByName }

        case SET_CATEGORY_PHOTO_AS_FAVOURITE_OR_UNFAVOURITE:
            state.categories.map((d) => {
                if (d.name === payload.name) {
                    d.photos[payload.index].isFav = payload.status
                }
            })
            return { ...state, categories: [...state.categories] }

        default:
            return state
    }
}