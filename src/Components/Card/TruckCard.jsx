import { handleDeleteModal, handleEditModal } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import { useDispatch } from 'Components/CustomHooks'
import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'
import Icons from 'Utils/Icons'
import JsonData from 'Utils/JsonData'

const TruckCard = ({
    placeholder,
    truck_data,
    is_delete_card,
    commonState
}) => {
    const dispatch = useDispatch();
    const { states } = JsonData()?.jsonOnly

    function locationFun(from, to) {
        return <Fragment>
            {[{ icon: Icons.greenLocationIcon, location: from }, { icon: Icons.redLocationIcon, location: to }]
                .map((value, index) => (
                    <p className={`${placeholder ? 'placeholder py-2 pb-3 rounded-1 col-7' : ''} info-icon fs-13 mb-2 ${index === 0 && !placeholder ? 'location-dotted' : ''}`} key={index}>
                        {placeholder ? null : <span className='me-1'>{value.icon}</span>}

                        {value?.location ?
                            Array.isArray(value?.location) ?
                                `${value.location[0]}...`
                                :
                                typeof value.location === "string" ?
                                    value.location
                                    :
                                    value.location[0]
                            :
                            null}

                        <div className="info-hover-text d-none bg-secondary-subtle p-1 mt-3 px-2 text-break">
                            {value?.location ?
                                Array.isArray(value?.location)
                                    ? value?.location?.join(", ")
                                    : typeof value?.location === "string"
                                        ? value?.location
                                        : ""
                                :
                                null
                            }
                        </div>
                    </p>
                ))}
        </Fragment>
    }

    function cardDetails(data) {
        return <Fragment>
            {[{ icon: Icons.materialIcon, value: `${data?.tone} Tone` }, { icon: Icons.numberPlateIcon, value: data?.vehicle_number }, { icon: Icons.wheelIcon, value: `${data?.no_of_tyres} Wheels` },
            { icon: Icons.containerIcon, value: data?.truck_body_type }, { icon: Icons.truckNumberPlateIcon, value: data?.truck_name }, { icon: Icons.blueCardCompanyIcon, value: data?.company_name }]
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
                <Fragment>
                    <h6 className='text-secondary w-100 fs-15'>Description</h6>
                    <p className='text-secondary fs-13 ps-2 w-100'>{data?.description ? data?.description : "none"}</p>
                </Fragment>
            }
        </Fragment>
    }

    function handleEditData(truck_data) {
        let selectedList = []
        for (let i = 0; i < states?.length; i++) {
            for (let j = 0; j < truck_data?.to_location?.length; j++) {
                if (states[i]?.label === truck_data?.to_location[j]) {
                    selectedList[selectedList.length] = states[i]
                }
            }
        }

        dispatch(handleEditModal({ from: "Truck", type: "Edit", data: { ...truck_data, to_location: selectedList } }))
    }

    return (
        <div className={`${is_delete_card ? "col-12" : "col-12 col-sm-6 col-lg-4"} p-2 d-inline-flex`}>
            <Card className="card-border rounded-3 w-100 shadow border-0">
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
                        <h5 className='mb-0 fs-14'>{truck_data?.profile_name}</h5>
                        <p className='mb-0'>
                            {Icons.blueCardCompanyIcon}
                            <span className='ms-2'>{truck_data?.name_of_the_transport}</span>
                        </p>
                    </div>

                    {locationFun(truck_data?.from_location, truck_data?.to_location)}

                    <p className={`${placeholder ? 'placeholder py-1 rounded-1 col-7 mb-1' : 'ms-2 mt-2'} fs-12 text-secondary fw-bold  `}>Posted on : {truck_data?.updt?.slice(5, 25)}</p>

                    <hr className={placeholder ? 'm-1 d-none' : ''} />

                    <div className="col-12 d-flex flex-wrap">
                        {cardDetails(truck_data)}
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
                        <Card.Footer className="card-footer bg-transparent border-0 d-flex pt-0 mt-1">
                            <div className="col px-1">
                                <ButtonComponent
                                    className={`${placeholder ? "placeholder py-2 w-100 btn-outline-secondary" : 'fs-13 w-100 btn-outline-danger'}`}
                                    buttonName={placeholder ? "" : 'Delete'}
                                    clickFunction={() => dispatch(handleDeleteModal({ from: "Truck", type: "Delete", data: truck_data }))}
                                    btnDisable={["admin"].includes(commonState?.user_role)}
                                />
                            </div>
                            <div className="col px-1">
                                <ButtonComponent
                                    className={`${placeholder ? "placeholder py-2 btn-outline-secondary w-100" : 'fs-13 w-100 btn-success'}`}
                                    buttonName={placeholder ? "" : 'Edit'}
                                    clickFunction={() => handleEditData(truck_data)}
                                    btnDisable={["admin"].includes(commonState?.user_role)}
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

export default TruckCard