import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard_slice",
    initialState: {
        initialGlow: false,
        recall_dashboard_again: false,
        dashboard_data: {},

        profileGlow: false,
        dashboard_profile_data: {},
        add_new_vehicle: null,
        add_vehicle_glow: false
    },
    reducers: {
        //get all profile
        getDashboardRequest(state, action) {
            return {
                ...state,
                initialGlow: true,
                dashboard_data: {},
                dashboard_profile_data: {},
                profile_data: {}
            }
        },
        getDashboardResponse(state, action) {
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
                add_vehicle_glow:false,
                dashboard_profile_data: action.payload,
                profile_data: action.payload?.profile_data?.length ? action.payload?.profile_data[0] : {}
            }
        },
        getDashboardFailureResponse(state, action) {
            return {
                ...state,
                profileGlow: false
            }
        },

        //update new vehicle details
        updateNewVehicle(state, action) {
            return {
                ...state,
                add_new_vehicle: action.payload
            }
        },

        addVehicleRequest(state, action) {
            return {
                ...state,
                add_vehicle_glow: true
            }
        },
        addVehicleResponse(state, action) {
            return {
                ...state,
                add_vehicle_glow: false,
                recall_dashboard_again: true
            }
        },
        addVehicleFailure(state, action) {
            return {
                ...state,
                add_vehicle_glow: false
            }
        },
    }
})

const { actions, reducer } = dashboardSlice;

export const {
    getDashboardRequest,
    getDashboardResponse,
    getDashboardFailure,
    
    getDashboardProfileRequest,
    getDashboardProfileResponse,
    getDashboardProfileFailure,

    updateNewVehicle,
    addVehicleRequest,
    addVehicleResponse,
    addVehicleFailure,

} = actions;

export default reducer;