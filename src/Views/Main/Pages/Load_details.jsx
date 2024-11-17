import { handleGetLoads } from 'Actions/Pages_actions/ServicesActions'
import LoadCard from 'Components/Card/Load_card'
import { useDispatch } from 'Components/CustomHooks'
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'

const LoadDetails = () => {
    const { load_glow, allLoads_details } = useSelector((state) => state.servicesState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetLoads)
    }, [])


    return (
        <div className="d-flex flex-wrap g-2 bg-white px-2 py-3 overflowY h-100 rounded placeholder-glow">
            {load_glow ?
                [...Array(6)].map((value,placeholderInd) => (
                    <LoadCard placeholder={load_glow} key={placeholderInd}/>
                ))
                :
                allLoads_details.map((loads, loadInd) => (
                    <Fragment key={loadInd}>
                        <LoadCard placeholder={load_glow} load={loads}/>
                    </Fragment>
                ))
            }
        </div>
    )
}

export default LoadDetails