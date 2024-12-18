import { createSlice } from "@reduxjs/toolkit"


const crmSlice = createSlice({
    name: "crm_slice",
    initialState: {
        slected_button: "after_sale",
        initalGlow: false,
        crm_dashboard_data: []
    },
    reducers: {
        updateSelectedButton(state, action) {
            return {
                ...state,
                slected_button: action.payload
            }
        },

        //                                                     Get CRM Dashboard                                                       //
        getCrmDashboardRequest(state, action) {
            return {
                ...state,
                crm_dashboard_data:[],
                slected_button: "after_sale",
                initalGlow: true
            }
        },
        getCrmDashboardResponse(state, action) {
            return {
                ...state,
                crm_dashboard_data: action.payload?.profile,
                initalGlow: false
            }
        },
        getCrmDashboardFailure(state, action) {
            return {
                ...state,
                initalGlow: false
            }
        }
    }
})

const { actions, reducer } = crmSlice;

export const {
    updateSelectedButton,
    getCrmDashboardRequest,
    getCrmDashboardResponse,
    getCrmDashboardFailure,

} = actions;

export default reducer;