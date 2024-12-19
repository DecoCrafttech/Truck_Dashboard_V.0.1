import { createSlice } from "@reduxjs/toolkit";


const feedbackSlice = createSlice({
    name: "feedback_slice",
    initialState: {
        feeback_data: [],
        initialGlow: false,
        feedback_modal_data: {},
        feedback_modal_spinner: false,
        re_render: false
    },
    reducers: {
        updateFeedbackModal(state, action) {
            return {
                ...state,
                feedback_modal_data: action.payload?.data
            }
        },

        updateFeedbackOnChange(state, action) {
            return {
                ...state,
                feedback_modal_data: {
                    ...state,
                    ...action.payload
                }
            }
        },

        //get feedback
        getFeedbackRequest(state, action) {
            return {
                ...state,
                initialGlow: true
            }
        },
        getFeedbackResponse(state, action) {
            return {
                ...state,
                initialGlow: false,
                feeback_data: action.payload[0]?.feedback
            }
        },
        getFeedbackFailure(state, action) {
            return {
                ...state,
                initialGlow: false
            }
        },

        updateFeedbackStatusRequest(state, action) {
            return {
                ...state,
                feedback_modal_spinner: true
            }
        },
        updateFeedbackStatusResponse(state, action) {
            return {
                ...state,
                re_render: !state.re_render,
                feedback_modal_spinner: false
            }
        },
        updateFeedbackStatusFailure(state, action) {
            return {
                ...state,
                feedback_modal_spinner: false
            }
        }
    }
})

const { actions, reducer } = feedbackSlice;

export const {
    updateFeedbackModal,
    updateFeedbackOnChange,

    getFeedbackRequest,
    getFeedbackResponse,
    getFeedbackFailure,

    updateFeedbackStatusRequest,
    updateFeedbackStatusResponse,
    updateFeedbackStatusFailure,
} = actions;

export default reducer;