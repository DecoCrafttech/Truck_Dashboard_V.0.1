import { handleResetAlMenus } from 'Actions/Common_actions/Common_action'
import { handleCreateModal, handleFilterModal, handleGetLoads } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import LoadCard from 'Components/Card/LoadCard'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter'
import React, { Fragment, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { SearchComponent } from 'ResuableFunctions/SearchFun'
import Icons from 'Utils/Icons'
import JsonData from 'Utils/JsonData'

const LoadDetails = () => {
    const { commonState, servicesState } = useCommonState();
    const dispatch = useDispatch();
    const { jsonOnly } = JsonData();

    useEffect(() => {
        dispatch(handleResetAlMenus)
    }, [])

    useEffect(() => {
        if (commonState?.re_render) {
            const newParams = {}
            let locations;

            const filteredToLoc = servicesState?.load_filter_card?.to_location?.map((v) => v?.label)
            const select_all_location = jsonOnly?.states?.map((v) => v.label)
            if (filteredToLoc?.length) locations = filteredToLoc[0] === "Select all" ? select_all_location : filteredToLoc

            if (commonState?.apply_filter) {
                newParams.from_location = servicesState?.load_filter_card?.from_location || ''
                newParams.to_location = locations || []
                newParams.truck_body_type = servicesState?.load_filter_card?.truck_body_type || ''
                newParams.no_of_tyres = servicesState?.load_filter_card?.no_of_tyres || ''
                newParams.tone = servicesState?.load_filter_card?.tone || ''
                newParams.material = servicesState?.load_filter_card?.material || ''
            } else {
                newParams.from_location = ''
                newParams.to_location = []
                newParams.truck_body_type = ''
                newParams.no_of_tyres = ''
                newParams.tone = ''
                newParams.material = ''
            }
            newParams.search_val = commonState?.search ? commonState?.search_value?.trim() || "" : ""
            newParams.company_name = ""
            newParams.page_no = commonState?.currentPage || 1
            newParams.data_limit = parseInt(commonState?.pageSize) || 10
            newParams.endpoint = "/dashboard_load_details"


            dispatch(handleGetLoads(newParams))
        }
    }, [commonState?.pageSize, commonState?.currentPage, commonState?.re_render])


    return (
        <Fragment>
            <div className="h-100">
                <div className="w-100 d-inline-flex flex-wrap align-items-center">
                    <div className="col-6">
                        <p className='m-0 ps-1'>{`showing ${commonState?.currentPage * commonState?.pageSize <= commonState?.totalCount ?
                            commonState?.currentPage * commonState?.pageSize
                            :
                            (commonState?.currentPage - 1) * commonState?.pageSize + servicesState?.allLoads_details?.length
                            } of ${commonState?.totalCount}`}
                        </p>
                    </div>
                    <div className="col-6 d-inline-flex justify-content-end align-items-center">
                        <SearchComponent className="search-input-padding py-2 mb-0" placeholder="Search for anything..." />

                        <div className="col-3 text-end p-1">
                            <ButtonComponent
                                className="bg-white py-2 w-100"
                                buttonName="Filter"
                                clickFunction={() => dispatch(handleFilterModal("Load", "Filter"))}
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
                                            Add Load
                                        </span>
                                    </span>
                                }
                                clickFunction={() => dispatch(handleCreateModal("Load", "Create"))}
                            />
                        </div>
                    </div>
                </div>

                <Card className='w-100 main-content-card-height mt-3 px-0 py-1 rounded border-0'>
                    <Card.Body className='row overflowY w-100 rounded placeholder-glow'>
                        {servicesState?.load_glow ?
                            [...Array(6)].map((value, placeholderInd) => (
                                <LoadCard placeholder={servicesState?.load_glow} key={placeholderInd} />
                            ))
                            :
                            servicesState?.allLoads_details?.length ?
                                servicesState?.allLoads_details.map((loads, loadInd) => (
                                    <LoadCard placeholder={servicesState?.load_glow} load={loads} key={loadInd} commonState={commonState} />
                                ))
                                :
                                <div className='w-100 blog-main-content-height d-inline-flex align-items-center justify-content-center'>
                                    <div className="col-6 text-center">
                                        <h6>No Data Found</h6>
                                    </div>
                                </div>
                        }
                    </Card.Body>
                </Card>

                {commonState?.totalCount > 0 ? <ServiesFooter /> : null}
            </div>

        </Fragment>
    )
}

export default LoadDetails