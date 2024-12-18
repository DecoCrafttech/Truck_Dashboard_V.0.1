import axiosInstance from 'Services/axiosInstance';
import {
    getCrmDashboardRequest,
    getCrmDashboardResponse,
    getCrmDashboardFailure,

    getCrmModalRequest,
    getCrmModalResponse,
    getCrmModalFailure,
} from 'Slices/Pages_slice/Crm_slice';


//                                                 Get Crm Dashboard endpoint                                                          //
export const handleGetCrmDashboard = (params) => async (dispatch) => {
    try {
        dispatch(getCrmDashboardRequest())

        const { data } = await axiosInstance.post("/get_crm_dashboard", params)
        if (data?.error_code === 0) {
            dispatch(getCrmDashboardResponse(data?.data))
        } else {
            dispatch(getCrmDashboardFailure(data?.message))
        }
    } catch (Err) {
        dispatch(getCrmDashboardFailure(Err?.message))
    }
} 


//                                                 Get Crm modal endpoint                                                          //
export const handleGetCrmModal = (params) => async (dispatch) => {
    try {
        dispatch(getCrmModalRequest())

        const { data } = await axiosInstance.post("/get_crm_dashboard", params)
        if (data?.error_code === 0) {
            dispatch(getCrmModalResponse(data?.data))
        } else {
            dispatch(getCrmModalFailure(data?.message))
        }
    } catch (Err) {
        dispatch(getCrmModalFailure(Err?.message))
    }
} 