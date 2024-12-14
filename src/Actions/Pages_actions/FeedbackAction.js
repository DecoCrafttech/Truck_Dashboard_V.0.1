import { handleValidation } from "Actions/Common_actions/Common_action";
import axiosInstance from "Services/axiosInstance";
import {
    getFeedbackRequest,
    getFeedbackResponse,
    getFeedbackFailure,

    updateFeedbackOnChange,

    updateFeedbackStatusRequest,
    updateFeedbackStatusResponse,
    updateFeedbackStatusFailure,
} from "Slices/Pages_slice/Feedback_slice";

//get feedback
export const handleGetFeedbackComplaints = (params) => async (dispatch) => {
    try {
        dispatch(getFeedbackRequest())
        const { data } = await axiosInstance.post("/dashboard_feedback_complaint_data", params)

        if (data?.error_code === 0) {
            dispatch(getFeedbackResponse(data?.data))
        } else {
            dispatch(getFeedbackFailure(data?.message))
        }
    } catch (Err) {
        dispatch(getFeedbackFailure(Err?.message))
    }
}


//onchange fedback
export const handleFeedbackModalOnChange = (ipValue) => dispatch => {
    dispatch(updateFeedbackOnChange(ipValue))
}


//update feedack
export const handleUpdateFeedbackComplaints = (complaintData) => async (dispatch) => {
    if (complaintData?.remarks) {
        const params = {
            complaint_id: complaintData?.complaint_id,
            complaint_status: "solved",
            remarks: complaintData?.remarks
        }

        try {
            dispatch(updateFeedbackStatusRequest())
            const { data } = await axiosInstance.post("/update_complaints_status", params)

            if (data?.error_code === 0) {
                dispatch(updateFeedbackStatusResponse(data?.message))
            } else {
                dispatch(updateFeedbackStatusFailure(data?.message))
            }
        } catch (Err) {
            dispatch(updateFeedbackStatusFailure(Err?.message))
        }
    } else {
        dispatch(handleValidation)
    }
}