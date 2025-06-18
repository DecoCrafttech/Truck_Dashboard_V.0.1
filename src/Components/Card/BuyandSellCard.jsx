import { handleDeleteModal, handleEditModal } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import { useDispatch } from 'Components/CustomHooks'
import Img from 'Components/Img/Img'
import LinkComponent from 'Components/Router_components/LinkComponent'
import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'
import Icons from 'Utils/Icons'


const BuyandSellCard = ({
    placeholder,
    buy_sell_data,
    is_delete_card,
    commonState
}) => {
    const dispatch = useDispatch();

    function cardDetails(data) {
        return <Fragment>
            {[{ icon: Icons.ownerIcon, value: `${data?.owner_name}` }, { icon: Icons.buySellTruckIcon, value: data?.vehicle_number },
            { icon: Icons.truckModelIcon, value: data?.model }, { icon: Icons.kmsDrivernIcon, value: `${data?.kms_driven} kms` }]
                .map((val, ind) => (
                    <div className={'col-6'} key={ind}>
                        <p className={`${placeholder ? 'placeholder pt-2 pb-3 rounded-1 col-11' : ''} mb-2 fs-13 text-secondary`}>
                            {placeholder ? null : <span className='me-1'>{val.icon}</span>}
                            {placeholder ? null : val.value}
                        </p>
                    </div>
                ))
            }
            {placeholder ?
                null
                :
                <div className='d-flex flex-wrap w-100 align-items-center my-3'>
                    <div className="col-6 text-start">
                        <h6 className=' mb-0 w-100 fs-17 fw-bold'>
                            <span>{Icons.reactRupeesIcon}</span>
                            {data?.price}
                        </h6>
                    </div>
                    <div className="col-6 text-end">
                        <LinkComponent to={`/dashboard/services/buy_sell_details/view_details?buy_sell_id=${buy_sell_data?.buy_sell_id}`} title="View details" className="text-decoration-none me-4" />
                    </div>
                </div>
            }
        </Fragment>
    }


    return (
        <div className={`${is_delete_card ? "col-12" : "col-12 col-sm-6 col-lg-4"} p-2`}>
            <Card className="card-border rounded-3 w-100 shadow border-0 pb-2 h-100">
                <Card.Header className="d-flex align-items-center bg-transparent border-0">
                    <div className="col">
                        {placeholder ?
                            <p className='mb-0 placeholder w-75 rounded-1 pt-3 pb-2'></p>
                            :
                            <Fragment>
                                {[...Array(5)].map((starVal, starInd) => starInd < buy_sell_data?.user_review_count ?
                                    <span key={starInd}>
                                        {Icons.startBlack}
                                    </span>
                                    :
                                    <span key={starInd}>
                                        {Icons.starGray}
                                    </span>
                                )}
                                < span className='text-secondary ms-1 fs-12'>({buy_sell_data?.user_review_count})</span>
                            </Fragment>
                        }
                    </div>
                    {placeholder ?
                        <div className="col text-end">
                            <p className='mb-0 placeholder w-75 rounded-1 pt-3 pb-2'></p>
                        </div>
                        :
                        <div className="col text-end">
                            <p className='fs-12 m-0'>Post : <span className='text-secondary'>{buy_sell_data?.user_post}</span></p>
                        </div>
                    }
                </Card.Header>

                <Card.Body className="card-body py-0">
                    <div className={`col-12 ${placeholder ? 'placeholder py-4 rounded' : 'card-blue-title'} py-3 mb-2`}>
                        <h5 className='mb-0 fs-14'>{buy_sell_data?.profile_name}</h5>
                    </div>

                    <div className="col-12 px-1">
                        <Img
                            src={buy_sell_data?.images[0]}
                            width="100%"
                            height="200px"
                            className={`${placeholder ? 'placeholder rounded-1' : ''} rounded-3`}
                        />
                    </div>
                    <h5 className='mb-0 fs-14 fw-bold mt-3'>{buy_sell_data?.brand}</h5>

                    <p className={`${placeholder ? 'placeholder py-2 pb-3 rounded-1 col-7' : ''} mb-1 fs-13 mt-2`}>
                        {placeholder ? null : <span className='me-1'>{Icons.greenLocationIcon}</span>}
                        {buy_sell_data?.location}
                    </p>

                    <p className={`${placeholder ? 'placeholder py-1 rounded-1 col-7 mb-1' : 'ms-2'} fs-12 text-secondary fw-bold`}>Posted on : {buy_sell_data?.updt?.slice(5, 25)}</p>

                    <hr className={placeholder ? 'm-1 d-none' : ''} />

                    <div className="col-12 d-flex flex-wrap">
                        {cardDetails(buy_sell_data)}
                    </div>

                    {
                        !is_delete_card ?
                            <hr className={placeholder ? 'm-1 d-none' : ''} />
                            :
                            null
                    }
                </Card.Body>

                {
                    !is_delete_card ?
                        <Card.Footer className="card-footer bg-transparent border-0 d-flex pt-0 my-2">
                            <div className="col px-1">
                                <ButtonComponent
                                    className={`${placeholder ? "placeholder py-2 w-100 btn-outline-secondary" : 'fs-13 w-100 btn-outline-danger'}`}
                                    buttonName={placeholder ? "" : 'Delete'}
                                    clickFunction={() => dispatch(handleDeleteModal({ from: "BuyAndSell", type: "Delete", data: buy_sell_data }))}
                                    btnDisable={!placeholder ? ["admin","Admin"].includes(commonState?.user_role) : null}
                                />
                            </div>
                            <div className="col px-1">
                                <ButtonComponent
                                    className={`${placeholder ? "placeholder py-2 btn-outline-secondary w-100" : 'fs-13 w-100 btn-success'}`}
                                    buttonName={placeholder ? "" : 'Edit'}
                                    clickFunction={() => dispatch(handleEditModal({ from: "BuyAndSell", type: "Edit", data: buy_sell_data }))}
                                    btnDisable={!placeholder ? ["admin","Admin"].includes(commonState?.user_role) : null}
                                />
                            </div>
                        </Card.Footer>
                        :
                        null
                }
            </Card>
        </div >
    )
}

export default BuyandSellCard