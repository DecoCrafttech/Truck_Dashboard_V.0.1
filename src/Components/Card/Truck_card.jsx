import ButtonComponent from 'Components/Button/Button'
import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'
import Icons from 'Utils/Icons'

const Truck_card = ({
    placeholder,
    truck_data
}) => {
    function locationFun(from, to) {
        return <Fragment>
            {[{ icon: Icons.greenLocationIcon, location: from }, { icon: Icons.redLocationIcon, location: to }]
                .map((value, index) => (
                    <p className={`${placeholder ? 'placeholder py-2 pb-3 rounded-1 col-7' : ''} fs-15 mb-2 ${index === 0 && !placeholder ? 'location-dotted' : ''}`} key={index}>
                        {placeholder ? null : <span className='me-1'>{value.icon}</span>}
                        {value.location}
                    </p>
                ))}
        </Fragment>
    }

    function cardDetails(data) {
        return <Fragment>
            {[{ icon: Icons.materialIcon, value: `${data?.tone} Tone` }, { icon: Icons.numberPlateIcon, value: data?.vehicle_number }, { icon: Icons.wheelIcon, value: `${data?.no_of_tyres} Wheels` },
            { icon: Icons.containerIcon, value: data?.truck_body_type },{ icon: Icons.truckNumberPlateIcon  , value: data?.truck_name },{ icon: Icons.blueCardCompanyIcon, value: data?.company_name }]
                .map((val, ind) => (
                    <div className={'col-6'} key={ind}>
                        <p className={`${placeholder ? 'placeholder pt-2 pb-3 rounded-1 col-11' : ''} mb-2 fs-15 text-secondary`}>
                            {placeholder ? null : <span className='me-1'>{val.icon}</span>}
                            {placeholder ? null : val.value}
                        </p>
                    </div>
                ))
            }
            {placeholder ?
                null
                :
                <Fragment>
                    <h6 className='text-secondary w-100'>Description</h6>
                    <p className='text-secondary fs-14 ps-2 w-100'>{data?.description ? data?.description : "none"}</p>
                </Fragment>
            }
        </Fragment>
    }


    return (
        <div className="col-12 col-sm-6 col-lg-4 p-2 d-inline-flex">
            <Card className="card-border w-100">
                <Card.Header className="d-flex align-items-center bg-transparent border-0">
                    <div className="col">
                        {placeholder ?
                            <p className='mb-0 placeholder w-75 rounded-1 pt-3 pb-2'></p>
                            :
                            <Fragment>
                                {[...Array(5)].map((starVal, starInd) => starInd < truck_data?.user_review_count ?
                                    <span key={starInd}>
                                        {Icons.startBlack}
                                    </span>
                                    :
                                    <span key={starInd}>
                                        {Icons.starGray}
                                    </span>
                                )}
                                < span className='text-secondary ms-1 fs-12'>({truck_data?.user_review_count})</span>
                            </Fragment>
                        }
                    </div>
                    {placeholder ?
                        <div className="col text-end">
                            <p className='mb-0 placeholder w-75 rounded-1 pt-3 pb-2'></p>
                        </div>
                        :
                        <div className="col text-end">
                            <p className='fs-12 m-0'>Post : <span className='text-secondary'>{truck_data?.user_post}</span></p>
                        </div>
                    }
                </Card.Header>

                <Card.Body className="card-body py-0">
                    <div className={`col-12 ${placeholder ? 'placeholder py-4 rounded' : 'card-blue-title'} mb-2`}>
                        <h5 className='mb-0'>{truck_data?.profile_name}</h5>
                        <p className='mb-0'>
                            {Icons.blueCardCompanyIcon}
                            <span className='ms-2'>{truck_data?.name_of_the_transport}</span>
                        </p>
                    </div>

                    {locationFun(truck_data?.from_location, truck_data?.to_location)}

                    <p className={`${placeholder ? 'placeholder py-1 rounded-1 col-7 mb-1' : 'ms-2 mt-2'} fs-12 text-secondary fw-bold  `}>Posted on : {truck_data?.updt?.slice(5, 25)}</p>

                    <hr className={placeholder ? 'm-1' : ''}/>

                    <div className="col-12 d-flex flex-wrap">
                        {cardDetails(truck_data)}
                    </div>

                    <hr className='mt-0 mb-1' />
                </Card.Body>

                <Card.Footer className="card-footer bg-transparent border-0 d-flex pt-0 mt-2">
                    <div className="col px-1">
                        <ButtonComponent
                            className={`${placeholder ? "placeholder py-2 w-100 btn-outline-secondary" : 'w-100 btn-outline-danger'}`}
                            buttonName={placeholder ? "" : 'Delete'}
                        />
                    </div>
                    <div className="col px-1">
                        <ButtonComponent
                            className={`${placeholder ? "placeholder py-2 btn-outline-secondary w-100" : 'w-100 btn-success'}`}
                            buttonName={placeholder ? "" : 'Edit'}
                        />
                    </div>
                </Card.Footer>
            </Card>
        </div >
    )
}

export default Truck_card