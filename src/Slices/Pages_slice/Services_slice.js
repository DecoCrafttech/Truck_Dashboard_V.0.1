import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice(({
    name: "service_slice",
    initialState: {
        modal_type: "",

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


        buyAndsell_glow: false,
        allbuyAndsell_details: [],
        buyAndsellDelete_id: null,
        new_edit_buyAndsell_card: {},

        total_no_of_datas: null
    },
    reducers: {
        updateServiceModalType(state, action) {
            return {
                ...state,
                modal_type: action.payload
            }
        },
        updateEditDetails(state, action) {
            switch (action.payload?.type) {
                case "Load":
                    return {
                        ...state,
                        modal_type: "Edit"
                    }

                default:
                    break;
            }
        },
        updateDeleteDetails(state, action) {
            switch (action.payload?.type) {
                case "Load":
                    return {
                        ...state,
                        modal_type: "Delete"
                    }

                default:
                    break;
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
                allLoads_details: action.payload,
                total_no_of_datas: action.payload?.length
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
        updateLoadEditData(state, action) {
            switch (action.payload?.type) {
                case "company_name":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }

                case "contact_number":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }

                case "from_location":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }

                case "to_location":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }

                case "material":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }

                case "ton":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }

                case "truck_body_type":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }

                case "no_of_tyres":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }

                case "blog_content":
                    return {
                        ...state,
                        new_edit_load_card: action.payload?.value
                    }


                default:
                    break;
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
        truckGetFailure(state, action) {
            return {
                ...state,
                truck_glow: false,
                alltrucks_details: [],
                total_no_of_datas: 0
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
        },
        driverGetFailure(state, action) {
            return {
                ...state,
                driver_glow: false,
                alldrivers_details: [],
                total_no_of_datas: 0
            }
        },



        //                                                            driver api's                                                         //
        //get driver api
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
                allbuyAndsell_details: action.payload,
                total_no_of_datas: action.payload?.length
            }
        },
        buyAndsellGetFailure(state, action) {
            return {
                ...state,
                buyAndsell_glow: false,
                allbuyAndsell_details: [],
                total_no_of_datas: 0
            }
        }
    }
}))

const { actions, reducer } = servicesSlice;

export const {
    updateEditDetails,
    updateDeleteDetails,
    updateServiceModalType,

    loadGetRequest,
    loadGetResponse,
    loadGetFaliure,
    updateLoadEditData,
    LoadsVerificationRequest,
    LoadsVerificationResponse,


    truckGetRequest,
    truckGetResponse,
    truckGetFailure,


    driverGetRequest,
    driverGetResponse,
    driverGetFailure,


    buyAndsellGetRequest,
    buyAndsellGetResponse,
    buyAndsellGetFailure
} = actions;

export default reducer;