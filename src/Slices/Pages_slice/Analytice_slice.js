import { createSlice } from "@reduxjs/toolkit";
import { initializeFilterDetails } from "./Services_slice";

const analyticsSlice = createSlice({
    name: "analytics_slice",
    initialState: {
        initialGlow: true,

        overall_chart: "today",
        overall_analytics_select_box_data: [{ value: 1, label: 'today' }],
        overall_analytics_data: {},
        clear_filter: false,
        overall_chart_filter: {
            from_date: new Date().toISOString().split('T')[0],
            to_date: new Date().toISOString().split('T')[0]
        },

        selected_analytics_glow: false,
        selected_Line_chart: "Load",
        selected_analytics_data: {},
        report_getting_date: new Date().toISOString().split('T')[0],
    },
    reducers: {
        updateOverallChartFilter(state, action) {
            return {
                ...state,
                overall_chart_filter: {
                    ...state?.overall_chart_filter,
                    ...action.payload
                }
            }
        },
        updateSelectedLineChart(state, action) {
            return {
                ...state,
                selected_Line_chart: action.payload,
                report_getting_date: new Date().toISOString().split('T')[0]
            }
        },
        updateReportDate(state, action) {
            return {
                ...state,
                report_getting_date: action.payload,
            }
        },
        updateOverallAnalysis(state, action) {
            const labelData = action.payload[0]?.label
            return {
                ...state,
                overall_chart: labelData,
                overall_analytics_select_box_data: action.payload
            }
        },
        resetOverallChartFilter(state, action) {
            return {
                ...state,
                overall_chart_filter: {
                    from_date: new Date().toISOString().split('T')[0],
                    to_date: new Date().toISOString().split('T')[0]
                },
                selected_Line_chart: "Overall",
                clear_filter: true
            }
        },


        //get overall analytics
        getOverallAnalyticsRequest(state, action) {
            return {
                ...state,
                overall_analytics_data: [],
                initialGlow: true
            }
        },
        getOverallAnalyticsResponse(state, action) {
            return {
                ...state,
                overall_analytics_data: action?.payload,
                initialGlow: false,
                selected_Line_chart: "Load",
                clear_filter: false
            }
        },
        getOverallAnalyticsFailure(state, action) {
            return {
                ...state,
                initialGlow: false,
                selected_Line_chart: "Load",
                clear_filter: false
            }
        },

        //get individual analytics
        getIndividualAnalyticsRequest(state, action) {
            return {
                ...state,
                selected_analytics_data: {},
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeFilterDetails, (state, action) => {
                state.selected_Line_chart = action?.payload?.from
            })
    }
})

const { actions, reducer } = analyticsSlice;

export const {
    updateOverallChartFilter,
    updateSelectedLineChart,
    updateReportDate,
    updateOverallAnalysis,
    resetOverallChartFilter,

    getOverallAnalyticsRequest,
    getOverallAnalyticsResponse,
    getOverallAnalyticsFailure,

    getIndividualAnalyticsRequest,
    getIndividualAnalyticsResponse,
    getIndividualAnalyticsFailure,

} = actions;

export default reducer;