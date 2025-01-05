import { handleValidation } from 'Actions/Common_actions/Common_action';
import axiosInstance from 'Services/axiosInstance';
import {
    crm_status_entry,
    crm_Before_Sale_entry_state,

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

export const handleOnchangeCrmBeforeSaleEntry = (ipData) => dispatch => {
    dispatch(crm_Before_Sale_entry_state(ipData))
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

        const { data } = await axiosInstance.post(params?.slected_button === "after_sale" ? "/get_crm_user_history" : "/get_crm_before_sale_status_history", params)
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
    if (params?.data?.crm_status &&
        params?.data?.entry_date &&
        params?.data?.message) {

        try {
            dispatch(updateCrmStatusEntryRequest())

            const { data } = await axiosInstance.post(params?.endpoint, params?.data)
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


//                                                Crm modal status entry endpoint                                                     //
export const handleCrmBeforeSaleEntry = (params) => async (dispatch) => {
    if (params?.name &&
        params?.email_id &&
        params?.email_id &&
        params?.location) {

        try {
            dispatch(updateCrmStatusEntryRequest())

            const { data } = await axiosInstance.post("/crm_before_sales_entry", params)
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