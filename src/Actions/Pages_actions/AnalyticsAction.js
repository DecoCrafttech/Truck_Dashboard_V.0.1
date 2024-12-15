import axiosInstance from "Services/axiosInstance";
import {
    getOverallAnalyticsRequest,
    getOverallAnalyticsResponse,
    getOverallAnalyticsFailure,

    getIndividualAnalyticsRequest,
    getIndividualAnalyticsResponse,
    getIndividualAnalyticsFailure,


} from "Slices/Pages_slice/Analytice_slice";

export const handlendOverallAnalysis = (dataParams) => async (dispatch) => {
    try {
        dispatch(getOverallAnalyticsRequest())
        const { data } = await axiosInstance.post("/get_analytics", dataParams)
        if (data?.error_code === 0) {
            const analysisData = {...data?.data[0]}
            const changeFormat = data?.data[0]?.daily_requirements?.map((v) => {
                const splitTime = v?.time?.split(":")[0]
                const newFormat = { ...v, time: splitTime }
                return newFormat
            })
            analysisData.daily_requirements = changeFormat

            dispatch(getOverallAnalyticsResponse(analysisData))
        } else {
            dispatch(getOverallAnalyticsFailure(data?.message))
        }
    } catch (Err) {
        dispatch(getOverallAnalyticsFailure(Err?.message))
    }
}

export const handlendIndividualSelectedAnalysis = (dataParams) => async (dispatch) => {
    try {
        dispatch(getIndividualAnalyticsRequest())
        const { data } = await axiosInstance.post(dataParams?.endpoint, dataParams?.params)
        if (data?.error_code === 0) {
            const changeFormat = data?.data[0]?.daily_requirements?.map((v) => {
                const splitTime = v?.time?.split(":")[0]

                switch (dataParams?.from) {
                    case "Load":
                        const loadFormat = { time: splitTime, load: v?.load }
                        return loadFormat

                    case "Truck":
                        const truckFormat = { time: splitTime, truck: v?.truck }
                        return truckFormat

                    case "Driver":
                        const driverFormat = { time: splitTime, driver: v?.driver }
                        return driverFormat

                    case "BuyAndSell":
                        const buyAndSellFormat = { time: splitTime, buysell: v?.buysell }
                        return buyAndSellFormat

                    default:
                        break;
                }
            })

            dispatch(getIndividualAnalyticsResponse(changeFormat))
        } else {
            dispatch(getIndividualAnalyticsFailure(data?.message))
        }
    } catch (Err) {
        dispatch(getIndividualAnalyticsFailure(Err?.message))
    }
}