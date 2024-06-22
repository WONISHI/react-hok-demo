import {configureStore} from '@reduxjs/toolkit'
import TabReducer from './reduces/tab'
import TagReducer from './reduces/tag'
export default configureStore({
    reducer:{
        tab:TabReducer,
        tag:TagReducer
    }
})