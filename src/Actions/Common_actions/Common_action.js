import axios from 'axios';
import axiosInstance from 'Services/axiosInstance';
import {
    updateModalShow,
    updateCanvasShow,
    updateIsonline,
    updateCurrentNavMenuIndex,
    updateScreenCurrentDimension,
    updateLoginCredentials,
    updateEyeFunction,

    clearError,
    resetValidation,
    updateValidation, 

    loginRequest,
    loginResponse,
    upateFailure,
    updateToken,
    updateRemoveToken,
    logout,
 
    updateResetAllMenus
} from 'Slices/Common_Slice/Common_slice'; 


export const handleUpdateModalShow = (dispatch) => {
    dispatch(updateModalShow())
}

export const handleUpdateCanvasShow = (dispatch) => {
    dispatch(updateCanvasShow())
}

export const handleOnlineOffilne = (isOnline) => dispatch => {
    dispatch(updateIsonline(isOnline))
}

export const handleCurrentMenuInd = (menus, myCurrPath) => dispatch => {
    if (myCurrPath) {
        const currInd = menus.filter((v) => myCurrPath === v.route_name ? v : null)
        dispatch(updateCurrentNavMenuIndex({ ind: currInd[0]?.in, name: currInd[0]?.name }))
    } else {
        dispatch(updateCurrentNavMenuIndex({ ind: 0, name: 'Home' }))
    }
}

export const handleScreenSize = (currentSize) => (dispatch) => {
    dispatch(updateScreenCurrentDimension(currentSize))
}

export const handleLoginCredentials = (data) => (dispatch) => {
    dispatch(updateLoginCredentials(data))
}

export const handleEyeFunction = () => dispatch => {
    dispatch(updateEyeFunction())
}

export const handleClearErrors = dispatch => {
    dispatch(clearError())
}

export const handleValidation = dispatch => {
    dispatch(updateValidation())
}

export const handleResetValidation = dispatch => {
    dispatch(resetValidation())
}

// login api 
export const handleLogin = (basicAuth) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/login`,
            {
                headers: {
                    Authorization: basicAuth,
                },
            }
        );

        if (data.error_code === 200) {
            dispatch(loginResponse(data))
        } else {
            dispatch(upateFailure(data?.message))
        }
    } catch (err) {
        dispatch(upateFailure(err?.message))
    }
}

export const handleBearerToken = (token) => dispatch => {
    dispatch(updateToken(token))
}

export const handleLogout = () => dispatch => {
    dispatch(logout())
}

//refresh token
export const handlerefreshToken = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get("/refresh_token")
        if (data?.error_code === 200) {
            dispatch(updateToken(data?.data?.access_token))
        } else {
            dispatch(updateRemoveToken())
        }
    } catch (err) {
        dispatch(upateFailure(err?.message))
    }
}

//reset all 
export const handleResetAlMenus = dispatch => {
    dispatch(updateResetAllMenus())
}
