import { handleGetDriver } from 'Actions/Pages_actions/ServicesActions'
import DriverCard from 'Components/Card/DriverCard'
import { useDispatch } from 'Components/CustomHooks'
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'

const DriverDetails = () => {
    const { driver_glow, alldrivers_details } = useSelector((state) => state.servicesState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetDriver)
    }, [])


    return (
        <div className="d-flex flex-wrap g-2 bg-white px-2 py-3 overflowY h-100 rounded placeholder-glow">
            {driver_glow ?
                [...Array(6)].map((value, placeholderInd) => (
                    <DriverCard placeholder={driver_glow} key={placeholderInd} />
                ))
                :
                alldrivers_details.map((driverData, driverInd) => (
                    <Fragment key={driverInd}>
                        <DriverCard placeholder={driver_glow} driver_data={driverData} />
                    </Fragment>
                ))
            }
        </div>
    )
}

export default DriverDetails