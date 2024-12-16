import { handleResetValidation, handleValidation } from 'Actions/Common_actions/Common_action';
import axiosInstance from 'Services/axiosInstance';
import { updateToast } from 'Slices/Common_Slice/Common_slice';
import {
    updateEditDetails,
    updateDeleteDetails,
    updateCreateModalDetails,
    initializeFilterDetails,
    MobileNumVerificationRequest,
    MobileNumVerificationResponse,
    MobileNumVerificationFailure,
    updateVerifyMobileNumberData,
    updateUserVehicleList,

    loadGetRequest,
    loadGetResponse,
    loadGetFaliure,
    updateLoadEditData,
    updateLoadFilterData,
    LoadPostRequest,
    LoadPostResponse,
    LoadPostFailure,
    LoadDeleteRequest,
    LoadDeleteResponse,
    LoadDeleteFailure,

    truckGetRequest,
    truckGetResponse,
    truckGetFailure,
    updateTruckEditData,
    updateTruckFilterData,
    TruckPostRequest,
    TruckPostResponse,
    TruckPostFailure,
    TruckDeleteRequest,
    TruckDeleteResponse,
    TruckDeleteFailure,

    driverGetRequest,
    driverGetResponse,
    driverGetFailure,
    updateDriverEditData,
    updateDriverFilterData,
    DriverPostRequest,
    DriverPostResponse,
    DriverPostFailure,
    DriverDeleteRequest,
    DriverDeleteResponse,
    DriverDeleteFailure,


    buyAndsellGetRequest,
    buyAndsellGetResponse,
    buyAndsellGetFailure,
    updateBuyAndSellEditData,
    updateBuyAndSellFilterData,
    buyAndsellPostRequest,
    buyAndsellPostResponse,
    buyAndsellPostFailure,
    buyAndsellDeleteRequest,
    buyAndsellDeleteResponse,
    buyAndsellDeleteFailure,


} from 'Slices/Pages_slice/Services_slice';

export const handleCreateModal = (from, type) => dispatch => {
    dispatch(updateCreateModalDetails({ from, type }))
}

export const handleDeleteModal = deleteData => dispatch => {
    dispatch(updateDeleteDetails(deleteData))
}

export const handleEditModal = editData => async (dispatch) => {
    if (editData?.from === "Truck" || editData?.from === "Driver" || editData?.from === "BuyAndSell") {
        dispatch(getUserVehicleList({ user_id: editData?.data?.user_id, editData }))
    } else {
        dispatch(updateEditDetails(editData))
    }
}

export const handleFilterModal = (from, type) => dispatch => {
    dispatch(initializeFilterDetails({ from, type }))
}

export const handleOnchangeVerifyMobileNumber = (inputData) => dispatch => {
    dispatch(updateVerifyMobileNumberData(inputData))
}

const getUserVehicleList = (params) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/get_user_vehicle_list", { user_id: params?.user_id })
        if (response?.data?.error_code === 0) {
            if (response?.data?.data[0]?.vehicle_list?.length) {
                dispatch(updateUserVehicleList(response?.data?.data))
                dispatch(updateEditDetails(params?.editData))
            } else {
                dispatch(updateToast({ message: response?.data?.message, type: "error" }))
            }
        } else {
            dispatch(updateToast({ message: response?.data?.message, type: "error" }))
        }
    } catch (Err) {
        dispatch(updateToast({ message: Err?.message, type: "error" }))
    }
}

//post mobile number verification
export const handlePostVerification = (servicesState) => async (dispatch) => {
    if (servicesState?.phone_number) {
        if (servicesState?.phone_number?.length === 10) {
            try {
                dispatch(MobileNumVerificationRequest())
                const { data } = await axiosInstance.post("/get_user_details", { phone_number: servicesState?.phone_number })

                if (data?.error_code === 0) {
                    if (servicesState?.modal_from === "Truck" || servicesState?.modal_from === "Driver" || servicesState?.modal_from === "BuyAndSell") {
                        if (data?.data[0]?.user_id) {
                            const response = await axiosInstance.post("/get_user_vehicle_list", { user_id: data?.data[0]?.user_id })

                            if (response?.data?.error_code === 0) {
                                if (response?.data?.data[0]?.vehicle_list?.length) {
                                    dispatch(updateUserVehicleList(response?.data?.data))
                                    dispatch(MobileNumVerificationResponse(data?.data))
                                } else {
                                    dispatch(MobileNumVerificationFailure())
                                    dispatch(updateToast({ message: data?.message, type: "error" }))
                                }
                            } else {
                                dispatch(MobileNumVerificationFailure())
                                dispatch(updateToast({ message: data?.message, type: "error" }))
                            }
                        } else {
                            dispatch(MobileNumVerificationFailure())
                            dispatch(updateToast({ message: data?.message, type: "error" }))
                        }
                    } else {
                        dispatch(MobileNumVerificationResponse(data?.data))
                    }
                } else {
                    dispatch(MobileNumVerificationFailure())
                    dispatch(updateToast({ message: data?.message, type: "error" }))
                }

            } catch (err) {
                dispatch(MobileNumVerificationFailure())
                dispatch(updateToast({ message: err?.message, type: "error" }))
            }
        } else {
            dispatch(updateToast({ message: "Invalid Mobile number ", type: "error" }))
        }
    } else {
        dispatch(handleValidation)
    }
}


