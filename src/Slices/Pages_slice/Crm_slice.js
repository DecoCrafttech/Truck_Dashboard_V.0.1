import { createSlice } from "@reduxjs/toolkit"


const crmSlice = createSlice({
    name: "crm_slice",
    initialState: {
        slected_button: "after_sale",
        crm_modal_glow: false,
        crm_view_data: [],

        initalGlow: false,
        crm_dashboard_data: [],

        crm_status_entry_spinner: false,
        crm_status_entry: {},

        recall_again: false
    },
    reducers: {
        updateSelectedButton(state, action) {
            return {
                ...state,
                slected_button: action.payload
            }
        },
        crm_status_entry(state, action) {
            return {
                ...state,
                crm_status_entry: {
                    ...state?.crm_status_entry,
                    ...action.payload
                }
            }
        },
        update_crm_status_entry_user_id(state, action) {
            return {
                ...state,
                crm_status_entry: {
                    user_id: action.payload
                }
            }
        },

        //                                                     Get CRM Dashboard                                                       //
        getCrmDashboardRequest(state, action) {
            return {
                ...state,
                crm_dashboard_data: [],
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
                crm_view_data: action.payload,
                crm_modal_glow: false
            }
        },
        getCrmModalFailure(state, action) {
            return {
                ...state,
                crm_modal_glow: false
            }
        },


        //                                                     CRM Status Entry                                                       //
        updateCrmStatusEntryRequest(state, action) {
            return {
                ...state,
                crm_status_entry_spinner: true
            }
        },
        updateCrmStatusEntryResponse(state, action) {
            return {
                ...state,
                crm_status_entry_spinner: false,
                recall_again: !state?.recall_again
            }
        },
        updateCrmStatusEntryFailure(state, action) {
            return {
                ...state,
                crm_status_entry_spinner: false
            }
        }
    }
})

const { actions, reducer } = crmSlice;

export const {
    updateSelectedButton,
    crm_status_entry,
    update_crm_status_entry_user_id,

    getCrmDashboardRequest,
    getCrmDashboardResponse,
    getCrmDashboardFailure,

    getCrmModalRequest,
    getCrmModalResponse,
    getCrmModalFailure,

    updateCrmStatusEntryRequest,
    updateCrmStatusEntryResponse,
    updateCrmStatusEntryFailure,
} = actions;

export default reducer;