import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import commonReducer from 'Slices/Common_Slice/Common_slice'; 
import servicesReducer from 'Slices/Pages_slice/Services_slice';

const reducers = combineReducers({
    commonState: commonReducer,
    servicesState:servicesReducer
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(thunk),
    devTools: true
})

export default store;