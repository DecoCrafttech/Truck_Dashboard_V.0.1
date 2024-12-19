import { handleValidation } from 'Actions/Common_actions/Common_action';
import axiosInstance from 'Services/axiosInstance';
import {
    crm_status_entry,

    getCrmDashboardRequest,
    getCrmDashboardResponse,
    getCrmDashboardFailure,

    getCrmModalRequest,
    getCrmModalResponse,
    getCrmModalFailure,

    updateCrmStatusEntryRequest,
    updateCrmStatusEntryResponse,
    updateCrmStatusEntryFailure,
} from 'Slices/Pages_slice/Crm_slice';

//                                                 crm status onChange                                                                 //
export const handleOnchangeCrmStatus = (ipData) => dispatch => {
    dispatch(crm_status_entry(ipData))
}


//                                                 Get Crm Dashboard endpoint                                                          //
export const handleGetCrmDashboard = (params) => async (dispatch) => {
    try {
        dispatch(getCrmDashboardRequest())

        const { data } = await axiosInstance.post(params?.endpoint, params?.data)
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

        const { data } = await axiosInstance.post("/get_crm_user_history", params)
        if (data?.error_code === 0) {
            dispatch(getCrmModalResponse(data?.data))
        } else {
            dispatch(getCrmModalFailure(data?.message))
        }
    } catch (Err) {
        dispatch(getCrmModalFailure(Err?.message))
    }
}


//                                                Crm modal status entry endpoint                                                     //
export const handleCrmModalEntry = (params) => async (dispatch) => {
    if (params?.crm_status &&
        params?.entry_date &&
        params?.message) {

        try {
            dispatch(updateCrmStatusEntryRequest())

            const { data } = await axiosInstance.post("/update_crm_history", params)
            if (data?.error_code === 0) {
                dispatch(updateCrmStatusEntryResponse(data?.data))
            } else {
                dispatch(updateCrmStatusEntryFailure(data?.message))
            }
        } catch (Err) {
            dispatch(updateCrmStatusEntryFailure(Err?.message))
        }
    } else {
        dispatch(handleValidation)
    }
}