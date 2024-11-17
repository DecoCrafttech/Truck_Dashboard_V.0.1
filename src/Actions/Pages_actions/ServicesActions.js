import axiosInstance from 'Services/axiosInstance';
import { updateToast } from 'Slices/Common_Slice/Common_slice';
import {
    loadGetRequest,
    loadGetResponse,
    truckGetRequest,
    truckGetResponse,
    driverGetRequest,
    driverGetResponse

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
            dispatch(updateToast(data?.message, "error"))
        }
    } catch (err) {
        dispatch(updateToast(err?.message, "error"))
    }
}
