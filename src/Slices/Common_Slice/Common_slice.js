import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import { getIndividualAnalyticsFailure, getIndividualAnalyticsRequest, getOverallAnalyticsRequest, resetOverallChartFilter } from "Slices/Pages_slice/Analytice_slice";
import { blogDeletionResponse, getBlogRequest, getBlogResponse, updateAddBlogResponse, updateBlogEditData, updateBlogModalType, updateDeleteBlog, updateEditBlog } from "Slices/Pages_slice/Blog_slice";
import { getCrmDashboardFailure, getCrmDashboardRequest, getCrmDashboardResponse, getCrmModalFailure, getCrmModalRequest, update_crm_status_entry_user_id, updateCrmStatusEntryFailure, updateCrmStatusEntryResponse, updateSelectedButton } from "Slices/Pages_slice/Crm_slice";
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
        user_id: Cookies.get('user_id') || '',
        user_role: Cookies.get('user_role') || '',

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
        search: false,
        apply_filter: false,

        //apply filter
        apply_filter: false,

        menuOptions: [],
        re_render: true
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
                pageSize: 10,
                currentPage: 1,
                re_render: true,
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

            if (action.payload?.data?.user_role) {
                // Cookies.set("token", action.payload?.data?.access_token)
                Cookies.set("user_role", action.payload?.data?.user_role)
            }

            return {
                ...state,
                buttonSpinner: false,
                eyeOpen: !state.eyeOpen,
                // token: action.payload?.data?.access_token,
                user_id: action.payload?.data?.user_id,
                user_role: action.payload?.data?.user_role
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
            Cookies.remove("user_role");

            return {
                ...state,
                token: '',
                usernamee: '',
                passwordd: '',
                user_id: '',
                user_role: '',
                currentMenuName: ''
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
                search: false,
                apply_filter: false,
                re_render: true,
            }
        },

        //pagination
        updatePaginationSize(state, action) {
            return {
                ...state,
                pageSize: action.payload,
                re_render: true
            }
        },
        updateCurrentPage(state, action) {
            return {
                ...state,
                currentPage: action.payload,
                re_render: true
            }
        },

        //search
        updateSearchValue(state, action) {
            return {
                ...state,
                search_value: action.payload,
            }
        },
        clearSearch(state, action) {
            return {
                ...state,
                search_value: '',
                search: false,
                re_render: true,
                pageSize: 10,
                currentPage: 1
            }
        },
        updateSearchClickedTrue(state, action) {
            return {
                ...state,
                re_render: true,
                search: true,
                totalCount: 0,
                pageSize: 10,
                currentPage: 1
            }
        },
        updateSearchClickedFalse(state, action) {
            return {
                ...state,
                search_clicked: false,
                re_render: true,
                search: false,
                pageSize: 10,
                currentPage: 1
            }
        },

        //number of entries select
        updateEntriesCount(state, action) {
            return {
                ...state,
                currentPage: 1,
                pageSize: action.payload,
                entries_selected: true,
                re_render: true
            }
        },

        //apply filter button click state
        updateApplyFilterClickedTrue(state, action) {
            return {
                ...state,
                apply_filter: true,
                re_render: true,
                totalCount: 0,
                pageSize: 10,
                currentPage: 1
            }
        },
        updateApplyFilterClickedFalse(state, action) {
            return {
                ...state,
                apply_filter: false,
                re_render: true,
            }
        },

        updateMenuOptions(state, action) {
            return {
                ...state,
                menuOptions: action.payload
            }
        }

    },
    extraReducers: (builder) => {
        builder
            //dashboard
            .addCase(getDashboardRequest, (state, action) => {
                state.totalCount = 0
            })
            .addCase(getDashboardResponse, (state, action) => {
                state.totalCount = action.payload?.row_count ? parseInt(action.payload?.row_count) : 0
                state.re_render = false
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

            //truck
            .addCase(truckGetRequest, (state, action) => {
                state.totalCount = 0
                state.modalShow = false
            }) 
            .addCase(TruckPostRequest, (state, action) => {
                state.modalShow = false
                state.validated = false
            })
            .addCase(TruckPostFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })

            //driver
            .addCase(driverGetRequest, (state, action) => {
                state.totalCount = 0
                state.modalShow = false
                state.validated = false
            })
            .addCase(DriverPostRequest, (state, action) => {
                state.modalShow = false
                state.validated = false
            })
            .addCase(DriverPostFailure, (state, action) => {
                state.Err = action.payload
                state.Toast_Type = "error"
            })

            //buy and sell
            .addCase(buyAndsellGetRequest, (state, action) => {
                state.totalCount = 0
                state.modalShow = false
                state.validated = false
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

            //blog page
            .addCase(getBlogRequest, (state, action) => {
                state.totalCount = 0
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
                state.re_render = false
                state.totalCount = action.payload[0]?.total_no_of_data ? parseInt(action.payload[0]?.total_no_of_data) : 0

            })


            //crm dashboard 
            .addCase(getCrmModalRequest, (state, action) => {
                state.modalShow = true
            })
            .addCase(getCrmDashboardRequest, (state, action) => {
                state.totalCount = 0
            })
            .addCase(getCrmDashboardResponse, (state, action) => {
                state.re_render = false
                state.totalCount = action.payload?.row_count ? parseInt(action.payload?.row_count) : 0
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

            .addMatcher(
                (action) => [
                    getBlogResponse.toString(),
                    driverGetResponse.toString(),
                    loadGetResponse.toString(),
                    truckGetResponse.toString(),
                    buyAndsellGetResponse.toString(),

                ].includes(action.type),
                (state, action) => {
                    state.re_render = false
                    state.totalCount = action.payload?.total_no_of_data ? parseInt(action.payload?.total_no_of_data) : 0
                }
            )

            .addMatcher(
                (action) => [
                    updateSelectedButton.toString(),
                    ResetbuyAndsellFilterData.toString(),
                    ResetDriverFilterData.toString(),
                    ResetTruckFilterData.toString(),
                    ResetLoadFilterData.toString()

                ].includes(action.type),
                (state) => {
                    state.pageSize = 10
                    state.currentPage = 1
                    state.search_value = ''
                    state.search = false
                    state.re_render = true
                    state.apply_filter = false
                }
            )
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

    updateEntriesCount,
    updateMenuOptions
} = actions;

export default reducer