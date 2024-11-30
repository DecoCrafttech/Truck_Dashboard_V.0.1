import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard_slice",
    initialState: {
        initialGlow: false,
        dashboard_data: {},

        profileGlow: false,
        dashboard_profile_data: {},
    },
    reducers: {
        //get all profile
        getDashboardRequest(state, action) {
            return {
                ...state,
                initialGlow: true,
                dashboard_data: {},
                dashboard_profile_data: {},
                profile_data:{}
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
                dashboard_profile_data: action.payload,
                profile_data:action.payload?.profile_data?.length ? action.payload?.profile_data[0] : {}
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