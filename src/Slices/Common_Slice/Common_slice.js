import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import { initializeFilterDetails, truckGetResponse } from "Slices/Pages_slice/Services_slice";

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
            if (action.payload?.data?.access_token) {
                Cookies.set("token", action.payload?.data?.access_token)
                Cookies.set("user_id", action.payload?.data?.user_id)
            }

            return {
                ...state,
                buttonSpinner: false,
                eyeOpen: !state.eyeOpen,
                token: action.payload?.data?.access_token,
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
                nextButton: false,
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
                apply_filter_clicked: false
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
                search_clicked: false
            }
        },

        //apply filter button click state
        updateApplyFilterClickedTrue(state, action) {
            return {
                ...state,
                apply_filter_clicked: true,
                apply_filter: true,
                search_clicked: false
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
            .addCase(truckGetResponse, (state, action) => {
                state.totalCount = action.payload?.total_no_of_data
                state.apply_filter = false
                state.modalShow = false
            })
        // .addCase(initializeFilterDetails, (state, action) => {
        //     state.apply_filter_clicked = false
        //     state.apply_filter = false
        // })  
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