import { createSlice } from "@reduxjs/toolkit";
import { updateBlogModalType, updateDeleteBlog, updateEditBlog } from "./Blog_slice";
import { updateFeedbackModal } from "Slices/Pages_slice/Feedback_slice";
import { updateSelectedLineChart } from "Slices/Pages_slice/Analytice_slice";
import { getCrmModalRequest, update_crm_status_entry_user_id } from "Slices/Pages_slice/Crm_slice";

const servicesSlice = createSlice(({
    name: "service_slice",
    initialState: {
        modal_from: "",
        modal_type: "",
        phone_number: null,
        is_mobile_num_verified: false,
        spinner_glow: false,
        user_data: {},
        re_render: false,
        user_vehicle_list: [],

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

        deletion_image_cdn_path: null
    },
    reducers: {
        updateCreateModalDetails(state, action) {
            let obj = {
                ...state,
                modal_from: action.payload?.from,
                modal_type: action.payload?.type,
                is_mobile_num_verified: false,
                phone_number: null,
                user_data: []
            }

            switch (action.payload?.from) {
                case "Load":
                    obj.new_edit_load_card = {}
                    return obj

                case "Truck":
                    obj.new_edit_truck_card = {}
                    return obj

                case "Driver":
                    obj.new_edit_driver_card = {}
                    return obj

                case "BuyAndSell":
                    obj.new_edit_buyAndsell_card = {}
                    return obj

                default:
                    break;
            }
        },

        updateEditDetails(state, action) {
            let obj = {
                ...state,
                modal_from: action.payload?.from,
                modal_type: action.payload?.type,
                user_data: {
                    ...state.user_data,
                    user_id: action.payload?.data?.user_id
                }
            }

            let selectedVehicle = []
            selectedVehicle = state?.user_vehicle_list?.filter((v) => v.label === action.payload?.data?.vehicle_number)
            if (!selectedVehicle?.length) {
                selectedVehicle = [{ value: 1, label: action.payload?.data?.vehicle_number }]
            }

            switch (action.payload?.from) {
                case "Load":
                    obj.new_edit_load_card = action.payload?.data
                    return obj

                case "Truck":
                    obj.new_edit_truck_card = {
                        ...state?.new_edit_truck_card,
                        ...action.payload?.data,
                        vehicle_number: selectedVehicle,
                        vehicle_number_selected: action.payload?.data?.vehicle_number
                    }
                    return obj

                case "Driver":
                    obj.new_edit_driver_card = {
                        ...state?.new_edit_driver_card,
                        ...action.payload?.data,
                        vehicle_number: selectedVehicle,
                        vehicle_number_selected: action.payload?.data?.vehicle_number
                    }
                    return obj

                case "BuyAndSell":
                    obj.new_edit_buyAndsell_card = {
                        ...state?.new_edit_buyAndsell_card,
                        ...action.payload?.data,
                        blog_image_show_ui: action.payload?.data?.images,
                        blog_image_send_api: [],
                        vehicle_number: selectedVehicle,
                        vehicle_number_selected: action.payload?.data?.vehicle_number,
                        existing_image_from_response: action.payload?.data?.images,
                        edit: true
                    }
                    return obj

                default:
                    return state;
            }
        },
        updateDeleteDetails(state, action) {
            let obj = {
                ...state,
                modal_from: action.payload?.from,
                modal_type: action.payload?.type,
                user_data: {
                    ...state.user_data,
                    user_id: action.payload?.data?.user_id
                }
            }

            switch (action.payload?.from) {
                case "Load":
                    obj.new_edit_load_card = action.payload?.data
                    obj.loadDelete_id = action.payload?.data?.load_id
                    return obj

                case "Truck":
                    obj.new_edit_truck_card = action.payload?.data
                    obj.truckDelete_id = action.payload?.data?.truck_id
                    return obj

                case "Driver":
                    obj.new_edit_driver_card = action.payload?.data
                    obj.driverDelete_id = action.payload?.data?.driver_id
                    return obj

                case "BuyAndSell":
                    obj.new_edit_buyAndsell_card = action.payload?.data
                    obj.buyAndsellDelete_id = action.payload?.data?.buy_sell_id
                    return obj

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
        MobileNumVerificationRequest(state, action) {
            return {
                ...state,
                spinner_glow: true,
                new_edit_load_card: {},

            }
        },
        MobileNumVerificationResponse(state, action) {
            let obj = {
                ...state,
                spinner_glow: false,
                is_mobile_num_verified: true,
                user_data: action.payload[0],
            }

            if (state.modal_from === "Load") {
                obj.new_edit_load_card = {
                    ...state.new_edit_load_card,
                    contact_no: state.phone_number
                }
                return obj
            }

            if (state.modal_from === "Truck") {
                obj.new_edit_truck_card = {
                    ...state.new_edit_truck_card,
                    contact_no: state.phone_number
                }
                return obj
            }

            if (state.modal_from === "Driver") {
                obj.new_edit_driver_card = {
                    ...state.new_edit_driver_card,
                    contact_no: state.phone_number,
                    driver_name: action.payload[0].first_name
                }
                return obj
            }

            if (state.modal_from === "BuyAndSell") {
                obj.new_edit_buyAndsell_card = {
                    ...state.new_edit_buyAndsell_card,
                    contact_no: state.phone_number,
                    owner_name: action.payload[0].first_name
                }
                return obj
            }
        },
        MobileNumVerificationFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
            }
        },
        updateVerifyMobileNumberData(state, action) {
            return {
                ...state,
                phone_number: action.payload
            }
        },
        updateUserVehicleList(state, action) {
            let react_vehicle_list_dropdown_select = [];
            if (action.payload[0]?.vehicle_list?.length) {
                react_vehicle_list_dropdown_select = action.payload[0]?.vehicle_list?.map((v, i) => {
                    return { value: i + 1, label: v }
                })
            }

            return {
                ...state,
                user_vehicle_list: react_vehicle_list_dropdown_select,
            }
        },

        //                                                             load api's                                                         //
        //get load api
        loadGetRequest(state, action) {
            return {
                ...state,
                load_glow: true,
                spinner_glow: false
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
        ResetLoadFilterData(state, action) {
            return {
                ...state,
                load_filter_card: {}
            }
        },

        //post or edit load
        LoadPostRequest(state, action) {
            return {
                ...state,
                spinner_glow: true
            }
        },
        LoadPostResponse(state, action) {
            return {
                ...state,
                spinner_glow: false,
                new_edit_load_card: {},
                re_render: !state.re_render
            }
        },
        LoadPostFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
            }
        },

        //delete load
        LoadDeleteRequest(state, action) {
            return {
                ...state,
                spinner_glow: true
            }
        },
        LoadDeleteResponse(state, action) {
            return {
                ...state,
                spinner_glow: false,
                loadDelete_id: null,
                re_render: !state.re_render
            }
        },
        LoadDeleteFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
            }
        },

        //                                                                                                 truck api's                                                         //
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
            return {
                ...state,
                truck_filter_card: {
                    ...state.truck_filter_card,
                    ...action.payload
                }
            }
        },
        ResetTruckFilterData(state, action) {
            return {
                ...state,
                truck_filter_card: {}
            }
        },


        //post or edit Truck
        TruckPostRequest(state, action) {
            return {
                ...state,
                spinner_glow: true
            }
        },
        TruckPostResponse(state, action) {
            return {
                ...state,
                spinner_glow: false,
                new_edit_load_card: {},
                re_render: !state.re_render
            }
        },
        TruckPostFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
            }
        },

        //delete load
        TruckDeleteRequest(state, action) {
            return {
                ...state,
                spinner_glow: true
            }
        },
        TruckDeleteResponse(state, action) {
            return {
                ...state,
                spinner_glow: false,
                truckDelete_id: null,
                re_render: !state.re_render
            }
        },
        TruckDeleteFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
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
        ResetDriverFilterData(state, action) {
            return {
                ...state,
                driver_filter_card: {}
            }
        },

        //post or edit driver
        DriverPostRequest(state, action) {
            return {
                ...state,
                spinner_glow: true
            }
        },
        DriverPostResponse(state, action) {
            return {
                ...state,
                spinner_glow: false,
                new_edit_driver_card: {},
                re_render: !state.re_render
            }
        },
        DriverPostFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
            }
        },

        //delete driver
        DriverDeleteRequest(state, action) {
            return {
                ...state,
                spinner_glow: true
            }
        },
        DriverDeleteResponse(state, action) {
            return {
                ...state,
                spinner_glow: false,
                driverDelete_id: null,
                re_render: !state.re_render
            }
        },
        DriverDeleteFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
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
        ResetbuyAndsellFilterData(state, action) {
            return {
                ...state,
                buyAndsell_filter_card: {}
            }
        },

        //post or edit buyAndsell
        buyAndsellPostRequest(state, action) {
            return {
                ...state,
                spinner_glow: true
            }
        },
        buyAndsellPostResponse(state, action) {
            return {
                ...state,
                spinner_glow: false,
                new_edit_buyAndsell_card: {},
                re_render: !state.re_render
            }
        },
        buyAndsellPostFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
            }
        },

        //delete driver
        buyAndsellDeleteRequest(state, action) {
            return {
                ...state,
                spinner_glow: true
            }
        },
        buyAndsellDeleteResponse(state, action) {
            return {
                ...state,
                spinner_glow: false,
                buyAndsellDelete_id: null,
                re_render: !state.re_render
            }
        },
        buyAndsellDeleteFailure(state, action) {
            return {
                ...state,
                spinner_glow: false
            }
        },

        //delete buy and sell image
        buyAndsellImageDeleteRequest(state, action) {
            return {
                ...state,
                deletion_image_cdn_path: action?.payload
            }
        },
        buyAndsellImageDeleteResponse(state, action) {
            let images = state?.new_edit_buyAndsell_card?.blog_image_show_ui?.filter((v) => v !== action?.payload);
            let show_ui_img = []

            if (state?.new_edit_buyAndsell_card?.blog_image_send_api) {
                show_ui_img = [...state?.new_edit_buyAndsell_card?.blog_image_send_api, ...images]
            } else {
                show_ui_img = images
            }

            let newObjAfterImageRemoval = {
                ...state?.new_edit_buyAndsell_card,
                existing_image_from_response: images,
                blog_image_show_ui: show_ui_img, 
            }

            return {
                ...state,
                new_edit_buyAndsell_card: { ...newObjAfterImageRemoval },
                deletion_image_cdn_path: null
            }
        },
        buyAndsellImageDeleteFailure(state, action) {
            return {
                ...state,
                deletion_image_cdn_path: null
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateBlogModalType, (state, action) => {
                state.modal_from = "Blog"
                state.modal_type = "Create"
            })
            .addCase(updateEditBlog, (state, action) => {
                state.modal_from = "Blog"
                state.modal_type = "Edit"
            })
            .addCase(updateDeleteBlog, (state, action) => {
                state.modal_from = "Blog"
                state.modal_type = "Delete"
            })
            .addCase(updateFeedbackModal, (state, action) => {
                state.modal_from = action.payload?.from
                state.modal_type = action.payload?.type
            })

            //Analysis
            .addCase(updateSelectedLineChart, (state, action) => {
                state.load_filter_card = {}
                state.truck_filter_card = {}
                state.driver_filter_card = {}
                state.buyAndsell_filter_card = {}
            })


            //crm 
            .addCase(getCrmModalRequest, (state, action) => {
                state.modal_from = "CRM"
                state.modal_type = "Create"
            })
            .addCase(update_crm_status_entry_user_id, (state, action) => {
                state.modal_from = "CRM"
                state.modal_type = "Edit"
            })

    }
}))

