import { handleBuyAndSellViewDetails } from 'Actions/Pages_actions/ServicesActions';
import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import Img from 'Components/Img/Img';
import React, { Fragment, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import Icons from 'Utils/Icons';
import JsonData from 'Utils/JsonData';

const BuySellDetailsPage = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const dispatch = useDispatch();
    const navigate = useCustomNavigate()
    const { servicesState } = useCommonState()
    const { buy_sell_carousel_settings } = JsonData()?.jsxJson

    useEffect(() => {
        dispatch(handleBuyAndSellViewDetails(queryParams.get("buy_sell_id")))
    }, [])

    return (
        <div className="row">
            <div className='my-4'>
                <ButtonComponent
                    type='button'
                    className='btn-outline-dark px-3'
                    clickFunction={() => navigate('/dashboard/services/buy_sell_details')}
                    buttonName={
                        <span>
                            <span className='me-1'>
                                {Icons.backIcon}
                            </span>
                            <span>
                                Back
                            </span>
                        </span>
                    }
                />
            </div>
            <Card className='border-0 rounded-3 p-5 blogDetailView'>
                <Card.Body>
                    <div className="col-lg-12 col-md-12">
                        <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                            <h5 className="border-start border-danger border-3 ps-2">Images</h5>
                            <div className="row">
                                <div className="buy_sell_slider_container text-center my-5">
                                    {
                                        servicesState?.buyAndsell_glow ?
                                            null
                                            :
                                            servicesState?.buyAndSell_detail_view?.images?.length > 1 ?
                                                <Slider {...buy_sell_carousel_settings}>
                                                    {servicesState?.buyAndSell_detail_view?.images?.map((image, index) => {
                                                        return (
                                                            <div className="col-12 d-inline-flex justify-content-center" key={index}>
                                                                <Img src={image} height="300px" className='img-container' />
                                                            </div>
                                                        )
                                                    })}
                                                </Slider>
                                                :
                                                <div className="col-12 d-inline-flex justify-content-center">
                                                    <Img src={servicesState?.buyAndSell_detail_view?.images ? servicesState?.buyAndSell_detail_view?.images[0] : ''} height="300px" className='img-container' />
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-12 col-md-8'>
                                    <h1 className='mt-0 ms-0'>{servicesState?.buyAndSell_detail_view?.brand}</h1>
                                    <div className="product-ratting">
                                        <Fragment>
                                            {[...Array(5)].map((starVal, starInd) => starInd < servicesState?.buyAndSell_detail_view?.user_review_count ?
                                                <span key={starInd}>
                                                    {Icons.startBlack}
                                                </span>
                                                :
                                                <span key={starInd}>
                                                    {Icons.starGray}
                                                </span>
                                            )}
                                            < span className='text-secondary ms-1 fs-12'>({servicesState?.buyAndSell_detail_view?.user_review_count})</span>
                                        </Fragment>
                                    </div>
                                    <div className="ltn__blog-meta">
                                        <ul className="list-inline">
                                            <li className="list-inline-item ltn__blog-date mt-3">
                                                <i className="far fa-calendar-alt" /> {servicesState?.buyAndSell_detail_view?.updt ? servicesState?.buyAndSell_detail_view?.updt.slice(5, 25) : ''}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Brand</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.brand}</td>
                                </tr>
                                <tr>
                                    <th>Owner Name</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.owner_name}</td>
                                </tr>
                                <tr>
                                    <th>Contact Number</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.contact_no}</td>
                                </tr>
                                <tr>
                                    <th>Model</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.model}</td>
                                </tr>
                                <tr>
                                    <th>Vehicle Number</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.vehicle_number}</td>
                                </tr>
                                <tr>
                                    <th>KMs Driven</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.kms_driven}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td>₹ {servicesState?.buyAndSell_detail_view?.price}</td>
                                </tr>
                                <tr>
                                    <th>No. of Tyres</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.no_of_tyres}</td>
                                </tr>
                                <tr>
                                    <th>Tonnage</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.tonnage}</td>
                                </tr>
                                <tr>
                                    <th>Truck Body Type</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.truck_body_type}</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.location}</td>
                                </tr>
                                <tr>
                                    <th>Last Updated</th>
                                    <td>{servicesState?.buyAndSell_detail_view?.updt ? servicesState?.buyAndSell_detail_view?.updt.slice(5, 25) : ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 className="border-start border-danger border-3 ps-2">Description</h4>
                    <p>{servicesState?.buyAndSell_detail_view?.description}</p>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BuySellDetailsPage