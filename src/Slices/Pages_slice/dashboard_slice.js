import { createSlice } from "@reduxjs/toolkit";
import { buyAndsellDeleteResponse, buyAndsellPostResponse, DriverDeleteResponse, DriverPostResponse, LoadDeleteResponse, LoadPostResponse, TruckDeleteResponse, TruckPostResponse } from "Slices/Pages_slice/Services_slice";

const dashboardSlice = createSlice({
    name: "dashboard_slice",
    initialState: {
        initialGlow: false,

        dashboard_data: {},

        profileGlow: false,
        dashboard_profile_data: {},

        add_new_vehicle: '',
        add_vehicle_glow: false,

        delete_vehicle_number: null,

        recall_dashboard_again: false
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


        //update new vehicle details
        addVehicleRequest(state, action) {
            return {
                ...state,
                add_vehicle_glow: true
            }
        },
        addVehicleResponse(state, action) {
            let updateVehicleNewList = { ...state?.dashboard_profile_data }
            updateVehicleNewList.vehicle_data = updateVehicleNewList?.vehicle_data.concat(action.payload?.vehicle_data)

            return {
                ...state,
                add_vehicle_glow: false,
                dashboard_profile_data: updateVehicleNewList,
                add_new_vehicle: ''
            }
        },
        addVehicleFailure(state, action) {
            return {
                ...state,
                add_vehicle_glow: false
            }
        },


        //update new vehicle details
        removeVehicleRequest(state, action) {
            return {
                ...state,
                delete_vehicle_number: action.payload?.vehicle_no
            }
        },
        removeVehicleResponse(state, action) {
            const removedVehicleNewList = state?.dashboard_profile_data?.vehicle_data?.filter((val) => val?.vehicle_no !== action.payload?.vehicle_no)

            let updateVehicleNewList = { ...state?.dashboard_profile_data }
            updateVehicleNewList.vehicle_data = removedVehicleNewList
            return {
                ...state,
                delete_vehicle_number: null,
                dashboard_profile_data: updateVehicleNewList,
            }
        },
        removeVehicleFailure(state, action) {
            return {
                ...state,
                delete_vehicle_number: null
            }
        }
    },
    extraReducers: (builder) => {
        builder
            //load
            .addCase(LoadPostResponse, (state, action) => {
                state.recall_dashboard_again = !state.recall_dashboard_again
            })
            .addCase(LoadDeleteResponse, (state, action) => {
                state.recall_dashboard_again = !state.recall_dashboard_again
            })

            //truck
            .addCase(TruckPostResponse, (state, action) => {
                state.recall_dashboard_again = !state.recall_dashboard_again
            })
            .addCase(TruckDeleteResponse, (state, action) => {
                state.recall_dashboard_again = !state.recall_dashboard_again
            })

            //driver
            .addCase(DriverPostResponse, (state, action) => {
                state.recall_dashboard_again = !state.recall_dashboard_again
            })
            .addCase(DriverDeleteResponse, (state, action) => {
                state.recall_dashboard_again = !state.recall_dashboard_again
            })

            //buy and sell
            .addCase(buyAndsellPostResponse, (state, action) => {
                state.recall_dashboard_again = !state.recall_dashboard_again
            })
            .addCase(buyAndsellDeleteResponse, (state, action) => {
                state.recall_dashboard_again = !state.recall_dashboard_again
            })
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

    removeVehicleRequest,
    removeVehicleResponse,
    removeVehicleFailure


} = actions;

export default reducer;