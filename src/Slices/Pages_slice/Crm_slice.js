import { createSlice } from "@reduxjs/toolkit"


const crmSlice = createSlice({
    name: "crm_slice",
    initialState: {
        slected_button: "after_sale",
        crm_modal_glow: false,
        crm_user_id: null,
        crm_view_data: [],

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
        updateCrmViewModal(state, action) {
            return {
                ...state,
                crm_user_id: action.payload
            }
        },


        //                                                     Get CRM Dashboard                                                       //
        getCrmDashboardRequest(state, action) {
            return {
                ...state,
                crm_dashboard_data: [],
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
        },



        //                                                     Get CRM modal                                                       //
        getCrmModalRequest(state, action) {
            return {
                ...state,
                crm_modal_glow: true
            }
        },
        getCrmModalResponse(state, action) {
            return {
                ...state,
                crm_view_data: action.payload?.profile,
                crm_modal_glow: false
            }
        },
        getCrmModalFailure(state, action) {
            return {
                ...state,
                crm_modal_glow: false
            }
        }
    }
})

const { actions, reducer } = crmSlice;

export const {
    updateSelectedButton,
    updateCrmViewModal,

    getCrmDashboardRequest,
    getCrmDashboardResponse,
    getCrmDashboardFailure,

    getCrmModalRequest,
    getCrmModalResponse,
    getCrmModalFailure,
} = actions;

export default reducer;