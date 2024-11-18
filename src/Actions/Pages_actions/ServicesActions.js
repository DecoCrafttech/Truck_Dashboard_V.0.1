import axiosInstance from 'Services/axiosInstance';
import { updateToast } from 'Slices/Common_Slice/Common_slice';
import {
    loadGetRequest,
    loadGetResponse,
    loadGetFaliure,


    truckGetRequest,
    truckGetResponse,
    truckGetFailure,


    driverGetRequest,
    driverGetResponse,
    driverGetFailure,


    buyAndsellGetRequest,
    buyAndsellGetResponse,
    buyAndsellGetFailure


} from 'Slices/Pages_slice/Services_slice';

//                                                              load api's                                                                  //
//get all loads api
export const handleGetLoads = async (dispatch) => {
    try {
        dispatch(loadGetRequest())
        const { data } = await axiosInstance.get("/all_load_details")

        if (data?.error_code === 0) {
            dispatch(loadGetResponse(data?.data))
        } else {
            dispatch(loadGetFaliure())
            dispatch(updateToast(data?.message, "error"))
        }
    } catch (err) {
        dispatch(updateToast(err?.message, "error"))
    }
}







//                                                              truck api's                                                                  //
//get all loads api
export const handleGetTruck = async (dispatch) => {
    try {
        dispatch(truckGetRequest())
        const { data } = await axiosInstance.get("/all_truck_details")

        if (data?.error_code === 0) {
            dispatch(truckGetResponse(data?.data))
        } else {
            dispatch(truckGetFailure())
            dispatch(updateToast(data?.message, "error"))
        }
    } catch (err) {
        dispatch(updateToast(err?.message, "error"))
    }
}










//                                                              driver api's                                                                  //
//get all loads api
export const handleGetDriver = async (dispatch) => {
    try {
        dispatch(driverGetRequest())
        const { data } = await axiosInstance.get("/all_driver_details")

        if (data?.error_code === 0) {
            dispatch(driverGetResponse(data?.data))
        } else {
            dispatch(driverGetFailure())
            dispatch(updateToast(data?.message, "error"))
        }
    } catch (err) {
        dispatch(updateToast(err?.message, "error"))
    }
}









//                                                              buy and sell api's                                                                  //
//get all buy and sell api
export const handleGetBuyandSell = async (dispatch) => {
    try {
        dispatch(buyAndsellGetRequest())
        const { data } = await axiosInstance.get("/all_buy_sell_details")

        if (data?.error_code === 0) {
            dispatch(buyAndsellGetResponse(data?.data))
        } else {
            dispatch(buyAndsellGetFailure())
            dispatch(updateToast(data?.message, "error"))
        }
    } catch (err) {
        dispatch(updateToast(err?.message, "error"))
    }
}