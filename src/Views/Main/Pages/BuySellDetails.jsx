import React, { Fragment, useEffect } from 'react'
import { handleGetBuyandSell } from 'Actions/Pages_actions/ServicesActions';
import { useDispatch, useSelector } from 'react-redux';
import BuyandSellCard from 'Components/Card/BuyandSellCard';

const BuySellDetails = () => {
    const { buyAndsell_glow, allbuyAndsell_details } = useSelector((state) => state.servicesState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetBuyandSell)
    }, [])


    return (
        <div className="d-flex flex-wrap g-2 bg-white px-2 py-3 overflowY h-100 rounded placeholder-glow">
            {buyAndsell_glow ?
                [...Array(6)].map((value, placeholderInd) => (
                    <BuyandSellCard placeholder={buyAndsell_glow} key={placeholderInd} />
                ))
                :
                allbuyAndsell_details.map((truckData, truckInd) => (
                    <Fragment key={truckInd}>
                        <BuyandSellCard placeholder={buyAndsell_glow} truck_data={truckData} />
                    </Fragment>
                ))
            }
        </div>
    )
}

export default BuySellDetails