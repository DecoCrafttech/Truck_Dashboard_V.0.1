import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice(({
    name: "service_slice",
    initialState: {
        modal_from: "",
        modal_type: "",
        mobile_number: null,
        is_mobile_num_verified: true,

        load_glow: false,
        allLoads_details: [],
        loadDelete_id: null,
        new_edit_load_card: {},
        load_filter_card: {},

        truck_glow: false,
        alltrucks_details: [],
        truckDelete_id: null,
        new_edit_truck_card: {},
        truck_filter_card: {},


        driver_glow: false,
        alldrivers_details: [],
        driverDelete_id: null,
        new_edit_driver_card: {},
        driver_filter_card: {},


        buyAndsell_glow: false,
        allbuyAndsell_details: [],
        buyAndsellDelete_id: null,
        new_edit_buyAndsell_card: {},
        buyAndsell_filter_card: {},
    },
    reducers: {
        updateServiceModalType(state, action) {
            return {
                ...state,
                modal_from: action.payload?.from,
                modal_type: action.payload?.type
            }
        },
        updateEditDetails(state, action) {
            switch (action.payload?.from) {
                case "Load":
                    return {
                        ...state,
                        modal_from: action.payload?.from,
                        modal_type: action.payload?.type,
                        new_edit_load_card: action.payload?.data
                    }
                case "Truck":
                    return {
                        ...state,
                        modal_from: action.payload?.from,
                        modal_type: action.payload?.type,
                        new_edit_truck_card: action.payload?.data
                    }

                case "Driver":
                    return {
                        ...state,
                        modal_from: action.payload?.from,
                        modal_type: action.payload?.type,
                        new_edit_driver_card: action.payload?.data
                    }

                case "BuyAndSell":
                    return {
                        ...state,
                        modal_from: action.payload?.from,
                        modal_type: action.payload?.type,
                        new_edit_buyAndsell_card: action.payload?.data
                    }

                default:
                    break;
            }
        },
        updateDeleteDetails(state, action) {
            switch (action.payload?.from) {
                case "Load":
                    return {
                        ...state,
                        modal_from: action.payload?.from,
                        modal_type: action.payload?.type,
                        // new_edit_load_card:action.payload?.data
                    }
                case "Truck":
                    return {
                        ...state,
                        modal_from: action.payload?.from,
                        modal_type: action.payload?.type
                        // new_edit_truck_card:action.payload?.data
                    }

                case "Driver":
                    return {
                        ...state,
                        modal_from: action.payload?.from,
                        modal_type: action.payload?.type
                        // new_edit_driver_card:action.payload?.data
                    }

                case "BuyAndSell":
                    return {
                        ...state,
                        modal_from: action.payload?.from,
                        modal_type: action.payload?.type
                        // new_edit_buyAndsell_card:action.payload?.data
                    }

                default:
                    break;
            }
        },
        initializeFilterDetails(state, action) {
            return {
                ...state,
                modal_from: action.payload?.from,
                modal_type: action.payload?.type
            }
        },


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
                allLoads_details: action.payload?.load_data,
            }
        },
        loadGetFaliure(state, action) {
            return {
                ...state,
                load_glow: false,
                allLoads_details: [],
                total_no_of_datas: 0
            }
        },
        updateLoadVerifyData(state, action) {
            return {
                ...state,
                mobile_number: action.payload
            }
        },
        updateLoadEditData(state, action) {
            return {
                ...state,
                new_edit_load_card: {
                    ...state.new_edit_load_card,
                    ...action.payload
                }
            }
        },
        updateLoadFilterData(state, action) {
            return {
                ...state,
                load_filter_card: {
                    ...state.load_filter_card,
                    ...action.payload
                }
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
                alltrucks_details: action.payload?.truck_data,
            }
        },
        truckGetFailure(state, action) {
            return {
                ...state,
                truck_glow: false,
                alltrucks_details: [],
                total_no_of_datas: 0
            }
        },
        updateTruckVerifyData(state, action) {
            return {
                ...state,
                mobile_number: action.payload
            }
        },
        updateTruckEditData(state, action) {
            return {
                ...state,
                new_edit_truck_card: {
                    ...state.new_edit_truck_card,
                    ...action.payload
                }
            }
        },
        updateTruckFilterData(state, action) {
            console.log(action.payload)
            return {
                ...state,
                truck_filter_card: {
                    ...state.truck_filter_card,
                    ...action.payload
                }
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
                alldrivers_details: action.payload?.driver_data
            }
        },
        driverGetFailure(state, action) {
            return {
                ...state,
                driver_glow: false,
                alldrivers_details: [],
                total_no_of_datas: 0
            }
        },
        updateDriverVerifyData(state, action) {
            return {
                ...state,
                mobile_number: action.payload
            }
        },
        updateDriverEditData(state, action) {
            return {
                ...state,
                new_edit_driver_card: {
                    ...state.new_edit_driver_card,
                    ...action.payload
                }
            }
        },
        updateDriverFilterData(state, action) {
            return {
                ...state,
                driver_filter_card: {
                    ...state.driver_filter_card,
                    ...action.payload
                }
            }
        },



        //                                                            buy and sell api's                                                         //
        //get buy and sell api
        buyAndsellGetRequest(state, action) {
            return {
                ...state,
                buyAndsell_glow: true
            }
        },
        buyAndsellGetResponse(state, action) {
            return {
                ...state,
                buyAndsell_glow: false,
                allbuyAndsell_details: action.payload?.buy_sell_data
            }
        },
        buyAndsellGetFailure(state, action) {
            return {
                ...state,
                buyAndsell_glow: false,
                allbuyAndsell_details: [],
                total_no_of_datas: 0
            }
        },
        updateBuyAndSellVerifyData(state, action) {
            return {
                ...state,
                mobile_number: action.payload
            }
        },
        updateBuyAndSellEditData(state, action) {
            return {
                ...state,
                new_edit_buyAndsell_card: {
                    ...state.new_edit_buyAndsell_card,
                    ...action.payload
                }
            }
        },
        updateBuyAndSellFilterData(state, action) {
            return {
                ...state,
                buyAndsell_filter_card: {
                    ...state.buyAndsell_filter_card,
                    ...action.payload
                }
            }
        },
    }
}))




const { actions, reducer } = servicesSlice;

export const {
    updateEditDetails,
    updateDeleteDetails,
    updateServiceModalType,
    initializeFilterDetails,

    loadGetRequest,
    loadGetResponse,
    loadGetFaliure,
    updateLoadVerifyData,
    updateLoadEditData,
    updateLoadFilterData,
    LoadsVerificationRequest,
    LoadsVerificationResponse,


    truckGetRequest,
    truckGetResponse,
    truckGetFailure,
    truckVerificationRequest,
    truckVerificationResponse,
    updateTruckVerifyData,
    updateTruckEditData,
    updateTruckFilterData,


    driverGetRequest,
    driverGetResponse,
    driverGetFailure,
    driverVerificationRequest,
    driverVerificationResponse,
    updateDriverVerifyData,
    updateDriverEditData,
    updateDriverFilterData,


    buyAndsellGetRequest,
    buyAndsellGetResponse,
    buyAndsellGetFailure,
    buyAndSellVerificationRequest,
    buyAndSellVerificationResponse,
    updateBuyAndSellVerifyData,
    updateBuyAndSellEditData,
    updateBuyAndSellFilterData


} = actions;

export default reducer;