import { handleGetTruck } from 'Actions/Pages_actions/ServicesActions';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TruckCard from 'Components/Card/TruckCard';

const TruckDetails = () => {
    const { truck_glow, alltrucks_details } = useSelector((state) => state.servicesState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetTruck)
    }, [])


    return (
        <div className="d-flex flex-wrap g-2 bg-white px-2 py-3 overflowY h-100 rounded placeholder-glow">
            {truck_glow ?
                [...Array(6)].map((value, placeholderInd) => (
                    <TruckCard placeholder={truck_glow} key={placeholderInd} />
                ))
                :
                alltrucks_details.map((truckData, truckInd) => (
                    <Fragment key={truckInd}>
                        <TruckCard placeholder={truck_glow} truck_data={truckData} />
                    </Fragment>
                ))
            }
        </div>
    )
}

export default TruckDetails