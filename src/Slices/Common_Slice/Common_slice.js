import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const commonSlice = createSlice({
    name: 'common slice',
    initialState: {
        modalShow: false,
        canvasShow: false,
        isOnline: true,
        currentNavMenuIndex: 0,
        currentMenuName: '',
        innerWidth: 0,
        innerHeight: 0,
        buttonSpinner: false,
        stagesCompetedUpto: 0,

        //login states
        usernamee: '',
        passwordd: '',
        eyeOpen: false,
        validated: false,

        //token
        token: Cookies.get('token'),
        user_id: Cookies.get('user_id'),
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
                currentNavMenuIndex: action.payload?.ind,
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
        upateFailure(state, action) {
            return {
                ...state,
                Err: action.payload,
                Toast_Type:"error",
                buttonSpinner: false
            }
        },


        //bearer token 
        updateToken(state, action) {
            Cookies.set("token", action.payload)
            return {
                ...state,
                token: action.payload
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
                Toast_Type:null
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
                modalShow: false
            }
        },
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
    updateLoginError,
    clearError,

    resetValidation,
    updateValidation,

    loginRequest,
    loginResponse,
    upateFailure,
    updateToken,
    updateRemoveToken,
    logout,

    getallclientsRequest,
    getallclientsResponse,

    selectedClient,
    resetSelectedClient,
    updateClientId,
    updateEditId,
    clearEditId,

    updateNextButton,
    updateEditedTrue,
    updateEditedFalse,

    updateResetAllMenus,
    submittedTrue,
    submittedFalse
} = actions;

export default reducer