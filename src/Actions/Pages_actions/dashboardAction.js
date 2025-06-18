import axiosInstance from "Services/axiosInstance";
import { updateToast } from "Slices/Common_Slice/Common_slice";
import {
    getDashboardRequest,
    getDashboardResponse,
    getDashboardFailure,

    getDashboardProfileRequest,
    getDashboardProfileResponse,
    getDashboardProfileFailure,

    addVehicleRequest,
    addVehicleResponse,
    addVehicleFailure,

    removeVehicleRequest,
    removeVehicleResponse,
    removeVehicleFailure


} from "Slices/Pages_slice/dashboard_slice";

//get dashboard all user details
export const handleGetDashboard = (params) => async (dispatch) => {
    try {
        dispatch(getDashboardRequest())
        const { data } = await axiosInstance.post("/get_dashboard", params);

        if (data.error_code === 0) {
            dispatch(getDashboardResponse(data.data))
        } else {
            dispatch(getDashboardFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (Err) {
        dispatch(getDashboardFailure())
        dispatch(updateToast({ message: Err?.message, type: "error" }))
    }
}

//get single profile
export const handleGetDashboardProfile = (params) => async (dispatch) => {
    try {
        dispatch(getDashboardProfileRequest())
        const { data } = await axiosInstance.post("/get_dashboard_profile ", params);

        if (data.error_code === 0) {
            dispatch(getDashboardProfileResponse(data.data[0]))
        } else {
            dispatch(getDashboardProfileFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (Err) {
        dispatch(getDashboardProfileFailure())
        dispatch(updateToast({ message: Err?.message, type: "error" }))
    }
}

//Add vehicle
export const handleAddNewVehicle = (params) => async (dispatch) => {
    try {
        dispatch(addVehicleRequest())
        const { data } = await axiosInstance.post("/add_user_vehicle_details ", params);

        if (data.error_code === 0) {
            if (data.data[0]?.vehicle_data?.length) {
                dispatch(addVehicleResponse(data.data[0]))
            } else {
                dispatch(addVehicleFailure())
                dispatch(updateToast({ message: "Vehicle not found", type: "error" }))
            }
        } else {
            dispatch(addVehicleFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (Err) {
        dispatch(addVehicleFailure())
        dispatch(updateToast({ message: Err?.message, type: "error" }))
    }
}

//delete vehicle
export const handleDeleteVehicle = (params) => async (dispatch) => {
    try {
        dispatch(removeVehicleRequest(params))
        const { data } = await axiosInstance.post("/remove_user_vehicle_details", params);

        if (data.error_code === 0) {
            dispatch(removeVehicleResponse(params))
        } else {
            dispatch(removeVehicleFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (Err) {
        dispatch(removeVehicleFailure())
        dispatch(updateToast({ message: Err?.message, type: "error" }))
    }
}