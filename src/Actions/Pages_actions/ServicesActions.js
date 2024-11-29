import axiosInstance from 'Services/axiosInstance';
import { updateModalShow, updateToast } from 'Slices/Common_Slice/Common_slice';
import {
    updateEditDetails,
    updateDeleteDetails,
    updateServiceModalType,
    initializeFilterDetails,

    loadGetRequest,
    loadGetResponse,
    loadGetFaliure,
    LoadsVerificationRequest,
    LoadsVerificationResponse,
    updateLoadVerifyData,
    updateLoadEditData,
    updateLoadFilterData,

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
    updateBuyAndSellFilterData,


} from 'Slices/Pages_slice/Services_slice';

export const handleCreateModal = dispatch => {
    dispatch(updateServiceModalType("Create"))
    dispatch(updateModalShow())
}

export const handleDeleteModal = deleteData => dispatch => {
    dispatch(updateDeleteDetails(deleteData))
    dispatch(updateModalShow())
}

export const handleEditModal = editData => dispatch => {
    dispatch(updateEditDetails(editData))
    dispatch(updateModalShow())
}

export const handleFilterModal = dispatch => {
    dispatch(initializeFilterDetails())
    dispatch(updateModalShow())
}




//                                                              load api's                                                                  //
//get all loads api
export const handleGetLoads = (params) => async (dispatch) => {
    try {
        dispatch(loadGetRequest())
        const { data } = await axiosInstance.post("/dashboard_load_details", params)

        if (data?.error_code === 0) {
            dispatch(loadGetResponse(data?.data))
        } else {
            dispatch(loadGetFaliure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

//load post mobile number verification
export const handlePostLoadsVerification = async (dispatch) => {
    try {
        dispatch(LoadsVerificationRequest())
        const { data } = await axiosInstance.get("/all_load_details")

        if (data?.error_code === 0) {
            dispatch(LoadsVerificationResponse(data?.data))
        } else {
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleOnchangeLoadVerify = (inputData) => dispatch => {
    dispatch(updateLoadVerifyData(inputData))
}

export const handleLoadInputOnChange = (inputData) => dispatch => {
    dispatch(updateLoadEditData(inputData))
}

export const handleOnchangeLoadFilter = (inputData) => dispatch => {
    dispatch(updateLoadFilterData(inputData))
}





//                                                              truck api's                                                                  //
//get all truck api
export const handleGetTruck = (params) => async (dispatch) => {
    try {
        dispatch(truckGetRequest())
        const { data } = await axiosInstance.post("/dashboard_truck_details", params)

        if (data?.error_code === 0) {
            dispatch(truckGetResponse(data?.data))
        } else {
            dispatch(truckGetFailure())
            dispatch(updateToast({ message: data?.message, type: "error" })) 
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleOnchangeTruckVerify = (inputData) => dispatch => {
    dispatch(updateTruckVerifyData(inputData))
}

export const handleTruckInputOnChange = (inputData) => dispatch => {
    dispatch(updateTruckEditData(inputData))
}

export const handleOnchangeTruckFilter = (inputData) => dispatch => {
    dispatch(updateTruckFilterData(inputData))
}







//                                                              driver api's                                                                  //
//get all loads api
export const handleGetDriver = (params) => async (dispatch) => {
    try {
        dispatch(driverGetRequest())
        const { data } = await axiosInstance.post("/dashboard_driver_details", params)

        if (data?.error_code === 0) {
            dispatch(driverGetResponse(data?.data))
        } else {
            dispatch(driverGetFailure()) 
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleOnchangeDriverVerify = (inputData) => dispatch => {
    dispatch(updateDriverVerifyData(inputData))
}

export const handleDriverInputOnChange = (inputData) => dispatch => {
    dispatch(updateDriverEditData(inputData))
}

export const handleOnchangeDriverFilter = (inputData) => dispatch => {
    dispatch(updateDriverFilterData(inputData))
}





//                                                              buy and sell api's                                                                  //
//get all buy and sell api
export const handleGetBuyandSell = (params) => async (dispatch) => {
    try {
        dispatch(buyAndsellGetRequest())
        const { data } = await axiosInstance.post("/dashboard_buy_sell_details", params)

        if (data?.error_code === 0) {
            dispatch(buyAndsellGetResponse(data?.data))
        } else {
            dispatch(buyAndsellGetFailure()) 
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleOnchangeBuyAndSellVerify = (inputData) => dispatch => {
    dispatch(updateBuyAndSellVerifyData(inputData))
}

export const handleBuyAndSellInputOnChange = (inputData) => dispatch => {
    dispatch(updateBuyAndSellEditData(inputData))
}

export const handleOnchangeBuyAndSellFilter = (inputData) => dispatch => {
    dispatch(updateBuyAndSellFilterData(inputData))
}

