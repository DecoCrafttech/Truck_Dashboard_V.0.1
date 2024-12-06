import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { handleResetAlMenus } from 'Actions/Common_actions/Common_action'
import { handleCreateModal, handleFilterModal, handleGetTruck } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import TruckCard from 'Components/Card/TruckCard'
import { useDispatch } from 'Components/CustomHooks'
import { Card } from 'react-bootstrap'
import { SearchComponent } from 'ResuableFunctions/SearchFun' 
import Icons from 'Utils/Icons' 
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter'

const TruckDetails = () => {
    const { commonState, servicesState } = useSelector((state) => state);
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(handleResetAlMenus)
    }, [])

    const params = {
        vehicle_number: "",
        contact_no: "",
        truck_name: "",
        company_name: "",
        from_location: "",
        to_location: [],
        tone: "",
        truck_body_type: "",
        no_of_tyres: "",
        page_no: commonState?.currentPage || 1,
        search_val: commonState?.search_clicked ? commonState?.search_value || "" : "",
        data_limit: commonState?.pageSize || 10
    }

    useEffect(() => {
        if (commonState?.search_clicked) {
            dispatch(handleGetTruck(params))
        }
        else if (commonState?.apply_filter_clicked) {
            const newParams = { ...params }
            const filteredToLoc = servicesState?.truck_filter_card?.to_location?.map((v) => v?.label)

            newParams.truck_name = servicesState?.truck_filter_card?.truck_name || ''
            newParams.from_location = servicesState?.truck_filter_card?.from_location || ''
            newParams.to_location = servicesState?.truck_filter_card?.to_location ? filteredToLoc : [] || []
            newParams.tone = servicesState?.truck_filter_card?.tone || ''
            newParams.truck_body_type = servicesState?.truck_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.truck_filter_card?.no_of_tyres || ''

            dispatch(handleGetTruck(newParams))
        }
        else {
            dispatch(handleGetTruck(params))
        }

    }, [commonState?.pageSize, commonState?.currentPage, commonState?.search_clicked, commonState?.apply_filter_clicked, commonState?.apply_filter])

    return (
        <Fragment>
            <div className="h-100">
                <div className="w-100 d-inline-flex flex-wrap align-items-center">
                    <div className="col-6">
                        <p className='m-0 ps-1'>{`showing ${commonState?.currentPage * commonState?.pageSize <= commonState?.totalCount ?
                                commonState?.currentPage * commonState?.pageSize
                                :
                                (commonState?.currentPage - 1) * commonState?.pageSize + servicesState?.alltrucks_details?.length
                            } of ${commonState?.totalCount}`}
                        </p>
                    </div>
                    <div className="col-6 d-inline-flex justify-content-end align-items-center">
                        <SearchComponent className="search-input-padding py-2 mb-0" placeholder="Search for anything..." />

                        <div className="col-3 text-end p-1">
                            <ButtonComponent
                                className="bg-white py-2 w-100"
                                buttonName="Filter"
                                clickFunction={() => dispatch(handleFilterModal("Truck","Filter"))}
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
                                            Add Truck
                                        </span>
                                    </span>
                                }
                                clickFunction={() => dispatch(handleCreateModal("Truck","Create"))}
                            />
                        </div>
                    </div>
                </div>

                <Card className='w-100 main-content-card-height mt-3 px-0 py-1 rounded border-0'>
                    <Card.Body className='h-100 overflowY w-100 rounded placeholder-glow'>
                        {servicesState?.truck_glow ?
                            [...Array(6)].map((value, placeholderInd) => (
                                <TruckCard placeholder={servicesState?.truck_glow} key={placeholderInd} />
                            ))
                            :
                            servicesState?.alltrucks_details.map((truckData, truckInd) => (
                                <Fragment key={truckInd}>
                                    <TruckCard placeholder={servicesState?.truck_glow} truck_data={truckData} key={truckInd} />
                                </Fragment>
                            ))
                        }
                    </Card.Body>
                </Card>

                { commonState?.totalCount ? <ServiesFooter /> : null }
            </div>
        </Fragment>
    )
}

export default TruckDetails