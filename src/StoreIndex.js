import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import commonReducer from 'Slices/Common_Slice/Common_slice';
import dashboardSlice from 'Slices/Pages_slice/dashboard_slice';
import servicesReducer from 'Slices/Pages_slice/Services_slice';
import blogReducer from 'Slices/Pages_slice/Blog_slice';
import feedbackSlice from 'Slices/Pages_slice/Feedback_slice';

const reducers = combineReducers({
    commonState: commonReducer,
    dashboardState: dashboardSlice,
    servicesState: servicesReducer,
    blogState: blogReducer,
    feedbackState: feedbackSlice
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(thunk),
    devTools: true
})

export default store;