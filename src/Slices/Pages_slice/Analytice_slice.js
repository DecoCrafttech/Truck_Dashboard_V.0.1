import { createSlice } from "@reduxjs/toolkit";

const analyticsSlice = createSlice({
    name: "analytics_slice",
    initialState: {
        initialGlow: true,
        overall_analytics_data: [],
        selected_analytics_glow: false,
        selected_Line_chart: "Load",
        selected_analytics_data: [],
        report_getting_date: ""
    },
    reducers: {
        updateSelectedLineChart(state, action) {
            return {
                ...state,
                selected_Line_chart: action.payload,
                report_getting_date:''
            }
        },
        updateReportDate(state, action) {
            return {
                ...state,
                report_getting_date: action.payload
            }
        },

        //get individual analytics
        getIndividualAnalyticsRequest(state, action) {
            return {
                ...state,
                selected_analytics_data: [],
                selected_analytics_glow: true
            }
        },
        getIndividualAnalyticsResponse(state, action) {
            return {
                ...state,
                selected_analytics_data: action?.payload,
                selected_analytics_glow: false
            }
        },
        getIndividualAnalyticsFailure(state, action) {
            return {
                ...state,
                selected_analytics_glow: false
            }
        }
    }
})

const { actions, reducer } = analyticsSlice;

export const {
    updateSelectedLineChart,
    updateReportDate,

    getIndividualAnalyticsRequest,
    getIndividualAnalyticsResponse,
    getIndividualAnalyticsFailure,

} = actions;

export default reducer;