import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice(({
    name: "service_slice",
    initialState: {
        load_glow: false,
        allLoads_details: [],
        loadDelete_id: null,
        new_edit_load_card: {},

        truck_glow: false,
        alltrucks_details: [],
        truckDelete_id: null,
        new_edit_truck_card: {},


        driver_glow: false,
        alldrivers_details: [],
        driverDelete_id: null,
        new_edit_driver_card: {},

        total_no_of_datas: null
    },
    reducers: {
        //                                                             load api's                                                         //
        //get load api
        loadGetRequest(state, action) {
            return {
                ...state,
                load_glow: true
            }
        },
        loadGetResponse(state, action) {
            return {
                ...state,
                load_glow: false,
                allLoads_details: action.payload,
                total_no_of_datas: action.payload?.length
            }
        },



        //                                                            truck api's                                                         //
        //get truck api
        truckGetRequest(state, action) {
            return {
                ...state,
                truck_glow: true
            }
        },
        truckGetResponse(state, action) {
            return {
                ...state,
                truck_glow: false,
                alltrucks_details: action.payload,
                total_no_of_datas: action.payload?.length
            }
        },





        //                                                            driver api's                                                         //
        //get driver api
        driverGetRequest(state, action) {
            return {
                ...state,
                driver_glow: true
            }
        },
        driverGetResponse(state, action) {
            return {
                ...state,
                driver_glow: false,
                alldrivers_details: action.payload,
                total_no_of_datas: action.payload?.length
            }
        }
    }
}))

const { actions, reducer } = servicesSlice;

export const {
    loadGetRequest,
    loadGetResponse,
    truckGetRequest,
    truckGetResponse,
    driverGetRequest,
    driverGetResponse
} = actions;

export default reducer;