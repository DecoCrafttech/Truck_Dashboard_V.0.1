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
    updateToast,
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
        let found = false; 
        
        menus.forEach((value) => {
            console.log(myCurrPath , value?.route_name)
            if (value?.options) {
                value.options.forEach((nestedValue) => {
                    if (myCurrPath === nestedValue.route_name) {
                        dispatch(updateCurrentNavMenuIndex({ name: nestedValue?.name }));
                        found = true;
                    }
                });
            } else if (myCurrPath === value?.route_name) {
                console.log(myCurrPath , value?.route_name)
                dispatch(updateCurrentNavMenuIndex({ name: value?.name }));
                found = true;
            }
        });

        if (!found) {
            dispatch(updateCurrentNavMenuIndex({ name: 'Home' }));
        }
    } else {
        dispatch(updateCurrentNavMenuIndex({ name: 'Home' }));
    }
};


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
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard_login`, {}, {
            auth: basicAuth,
        });

        if (data.error_code === 0) {
            dispatch(loginResponse(data))
        } else {
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
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
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

//reset all 
export const handleResetAlMenus = dispatch => {
    dispatch(updateResetAllMenus())
}