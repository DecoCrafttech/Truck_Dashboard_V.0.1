import { handleResetAlMenus } from 'Actions/Common_actions/Common_action'
import { handleCreateModal, handleFilterModal, handleGetBuyandSell } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import BuyandSellCard from 'Components/Card/BuyandSellCard'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter'
import React, { Fragment, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { SearchComponent } from 'ResuableFunctions/SearchFun'
import Icons from 'Utils/Icons'
import JsonData from 'Utils/JsonData'

const BuySellDetails = () => {
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

            const filteredToLoc = servicesState?.buyAndsell_filter_card?.to_location?.map((v) => v?.label)
            const select_all_location = jsonOnly?.states?.map((v) => v.label)
            if (filteredToLoc?.length) locations = filteredToLoc[0] === "Select all" ? select_all_location : filteredToLoc

            if (commonState?.apply_filter) {
                newParams.owner_name = servicesState?.buyAndsell_filter_card?.owner_name || ''
                newParams.kms_driven = servicesState?.buyAndsell_filter_card?.kms_driven || ''
                newParams.location = servicesState?.buyAndsell_filter_card?.location ? [servicesState?.buyAndsell_filter_card?.location] : [] || []
                newParams.brand = servicesState?.buyAndsell_filter_card?.brand || ''
                newParams.model = servicesState?.buyAndsell_filter_card?.model || ''
                newParams.truck_name = servicesState?.buyAndsell_filter_card?.truck_name || ''
                newParams.price = servicesState?.buyAndsell_filter_card?.price || ''
                newParams.tonnage = servicesState?.buyAndsell_filter_card?.tonnage || ''
                newParams.truck_body_type = servicesState?.buyAndsell_filter_card?.truck_body_type || ''
                newParams.no_of_tyres = servicesState?.buyAndsell_filter_card?.no_of_tyres || ''
            } else {
                newParams.owner_name = ''
                newParams.kms_driven = ''
                newParams.location = []
                newParams.brand = ''
                newParams.model = ''
                newParams.truck_name = ''
                newParams.price = ''
                newParams.tonnage = ''
                newParams.truck_body_type = ''
                newParams.no_of_tyres = ''
            }

            newParams.search_val = commonState?.search ? commonState?.search_value?.trim() || "" : ""
            newParams.company_name = ""
            newParams.vehicle_number = ""
            newParams.contact_no = ""
            newParams.page_no = commonState?.currentPage || 1
            newParams.data_limit = parseInt(commonState?.pageSize) || 10
            newParams.endpoint = "/dashboard_buy_sell_details"

            dispatch(handleGetBuyandSell(newParams))
        }
    }, [commonState?.pageSize, commonState?.currentPage, commonState?.re_render])


    return (
        <Fragment>
            <div className="h-100">
                <div className="w-100 d-inline-flex flex-wrap align-items-center">
                    <div className="col-5">
                        <p className='m-0 ps-1'>{`showing ${commonState?.currentPage * commonState?.pageSize <= commonState?.totalCount ?
                            commonState?.currentPage * commonState?.pageSize
                            :
                            (commonState?.currentPage - 1) * commonState?.pageSize + servicesState?.allbuyAndsell_details?.length
                            } of ${commonState?.totalCount}`}
                        </p>
                    </div>
                    <div className="col-7 d-inline-flex justify-content-end align-items-center">
                        <SearchComponent className="search-input-padding py-2 mb-0" placeholder="Search for anything..." />

                        <div className="col-3 text-end p-1">
                            <ButtonComponent
                                className="bg-white py-2 w-100"
                                buttonName="Filter"
                                clickFunction={() => dispatch(handleFilterModal("BuyAndSell", "Filter"))}
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
                                            Add Buy & Sell
                                        </span>
                                    </span>
                                }
                                clickFunction={() => dispatch(handleCreateModal("BuyAndSell", "Create"))}
                            />
                        </div>
                    </div>
                </div>

                <Card className='w-100 main-content-card-height mt-3 px-0 py-1 rounded border-0'>
                    <Card.Body className='overflowY w-100 rounded placeholder-glow row'>
                        {servicesState?.buyAndsell_glow ?
                            [...Array(6)].map((value, placeholderInd) => (
                                <BuyandSellCard placeholder={servicesState?.buyAndsell_glow} key={placeholderInd} />
                            ))
                            :
                            servicesState?.allbuyAndsell_details?.length ?
                                servicesState?.allbuyAndsell_details.map((buyAndSellData, buyAndSellInd) => (
                                    <Fragment key={buyAndSellInd}>
                                        <BuyandSellCard placeholder={servicesState?.buyAndsell_glow} buy_sell_data={buyAndSellData} commonState={commonState} />
                                    </Fragment>
                                ))
                                :
                                <div className="h-100 row align-items-center justify-content-center">
                                    <div className="col text-center">
                                        <p>No Data Found</p>
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

export default BuySellDetails