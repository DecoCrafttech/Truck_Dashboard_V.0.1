import { handleResetAlMenus } from 'Actions/Common_actions/Common_action'
import { handleCreateModal, handleFilterModal, handleGetDriver } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import DriverCard from 'Components/Card/DriverCard'
import { useDispatch } from 'Components/CustomHooks'
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter'
import React, { Fragment, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SearchComponent } from 'ResuableFunctions/SearchFun'
import Icons from 'Utils/Icons'

const DriverDetails = () => {
    const { commonState, servicesState } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleResetAlMenus)
    }, [])

    const params = {
        driver_name: "",
        vehicle_number: "",
        contact_no: "",
        truck_name: "",
        company_name: "",
        from_location: "",
        to_location: [],
        truck_body_type: "",
        no_of_tyres: "",
        description: "",
        page_no: commonState?.currentPage || 1,
        search_val: commonState?.search_clicked ? commonState?.search_value?.trim() || "" : "",
        data_limit: commonState?.pageSize || 10
    }

    useEffect(() => {
        if (commonState?.search_clicked) {
            dispatch(handleGetDriver(params))
        }
        else if (commonState?.apply_filter_clicked) {
            const filteredToLoc = servicesState?.driver_filter_card?.to_location?.map((v) => v?.label)

            const newParams = { ...params }
            newParams.from_location = servicesState?.driver_filter_card?.from_location || ''
            newParams.to_location = servicesState?.driver_filter_card?.to_location ? filteredToLoc : [] || []
            newParams.truck_body_type = servicesState?.driver_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.driver_filter_card?.no_of_tyres || ''

            dispatch(handleGetDriver(newParams))
        }
        else {
            dispatch(handleGetDriver(params))
        }

    }, [commonState?.pageSize, commonState?.currentPage, commonState?.search_clicked, commonState?.apply_filter_clicked, commonState?.apply_filter, servicesState?.re_render])


    return (
        <Fragment>
            <div className="h-100">
                <div className="w-100 d-inline-flex flex-wrap align-items-center">
                    <div className="col-6">
                        <p className='m-0 ps-1'>{`showing ${commonState?.currentPage * commonState?.pageSize <= commonState?.totalCount ?
                            commonState?.currentPage * commonState?.pageSize
                            :
                            (commonState?.currentPage - 1) * commonState?.pageSize + servicesState?.alldrivers_details?.length
                            } of ${commonState?.totalCount}`}
                        </p>
                    </div>
                    <div className="col-6 d-inline-flex justify-content-end align-items-center">
                        <SearchComponent className="search-input-padding py-2 mb-0" placeholder="Search for anything..." />

                        <div className="col-3 text-end p-1">
                            <ButtonComponent
                                className="bg-white py-2 w-100"
                                buttonName="Filter"
                                clickFunction={() => dispatch(handleFilterModal("Driver", "Filter"))}
                            />
                        </div>
                        <div className="col-3 text-end p-1">
                            <ButtonComponent
                                className="btn-danger py-2 w-100"
                                buttonName={
                                    <span>
                                        <span className='me-2'>
                                            {Icons.reactPlusIcon}
                                        </span>
                                        <span>
                                            Add Driver
                                        </span>
                                    </span>
                                }
                                clickFunction={() => dispatch(handleCreateModal("Driver", "Create"))}
                            />
                        </div>
                    </div>
                </div>

                <Card className='w-100 main-content-card-height mt-3 px-0 py-1 rounded border-0'>
                    <Card.Body className='h-100 overflowY w-100 rounded placeholder-glow'>
                        {servicesState?.driver_glow ?
                            [...Array(6)].map((value, placeholderInd) => (
                                <DriverCard placeholder={servicesState?.driver_glow} key={placeholderInd} />
                            ))
                            :
                            servicesState?.alldrivers_details.map((driverData, driverInd) => (
                                <Fragment key={driverInd}>
                                    <DriverCard placeholder={servicesState?.driver_glow} driver_data={driverData} commonState={commonState}/>
                                </Fragment>
                            ))
                        }
                    </Card.Body>
                </Card>

                {commonState?.totalCount ? <ServiesFooter /> : null}
            </div>
        </Fragment>
    )
}

export default DriverDetails