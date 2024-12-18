import axiosInstance from 'Services/axiosInstance';
import {
    getCrmDashboardRequest,
    getCrmDashboardResponse,
    getCrmDashboardFailure,
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