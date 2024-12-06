import axiosInstance from 'Services/axiosInstance';
import { updateModalShow, updateToast } from 'Slices/Common_Slice/Common_slice';
import {
    updateEditDetails,
    updateDeleteDetails,
    updateCreateModalDetails,
    initializeFilterDetails,

    loadGetRequest,
    loadGetResponse,
    loadGetFaliure,
    updateLoadVerifyData,
    updateLoadEditData,
    updateLoadFilterData,
    LoadMobileNumVerificationRequest,
    LoadMobileNumVerificationResponse,
    LoadMobileNumVerificationFailure,

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

export const handleCreateModal = (from, type) => dispatch => {
    dispatch(updateCreateModalDetails({ from, type }))
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

export const handleFilterModal = (from, type) => dispatch => {
    dispatch(initializeFilterDetails({ from, type }))
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
export const handlePostLoadsVerification = (phone_number) => async (dispatch) => {
    if (phone_number) {
        if (phone_number?.length === 10) {
            try {
                dispatch(LoadMobileNumVerificationRequest())
                const { data } = await axiosInstance.post("/get_user_details", { phone_number })

                if (data?.error_code === 0) {
                    dispatch(LoadMobileNumVerificationResponse(data?.data))
                } else {
                    dispatch(LoadMobileNumVerificationFailure())
                    dispatch(updateToast({ message: data?.message, type: "error" }))
                }

            } catch (err) {
                dispatch(LoadMobileNumVerificationFailure())
                dispatch(updateToast({ message: err?.message, type: "error" }))
            }
        } else {
            dispatch(updateToast({ message: "Invalid Mobile number ", type: "error" }))
        }
    } else {
        dispatch(updateToast({ message: "Mobile number required ", type: "error" }))
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

