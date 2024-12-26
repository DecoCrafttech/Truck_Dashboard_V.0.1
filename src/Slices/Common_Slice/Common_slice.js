import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import { getIndividualAnalyticsFailure, getIndividualAnalyticsRequest, getOverallAnalyticsRequest, resetOverallChartFilter } from "Slices/Pages_slice/Analytice_slice";
import { blogDeletionResponse, getBlogRequest, getBlogResponse, updateAddBlogResponse, updateBlogEditData, updateBlogModalType, updateDeleteBlog, updateEditBlog } from "Slices/Pages_slice/Blog_slice";
import { getCrmDashboardFailure, getCrmDashboardRequest, getCrmDashboardResponse, getCrmModalFailure, getCrmModalRequest, update_crm_status_entry_user_id, updateCrmStatusEntryFailure, updateCrmStatusEntryResponse } from "Slices/Pages_slice/Crm_slice";
import { getDashboardRequest, getDashboardResponse } from "Slices/Pages_slice/dashboard_slice";
import { getFeedbackFailure, getFeedbackRequest, getFeedbackResponse, updateFeedbackModal, updateFeedbackStatusFailure, updateFeedbackStatusResponse } from "Slices/Pages_slice/Feedback_slice";
import { buyAndsellDeleteFailure, buyAndsellDeleteResponse, buyAndsellGetRequest, buyAndsellGetResponse, buyAndsellImageDeleteFailure, buyAndsellPostFailure, buyAndsellPostResponse, driverGetRequest, driverGetResponse, DriverPostFailure, DriverPostRequest, initializeFilterDetails, LoadDeleteFailure, LoadDeleteResponse, loadGetRequest, loadGetResponse, LoadPostFailure, LoadPostRequest, MobileNumVerificationRequest, ResetbuyAndsellFilterData, ResetDriverFilterData, ResetLoadFilterData, ResetTruckFilterData, truckGetRequest, truckGetResponse, TruckPostFailure, TruckPostRequest, updateCreateModalDetails, updateDeleteDetails, updateEditDetails } from "Slices/Pages_slice/Services_slice";

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: {
        modalShow: false,
        canvasShow: false,
        isOnline: true,
        currentNavMenuIndex: 0,
        currentMenuName: '',
        innerWidth: 0,
        innerHeight: 0,
        buttonSpinner: false,

        //login states
        usernamee: '',
        passwordd: '',
        eyeOpen: false,
        validated: false,

        //token
        token: '',
        user_id: Cookies.get('user_id') ? Cookies.get('user_id') : '',

        //no of entries
        showing_entries: [10, 20, 50],
        pageSize: 10,
        entries_selected: false,

        //custom pagination 
        currentPage: 1,
        totalCount: 0,
        siblingCount: 1,

        //search 
        search_value: '',
        search_clicked: false,
        apply_filter: false,

        //apply filter
        apply_filter_clicked: false,
        apply_filter: false
    },
    reducers: {
        updateModalShow(state, actions) {
            return {
                ...state,
                modalShow: !state.modalShow
            }
        },
        updateCanvasShow(state, actions) {
            return {
                ...state,
                canvasShow: !state.canvasShow
            }
        },
        updateIsonline(state, action) {
            return {
                ...state,
                isOnline: action.payload
            }
        },
        updateCurrentNavMenuIndex(state, action) {
            return {
                ...state,
                currentMenuName: action.payload?.name,
            }
        },
        updateScreenCurrentDimension(state, action) {
            return {
                ...state,
                innerWidth: action.payload?.innerWidth,
                innerHeight: action.payload?.innerHeight
            }
        },

        //form validation
        updateValidation(state, actions) {
            return {
                ...state,
                validated: true
            }
        },
        resetValidation(state, action) {
            return {
                ...state,
                validated: false
            }
        },

        //login states
        updateLoginCredentials(state, action) {
            const type = Object.keys(action.payload)[0];
            switch (type) {
                case "username":
                    return {
                        ...state,
                        usernamee: action.payload?.username
                    }
                case "password":
                    return {
                        ...state,
                        passwordd: action.payload?.password
                    }
                default:
                    return
            }
        },
        updateEyeFunction(state, actions) {
            return {
                ...state,
                eyeOpen: !state.eyeOpen
            }
        },

        //api 
        loginRequest(state, actions) {
            return {
                ...state,
                buttonSpinner: true,
                token: null
            }
        },
        loginResponse(state, action) {
            if (action.payload?.data?.user_id) {
                // Cookies.set("token", action.payload?.data?.access_token)
                Cookies.set("user_id", action.payload?.data?.user_id)
            }

            return {
                ...state,
                buttonSpinner: false,
                eyeOpen: !state.eyeOpen,
                // token: action.payload?.data?.access_token,
                user_id: action.payload?.data?.user_id
            }
        },
        updateToast(state, action) {
            return {
                ...state,
                Err: action.payload.message,
                Toast_Type: action.payload.type,
                buttonSpinner: false
            }
        },


        //bearer token 
        updateToken(state, action) {
            if (action.payload) {
                Cookies.set("token", action.payload)
            }
            return {
                ...state,
                token: action.payload ? action.payload : ''
            }
        },
        updateRemoveToken(state, actions) {
            Cookies.remove("token")
            return {
                ...state,
                token: ''
            }
        },

        //clearing error states
        clearError(state, actions) {
            return {
                ...state,
                Err: null,
                Toast_Type: null
            }
        },


        //logout
        logout(state, actions) {
            Cookies.remove("token");
            Cookies.remove("user_id");
            return {
                ...state,
                token: '',
                usernamee: '',
                passwordd: '',
            }
        },

        updateEditedTrue(state, action) {
            return {
                ...state,
                edited: true
            }
        },
        updateEditedFalse(state, action) {
            return {
                ...state,
                edited: false
            }
        },

        //reset all menus
        updateResetAllMenus(state, action) {
            return {
                ...state,
                edited: false,
                validated: false,
                modalShow: false,
                pageSize: 10,
                currentPage: 1,
                entries_selected: false,
                search_value: '',
                search_clicked: false,
                apply_filter: false,
                apply_filter_clicked: false
            }
        },

        //pagination
        updatePaginationSize(state, action) {
            return {
                ...state,
                pageSize: action.payload
            }
        },
        updateCurrentPage(state, action) {
            return {
                ...state,
                currentPage: action.payload
            }
        },

        //search
        updateSearchValue(state, action) {
            return {
                ...state,
                search_value: action.payload,
                search_clicked: false
            }
        },
        clearSearch(state, action) {
            return {
                ...state,
                search_value: '',
                search_clicked: false
            }
        },
        updateSearchClickedTrue(state, action) {
            return {
                ...state,
                search_clicked: true,
                apply_filter: false,
                apply_filter_clicked: false,
                totalCount: 0,
                pageSize: 10,
                currentPage: 1
            }
        },
        updateSearchClickedFalse(state, action) {
            return {
                ...state,
                search_clicked: true
            }
        },

        //number of entries select
        updateEntriesCount(state, action) {
            return {
                ...state,
                currentPage: 1,
                pageSize: action.payload,
                entries_selected: true,
            }
        },

        //apply filter button click state
        updateApplyFilterClickedTrue(state, action) {
            return {
                ...state,
                apply_filter_clicked: true,
                apply_filter: true,
                search_clicked: false,
                totalCount: 0,
                pageSize: 10,
                currentPage: 1
            }
        },
        updateApplyFilterClickedFalse(state, action) {
            return {
                ...state,
                apply_filter_clicked: false,
                apply_filter: false
            }
        },

    },
    extraReducers: (builder) => {
        builder
            //dashboard
            .addCase(getDashboardRequest, (state, action) => {
                state.totalCount = 0
                state.pageSize = 10
                state.currentPage = 1
            })
            .addCase(getDashboardResponse, (state, action) => {
                state.totalCount = action.payload?.row_count
                state.apply_filter = false
                state.modalShow = false
            })

            //common 
            .addCase(MobileNumVerificationRequest, (state, action) => {
                state.validated = false
            })
            .addCase(updateCreateModalDetails, (state, action) => {
                state.validated = false
                state.modalShow = true
            })
            .addCase(updateDeleteDetails, (state, action) => {
                state.modalShow = true
            })
            .addCase(updateEditDetails, (state, action) => {
                state.modalShow = true
            })
            .addCase(initializeFilterDetails, (state, action) => {
                state.modalShow = true
            })


            //load
            .addCase(loadGetRequest, (state, action) => {
                state.totalCount = 0
                state.modalShow = false
                state.apply_filter = false
            })
            .addCase(loadGetResponse, (state, action) => {
                state.totalCount = action.payload?.total_no_of_data
            })
            .addCase(LoadPostRequest, (state, action) => {
                state.modalShow = false
                state.validated = false
            })
            .addCase(LoadPostFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(LoadDeleteResponse, (state, action) => {
                state.modalShow = false
            })
            .addCase(LoadDeleteFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(ResetLoadFilterData, (state, action) => {
                state.modalShow = false
                state.apply_filter_clicked = false
                state.apply_filter = false
            })



            //truck
            .addCase(truckGetRequest, (state, action) => {
                state.totalCount = 0
                state.apply_filter = false
                state.modalShow = false
            })
            .addCase(truckGetResponse, (state, action) => {
                state.totalCount = action.payload?.total_no_of_data
            })
            .addCase(TruckPostRequest, (state, action) => {
                state.modalShow = false
                state.validated = false
            })
            .addCase(TruckPostFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(ResetTruckFilterData, (state, action) => {
                state.modalShow = false
                state.apply_filter_clicked = false
                state.apply_filter = false
            })


            //driver
            .addCase(driverGetRequest, (state, action) => {
                state.totalCount = 0
                state.modalShow = false
                state.validated = false
            })
            .addCase(driverGetResponse, (state, action) => {
                state.totalCount = action.payload?.total_no_of_data
                state.apply_filter = false
                state.modalShow = false
            })
            .addCase(DriverPostRequest, (state, action) => {
                state.modalShow = false
                state.validated = false
            })
            .addCase(DriverPostFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(ResetDriverFilterData, (state, action) => {
                state.modalShow = false
                state.apply_filter_clicked = false
                state.apply_filter = false
            })


            //buy and sell
            .addCase(buyAndsellGetRequest, (state, action) => {
                state.totalCount = 0
                state.modalShow = false
                state.validated = false
            })
            .addCase(buyAndsellGetResponse, (state, action) => {
                state.totalCount = action.payload?.total_no_of_data
                state.apply_filter = false
                state.modalShow = false
            })
            .addCase(buyAndsellPostResponse, (state, action) => {
                state.modalShow = false
                state.validated = false
            })
            .addCase(buyAndsellPostFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(buyAndsellDeleteResponse, (state, action) => {
                state.modalShow = false
            })
            .addCase(buyAndsellDeleteFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(ResetbuyAndsellFilterData, (state, action) => {
                state.modalShow = false
                state.apply_filter_clicked = false
                state.apply_filter = false
            })

            //blog page
            .addCase(getBlogRequest, (state, action) => {
                state.totalCount = 0
            })
            .addCase(getBlogResponse, (state, action) => {
                state.totalCount = action.payload?.total_no_of_data
            })

            .addCase(updateBlogEditData, (state, action) => {
                state.validated = false
            })
            .addCase(updateBlogModalType, (state, action) => {
                state.modalShow = true
                state.validated = false
            })
            .addCase(updateEditBlog, (state, action) => {
                state.modalShow = true
                state.validated = false
            })
            .addCase(updateDeleteBlog, (state, action) => {
                state.modalShow = true
            })
            .addCase(updateAddBlogResponse, (state, action) => {
                state.modalShow = false
            })
            .addCase(buyAndsellImageDeleteFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })

            //blog
            .addCase(blogDeletionResponse, (state, action) => {
                state.modalShow = false
            })

            //feedback
            .addCase(getFeedbackRequest, (state, action) => {
                state.totalCount = 0
            })
            .addCase(getFeedbackFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(updateFeedbackModal, (state, action) => {
                state.modalShow = true
            })

            .addCase(updateFeedbackStatusResponse, (state, action) => {
                state.modalShow = false
            })
            .addCase(updateFeedbackStatusFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })

            //analytics
            .addCase(getOverallAnalyticsRequest, (state, action) => {
                state.modalShow = false
                state.apply_filter = false
                state.apply_filter_clicked = false
            })
            .addCase(getIndividualAnalyticsRequest, (state, action) => {
                state.modalShow = false
                state.apply_filter = false
                state.apply_filter_clicked = false
            })
            .addCase(resetOverallChartFilter, (state, action) => {
                state.modalShow = false
                state.apply_filter_clicked = false
                state.apply_filter = false
            })
            .addCase(getIndividualAnalyticsFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(getFeedbackResponse, (state, action) => {
                console.log(action.payload[0])
                state.totalCount = action.payload[0]?.total_no_of_data
            })


            //crm dashboard
            .addCase(getCrmModalRequest, (state, action) => {
                state.modalShow = true
            })
            .addCase(getCrmDashboardRequest, (state, action) => {
                state.totalCount = 0
            })
            .addCase(getCrmDashboardResponse, (state, action) => {
                state.totalCount = action.payload?.row_count
            })
            .addCase(getCrmDashboardFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(getCrmModalFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })
            .addCase(update_crm_status_entry_user_id, (state, action) => {
                state.modalShow = true
            })
            .addCase(updateCrmStatusEntryResponse, (state, action) => {
                state.modalShow = false
            })
            .addCase(updateCrmStatusEntryFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })

    }
})

const { actions, reducer } = commonSlice;

export const {
    updateModalShow,
    updateCanvasShow,
    updateIsonline,
    updateCurrentNavMenuIndex,
    updateScreenCurrentDimension,
    updateLoginCredentials,
    updateEyeFunction,
    clearError,
    updateResetAllMenus,

    resetValidation,
    updateValidation,

    loginRequest,
    loginResponse,
    updateToast,
    updateToken,
    updateRemoveToken,
    logout,


    updatePaginationSize,
    updateCurrentPage,
    updateSearchValue,
    clearSearch,
    updateSearchClickedTrue,
    updateSearchClickedFalse,
    updateApplyFilterClickedTrue,
    updateApplyFilterClickedFalse,

    updateEntriesCount
} = actions;

export default reducer