import axiosInstance from "Services/axiosInstance";
import { updateToast } from "Slices/Common_Slice/Common_slice";
import {
    getDashboardRequest,
    getDashboardResponse,
    getDashboardFailure,
    getDashboardProfileRequest,
    getDashboardProfileResponse,
    getDashboardProfileFailure

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
            dispatch(updateToast(data?.message, "error"))
        }
    } catch (Err) {
        dispatch(getDashboardFailure())
        dispatch(updateToast(Err?.message, "error"))
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
            dispatch(updateToast(data?.message, "error"))
        }
    } catch (Err) {
        dispatch(getDashboardProfileFailure())
        dispatch(updateToast(Err?.message, "error"))
    }
}