//                                                              load api's                                                                  //
//get all loads api
export const handleGetLoads = (params) => async (dispatch) => {
    try {
        dispatch(loadGetRequest())
        const { data } = await axiosInstance.post("/dashboard_load_details", params)

        if (data?.error_code === 0) {
            dispatch(loadGetResponse(data?.data))
        } else {
            dispatch(loadGetFaliure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleLoadInputOnChange = (inputData) => dispatch => {
    dispatch(updateLoadEditData(inputData))
}

export const handleOnchangeLoadFilter = (inputData) => dispatch => {
    dispatch(updateLoadFilterData(inputData))
}

export const handlePostOrEditLoad = (servicesState) => async (dispatch) => {
    if (servicesState?.user_data?.user_id) {
        if (servicesState?.new_edit_load_card?.company_name &&
            servicesState?.new_edit_load_card?.contact_no &&
            servicesState?.new_edit_load_card?.from_location &&
            servicesState?.new_edit_load_card?.to_location &&
            servicesState?.new_edit_load_card?.material &&
            servicesState?.new_edit_load_card?.tone &&
            servicesState?.new_edit_load_card?.truck_body_type &&
            servicesState?.new_edit_load_card?.no_of_tyres) {
            dispatch(LoadPostRequest())

            try {
                const params = {
                    company_name: servicesState?.new_edit_load_card?.company_name,
                    contact_no: servicesState?.new_edit_load_card?.contact_no,
                    from: servicesState?.new_edit_load_card?.from_location,
                    to: servicesState?.new_edit_load_card?.to_location,
                    material: servicesState?.new_edit_load_card?.material,
                    tone: servicesState?.new_edit_load_card?.tone,
                    truck_body_type: servicesState?.new_edit_load_card?.truck_body_type,
                    no_of_tyres: servicesState?.new_edit_load_card?.no_of_tyres,
                    description: servicesState?.new_edit_load_card?.description || '',
                    user_id: servicesState?.user_data?.user_id,
                    load_id: servicesState?.new_edit_load_card?.load_id
                }

                const { data } = await axiosInstance.post("/load_details", params);
                if (data?.error_code === 0) {
                    dispatch(LoadPostResponse())
                } else {
                    dispatch(LoadPostFailure(data?.message))
                }
            }
            catch (Err) {
                dispatch(LoadPostFailure(Err?.message))
            }
        } else {
            dispatch(handleValidation)
        }
    } else {
        dispatch(handleValidation)
    }
}

export const handleDeleteLoad = (servicesState) => async (dispatch) => {
    dispatch(LoadDeleteRequest())
    try {
        const params = {
            load_id: servicesState?.loadDelete_id
        }

        const { data } = await axiosInstance.post("/remove_load_details", params);
        if (data?.error_code === 0) {
            dispatch(LoadDeleteResponse())
        } else {
            dispatch(LoadDeleteFailure(data?.message))
        }
    }
    catch (Err) {
        dispatch(LoadDeleteFailure(Err?.message))
    }


}


//                                                              truck api's                                                                  //
//get all truck api
export const handleGetTruck = (params) => async (dispatch) => {
    try {
        dispatch(truckGetRequest())
        const { data } = await axiosInstance.post("/dashboard_truck_details", params)

        if (data?.error_code === 0) {
            dispatch(truckGetResponse(data?.data))
        } else {
            dispatch(truckGetFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleTruckInputOnChange = (inputData) => dispatch => {
    dispatch(updateTruckEditData(inputData))
}

export const handleOnchangeTruckFilter = (inputData) => dispatch => {
    dispatch(updateTruckFilterData(inputData))
}

export const handlePostOrEditTruck = (servicesState) => async (dispatch) => {
    if (servicesState?.user_data?.user_id) {
        if (servicesState?.new_edit_truck_card?.vehicle_number_selected?.length &&
            servicesState?.new_edit_truck_card?.company_name &&
            servicesState?.new_edit_truck_card?.contact_no &&
            servicesState?.new_edit_truck_card?.name_of_the_transport &&
            servicesState?.new_edit_truck_card?.tone &&
            servicesState?.new_edit_truck_card?.truck_brand_name &&
            servicesState?.new_edit_truck_card?.truck_size &&
            servicesState?.new_edit_truck_card?.from_location &&
            servicesState?.new_edit_truck_card?.to_location &&
            servicesState?.new_edit_truck_card?.truck_body_type &&
            servicesState?.new_edit_truck_card?.no_of_tyres) {
            dispatch(TruckPostRequest())
            dispatch(handleResetValidation)

            try {
                const params = {
                    ...servicesState?.new_edit_truck_card,
                    vehicle_number: servicesState?.new_edit_truck_card?.vehicle_number_selected,
                    from: servicesState?.new_edit_truck_card?.from_location,
                    to: servicesState?.new_edit_truck_card?.to_location,
                    truck_name: servicesState?.new_edit_truck_card?.truck_brand_name,
                    user_id: servicesState?.user_data?.user_id,
                    truck_id: servicesState?.new_edit_truck_card?.truck_id,
                    description: servicesState?.new_edit_truck_card?.description || '',
                }

                const { data } = await axiosInstance.post("/truck_entry", params);
                if (data?.error_code === 0) {
                    dispatch(TruckPostResponse())
                } else {
                    dispatch(TruckPostFailure(data?.message))
                }
            }
            catch (Err) {
                dispatch(TruckPostFailure(Err?.message))
            }
        } else {
            dispatch(handleValidation)
        }
    } else {
        dispatch(handleValidation)
    }
}

export const handleDeleteTruck = (servicesState) => async (dispatch) => {
    dispatch(TruckDeleteRequest())
    try {
        const params = {
            truck_id: servicesState?.truckDelete_id
        }

        const { data } = await axiosInstance.post("/remove_truck_entry", params);
        if (data?.error_code === 0) {
            dispatch(TruckDeleteResponse())
        } else {
            dispatch(TruckDeleteFailure(data?.message))
        }
    }
    catch (Err) {
        dispatch(TruckDeleteFailure(Err?.message))
    }


}


//                                                              driver api's                                                                  //
//get all loads api
export const handleGetDriver = (params) => async (dispatch) => {
    try {
        dispatch(driverGetRequest())
        const { data } = await axiosInstance.post("/dashboard_driver_details", params)

        if (data?.error_code === 0) {
            dispatch(driverGetResponse(data?.data))
        } else {
            dispatch(driverGetFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleDriverInputOnChange = (inputData) => dispatch => {
    dispatch(updateDriverEditData(inputData))
}

export const handleOnchangeDriverFilter = (inputData) => dispatch => {
    dispatch(updateDriverFilterData(inputData))
}

export const handlePostOrEditDriver = (servicesState) => async (dispatch) => {
    if (servicesState?.user_data?.user_id) {
        if (servicesState?.new_edit_driver_card?.vehicle_number_selected?.length &&
            servicesState?.new_edit_driver_card?.company_name &&
            servicesState?.new_edit_driver_card?.contact_no &&
            servicesState?.new_edit_driver_card?.driver_name &&
            servicesState?.new_edit_driver_card?.from_location &&
            servicesState?.new_edit_driver_card?.to_location &&
            servicesState?.new_edit_driver_card?.truck_body_type &&
            servicesState?.new_edit_driver_card?.no_of_tyres) {
            dispatch(DriverPostRequest())
            dispatch(handleResetValidation)

            try {
                const params = {
                    ...servicesState?.new_edit_driver_card,
                    vehicle_number: servicesState?.new_edit_driver_card?.vehicle_number_selected,
                    from: servicesState?.new_edit_driver_card?.from_location,
                    to: servicesState?.new_edit_driver_card?.to_location,
                    truck_name: '',
                    description: servicesState?.new_edit_driver_card?.description || '',
                    user_id: servicesState?.user_data?.user_id,
                    driver_id: servicesState?.new_edit_driver_card?.driver_id
                }

                const { data } = await axiosInstance.post("/driver_entry", params);
                if (data?.error_code === 0) {
                    dispatch(DriverPostResponse())
                } else {
                    dispatch(DriverPostFailure(data?.message))
                }
            }
            catch (Err) {
                dispatch(DriverPostFailure(Err?.message))
            }
        } else {
            dispatch(handleValidation)
        }
    } else {
        dispatch(handleValidation)
    }
}

export const handleDeleteDriver = (servicesState) => async (dispatch) => {
    dispatch(DriverDeleteRequest())
    try {
        const params = {
            driver_id: servicesState?.driverDelete_id
        }

        const { data } = await axiosInstance.post("/remove_driver_entry", params);
        if (data?.error_code === 0) {
            dispatch(DriverDeleteResponse())
        } else {
            dispatch(DriverDeleteFailure(data?.message))
        }
    }
    catch (Err) {
        dispatch(DriverDeleteFailure(Err?.message))
    }


}



//                                                              buy and sell api's                                                                  //
//get all buy and sell api
export const handleGetBuyandSell = (params) => async (dispatch) => {
    try {
        dispatch(buyAndsellGetRequest())
        const { data } = await axiosInstance.post("/dashboard_buy_sell_details", params)

        if (data?.error_code === 0) {
            dispatch(buyAndsellGetResponse(data?.data))
        } else {
            dispatch(buyAndsellGetFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleBuyAndSellInputOnChange = (inputData) => dispatch => {
    dispatch(updateBuyAndSellEditData(inputData))
}

export const handleOnchangeBuyAndSellFilter = (inputData) => dispatch => {
    dispatch(updateBuyAndSellFilterData(inputData))
}

export const handlePostOrEditBuyAndSell = (servicesState) => async (dispatch) => {
    if (servicesState?.user_data?.user_id) {

        if (servicesState?.new_edit_buyAndsell_card?.vehicle_number_selected &&
            servicesState?.new_edit_buyAndsell_card?.model &&
            servicesState?.new_edit_buyAndsell_card?.brand &&
            servicesState?.new_edit_buyAndsell_card?.owner_name &&
            servicesState?.new_edit_buyAndsell_card?.kms_driven &&
            servicesState?.new_edit_buyAndsell_card?.price &&
            servicesState?.new_edit_buyAndsell_card?.tonnage &&
            servicesState?.new_edit_buyAndsell_card?.location &&
            servicesState?.new_edit_buyAndsell_card?.contact_no &&
            servicesState?.new_edit_buyAndsell_card?.truck_body_type &&
            servicesState?.new_edit_buyAndsell_card?.no_of_tyres &&
            servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui?.length) {

            dispatch(buyAndsellPostRequest())

            const formData = new FormData()
            formData.append("user_id", servicesState?.user_data?.user_id);
            formData.append("brand", servicesState?.new_edit_buyAndsell_card?.brand);
            formData.append("contact_no", servicesState?.new_edit_buyAndsell_card?.contact_no);
            formData.append("description", servicesState?.new_edit_buyAndsell_card?.description || '');
            formData.append("price", servicesState?.new_edit_buyAndsell_card?.price);
            formData.append("kms_driven", servicesState?.new_edit_buyAndsell_card?.kms_driven);
            formData.append("location", servicesState?.new_edit_buyAndsell_card?.location);
            formData.append("model", servicesState?.new_edit_buyAndsell_card?.model);
            formData.append("owner_name", servicesState?.new_edit_buyAndsell_card?.owner_name);
            formData.append("vehicle_number", servicesState?.new_edit_buyAndsell_card?.vehicle_number_selected);
            formData.append("truck_body_type", servicesState?.new_edit_buyAndsell_card?.truck_body_type)
            formData.append("no_of_tyres", servicesState?.new_edit_buyAndsell_card?.no_of_tyres)
            formData.append("tonnage", servicesState?.new_edit_buyAndsell_card?.tonnage !== '' ? `${servicesState?.new_edit_buyAndsell_card?.tonnage} Ton` : '')

            if (servicesState?.new_edit_buyAndsell_card?.buy_sell_id) {
                formData.append("buy_sell_id", servicesState?.new_edit_buyAndsell_card?.buy_sell_id);
            }

            if (servicesState?.new_edit_buyAndsell_card?.blog_image_send_api.length > 0) {
                for (let i = 0; i < servicesState?.new_edit_buyAndsell_card?.blog_image_send_api.length; i++) {
                    formData.append(`truck_image${i + 1}`, servicesState?.new_edit_buyAndsell_card?.blog_image_send_api[i]);
                }
            }

            try {
                const { data } = await axiosInstance.post("/truck_buy_sell", formData);
                if (data?.error_code === 0) {
                    dispatch(buyAndsellPostResponse())
                } else {
                    dispatch(buyAndsellPostFailure(data?.message))
                }
            }
            catch (Err) {
                dispatch(buyAndsellPostFailure(Err?.message))
            }
        } else {
            dispatch(handleValidation)
        }
    } else {
        dispatch(handleValidation)
    }
}

export const handleDeleteBuyAndSell = (servicesState) => async (dispatch) => {
    dispatch(buyAndsellDeleteRequest())
    try {
        const params = {
            buy_sell_id: servicesState?.buyAndsellDelete_id
        }

        const { data } = await axiosInstance.post("/remove_truck_buy_sell", params);
        if (data?.error_code === 0) {
            dispatch(buyAndsellDeleteResponse())
        } else {
            dispatch(buyAndsellDeleteFailure(data?.message))
        }
    }
    catch (Err) {
        dispatch(buyAndsellDeleteFailure(Err?.message))
    }


}
