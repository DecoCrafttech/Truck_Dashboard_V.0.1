import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard_slice",
    initialState: {
        initialGlow: false,
        dashboard_data: {},

        profileGlow:false,
        dashboard_profile_data: {},
    },
    reducers: {
        //get all profile
        getDashboardRequest(state, action) {
            return {
                ...state,
                initialGlow: true
            }
        },
        getDashboardResponse(state, action) {
            console.log(action.payload)
            return {
                ...state,
                initialGlow: false,
                dashboard_data: action.payload
            }
        },
        getDashboardFailure(state, action) {
            return {
                ...state,
                initialGlow: false
            }
        },


        //get single profile
        getDashboardProfileRequest(state, action) {
            return {
                ...state,
                profileGlow: true
            }
        },
        getDashboardProfileResponse(state, action) {
            return {
                ...state,
                profileGlow: false,
                dashboard_profile_data: action.payload
            }
        },
        getDashboardFailureResponse(state, action) {
            return {
                ...state,
                profileGlow: false
            }
        }
    }
})

const { actions, reducer } = dashboardSlice;

export const {
    getDashboardRequest,
    getDashboardResponse,
    getDashboardFailure,
    getDashboardProfileRequest,
    getDashboardProfileResponse,
    getDashboardProfileFailure

} = actions;

export default reducer;