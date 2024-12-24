import { handleResetAlMenus } from 'Actions/Common_actions/Common_action'
import { handleCreateModal, handleFilterModal, handleGetBuyandSell } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import BuyandSellCard from 'Components/Card/BuyandSellCard'
import { useDispatch } from 'Components/CustomHooks'
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter'
import React, { Fragment, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SearchComponent } from 'ResuableFunctions/SearchFun'
import Icons from 'Utils/Icons'

const BuySellDetails = () => {
    const { commonState, servicesState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const params = {
        owner_name: "",
        kms_driven: "",
        brand: "",
        model: "",
        vehicle_number: "",
        contact_no: "",
        truck_name: "",
        company_name: "",
        price: "",
        location: "",
        tonnage: "",
        description: "",
        page_no: commonState?.currentPage || 1,
        search_val: commonState?.search_clicked ? commonState?.search_value || "" : "",
        data_limit: commonState?.pageSize || 10
    }

    useEffect(() => {
        dispatch(handleResetAlMenus)
    }, [])

    useEffect(() => {
        if (commonState?.search_clicked) {
            dispatch(handleGetBuyandSell(params))
        }
        else if (commonState?.apply_filter_clicked) {
            const newParams = { ...params }
            newParams.model = servicesState?.buyAndsell_filter_card?.model || ''
            newParams.brand = servicesState?.buyAndsell_filter_card?.brand || ''
            newParams.location = servicesState?.buyAndsell_filter_card?.location ? [servicesState?.buyAndsell_filter_card?.location] : [] || []
            newParams.kms_driven = servicesState?.buyAndsell_filter_card?.kms_driven || ''
            newParams.price = servicesState?.buyAndsell_filter_card?.price || ''
            newParams.tonnage = servicesState?.buyAndsell_filter_card?.tonnage || ''
            newParams.truck_body_type = servicesState?.buyAndsell_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.buyAndsell_filter_card?.no_of_tyres || ''

            dispatch(handleGetBuyandSell(newParams))
        }
        else {
            dispatch(handleGetBuyandSell(params))
        }
    }, [commonState?.pageSize, commonState?.currentPage, commonState?.search_clicked, commonState?.apply_filter_clicked, commonState?.apply_filter, servicesState?.re_render])


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
                    <Card.Body className='h-100 overflowY w-100 rounded placeholder-glow'>
                        {servicesState?.buyAndsell_glow ?
                            [...Array(6)].map((value, placeholderInd) => (
                                <BuyandSellCard placeholder={servicesState?.buyAndsell_glow} key={placeholderInd} />
                            ))
                            :
                            servicesState?.allbuyAndsell_details.map((buyAndSellData, buyAndSellInd) => (
                                <Fragment key={buyAndSellInd}>
                                    <BuyandSellCard placeholder={servicesState?.buyAndsell_glow} buy_sell_data={buyAndSellData} />
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

export default BuySellDetails