const { actions, reducer } = servicesSlice;

export const {
    updateEditDetails,
    updateDeleteDetails,
    updateCreateModalDetails,
    initializeFilterDetails,
    updateUserVehicleList,
    updateModelStatus,

    loadGetRequest,
    loadGetResponse,
    loadGetFaliure,
    MobileNumVerificationRequest,
    MobileNumVerificationResponse,
    MobileNumVerificationFailure,
    updateVerifyMobileNumberData,
    updateLoadEditData,
    updateLoadFilterData,
    ResetLoadFilterData,
    LoadsVerificationRequest,
    LoadsVerificationResponse,
    LoadPostRequest,
    LoadPostResponse,
    LoadPostFailure,
    LoadDeleteRequest,
    LoadDeleteResponse,
    LoadDeleteFailure,

    truckGetRequest,
    truckGetResponse,
    truckGetFailure,
    truckVerificationRequest,
    truckVerificationResponse,
    updateTruckEditData,
    updateTruckFilterData,
    ResetTruckFilterData,
    TruckPostRequest,
    TruckPostResponse,
    TruckPostFailure,
    TruckDeleteRequest,
    TruckDeleteResponse,
    TruckDeleteFailure,

    driverGetRequest,
    driverGetResponse,
    driverGetFailure,
    driverVerificationRequest,
    driverVerificationResponse,
    updateDriverEditData,
    updateDriverFilterData,
    ResetDriverFilterData,
    DriverPostRequest,
    DriverPostResponse,
    DriverPostFailure,
    DriverDeleteRequest,
    DriverDeleteResponse,
    DriverDeleteFailure,


    buyAndsellGetRequest,
    buyAndsellGetResponse,
    buyAndsellGetFailure,
    buyAndSellVerificationRequest,
    buyAndSellVerificationResponse,
    updateBuyAndSellEditData,
    updateBuyAndSellFilterData,
    ResetbuyAndsellFilterData,
    buyAndsellPostRequest,
    buyAndsellPostResponse,
    buyAndsellPostFailure,
    buyAndsellDeleteRequest,
    buyAndsellDeleteResponse,
    buyAndsellDeleteFailure,
    buyAndsellImageDeleteRequest,
    buyAndsellImageDeleteResponse,
    buyAndsellImageDeleteFailure,

} = actions;

export default reducer;