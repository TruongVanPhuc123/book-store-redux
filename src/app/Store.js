import { configureStore, combineReducers } from '@reduxjs/toolkit'
import bookReducer from "./Slice"

export default configureStore({
    reducer: combineReducers({
        book: bookReducer
    })
});