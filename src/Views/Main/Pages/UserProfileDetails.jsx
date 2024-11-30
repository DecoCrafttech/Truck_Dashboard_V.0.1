import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useCustomNavigate, useDispatch } from 'Components/CustomHooks'
import Icons from 'Utils/Icons'
import Img from 'Components/Img/Img'
import ButtonComponent from 'Components/Button/Button'
import InputOnly from 'Components/Input/inputOnly'
import { isValidBase64 } from 'ResuableFunctions/ValidateBAseString'
import { updateToast } from 'Slices/Common_Slice/Common_slice'
import { handleGetDashboardProfile } from 'Actions/Pages_actions/dashboardAction'
import { useSelector } from 'react-redux'

const UserProfileDetails = () => {
    const { dashboardState } = useSelector((state) => state)
    const navigate = useCustomNavigate()
    const dispatch = useDispatch()
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id');


    useEffect(() => {
        if (isValidBase64(userId)) {
            const data = window.atob(userId)
            if (isFinite(data)) {
                dispatch(handleGetDashboardProfile({ user_id: data }))
            } else {
                navigate("/dashboard/home")
                dispatch(updateToast({ message: "Invalid id", type: "error" }))
            }
        } else {
            navigate("/dashboard/home")
            dispatch(updateToast({ message: "Invalid id", type: "error" }))
        }
    }, [])


    function userDetailsOne() {
        return [{ key: "Name", value: dashboardState?.profile_data?.name }, { key: "Mobile Number", value: dashboardState?.profile_data?.phone_number }, { key: "Date of birth", value: dashboardState?.profile_data?.date_of_birth }, { key: "Pin Code", value: dashboardState?.profile_data?.pincode }]
            .map((value, index) => (
                <div className='col-12 d-inline-flex mb-2' key={index}>
                    <div className="col-6 col-sm-4 col-md-5 col-lg-6 col-xxl-4">
                        <h6 className='text-secondary fw-bold'>{value.key}</h6>
                    </div>
                    <div className="col-6 col-sm-4 col-md-5 col-lg-6 col-xxl-4">
                        <h6 className='text-secondary'>{value.value}</h6>
                    </div>
                </div>
            ))
    }

    function userDetailsTwo() {
        return [{ key: "Mail ID", value: dashboardState?.profile_data?.mail_id }, { key: "State", value: dashboardState?.profile_data?.state }, { key: "Category", value: dashboardState?.profile_data?.category }]
            .map((value, index) => (
                <div className='col-12 d-inline-flex mb-2' key={index}>
                    <div className="col-6 col-sm-4 col-md-5 col-lg-6 col-xxl-4">
                        <h6 className='text-secondary fw-bold'>{value.key}</h6>
                    </div>
                    <div className="col-6 col-sm-4 col-md-5 col-lg-6 col-xxl-4">
                        <h6 className='text-secondary'>: {value.value}</h6>
                    </div>
                </div>
            ))
    }

    function postDetails() {
        return [{ title: "Total Load Post", value: dashboardState?.dashboard_profile_data?.total_load_post }, { title: "Total Truck Post", value: dashboardState?.dashboard_profile_data?.total_truck_post }, { title: "Total Driver Post", value: dashboardState?.dashboard_profile_data?.total_driver_post }, { title: "Total Buy/Sell Post", value: dashboardState?.dashboard_profile_data?.total_buy_and_sell }, { title: "Total Truck Added", value: dashboardState?.dashboard_profile_data?.total_truck_added }]
            .map((value, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 post_details_width p-1" key={index}>
                    <div className="border border-danger rounded p-3">
                        <p>{value.value}</p>
                        <h6 className='mb-0'>{value.title}</h6>
                    </div>
                </div>
            ))
    }

    function vehicleDynamicDateStatus(date, title, data) {
        if (title === "RC Status") {
            if (data?.date?.toLowerCase() === "active") {
                return <div className="green-circle">
                    <p className='d-none'>green</p>
                </div>
            } else {
                return <div className="red-circle">
                    <p className='d-none'>red</p>
                </div>
            }
        }
        else {
            const today = new Date();
            const target = new Date(date);

            if (target < today) {
                return <div className="red-circle">
                    <p className='d-none'>red</p>
                </div>
            }
            else if (target <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)) {
                return <div className="yellow-circle">
                    <p className='d-none'>yellow</p>
                </div>
            }
            else {
                return <div className="green-circle">
                    <p className='d-none'>green</p>
                </div>
            }
        }
    }

    function vehicleStatus(vehData, vehInd) {
        return [{ title: "Fitness UpTo", date: vehData?.fit_up_to }, { title: "Insurance", date: vehData?.insurance_upto }, { title: "PUCC", date: vehData?.pucc_upto }, { title: "Road Tax", date: vehData?.fit_up_to }, { title: "RC Status", date: vehData?.rc_status }]
            .map((sts, stsInd) => (
                <div className="col-12 d-inline-flex p-2 border-bottom" key={vehInd + stsInd}>
                    <div className="col-10">
                        <h6 className='mb-1'>{sts.title}</h6>
                        <p className='mb-1 text-secondary fs-13'>{sts.date ? sts.date : "Null"}</p>
                    </div>
                    <div className="col-2">
                        {vehicleDynamicDateStatus(sts.date, sts.title, sts)}
                    </div>
                </div>
            ))
    }

    return (
        <div className='container-fluid h-100'>
            <div className="w-100 col-12 d-flex flex-wrap">
                <div className="col-6">
                    <ButtonComponent
                        className="btn-outline-dark px-3"
                        clickFunction={() => navigate("/dashboard/home")}
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
                <div className="col-6 text-end">
                    <ButtonComponent
                        className="btn-outline-dark px-5"
                        buttonName="Edit"
                    />
                </div>
            </div>

            <div className="card mt-4 border-0 h-100 overflow-scroll pb-5">
                <div className="card-body p-5 ">
                    <div className="w-100 d-flex flex-wrap align-items-center justify-content-center">
                        <div className="profile-image-width text-center">
                            <Img
                                src={dashboardState?.profile_data?.profile_image_name}
                                alt="user-image"
                                width="200px"
                                height="200px"
                                className="rounded-circle"
                            />
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 profile-main-data mt-3 mt-lg-0">
                            {userDetailsOne()}
                        </div>
                        <div className="col-12 col-sm col-lg-4 profile-main-data mt-3 mt-lg-0">
                            {userDetailsTwo()}
                        </div>
                    </div>

                    <section className="w-100 d-flex flex-wrap align-items-center bg-light mt-4 p-3 rounded">
                        <div className="col-6">
                            <h6 className='mb-0'>Aadhar - 1232 1233 1231 1231</h6>
                        </div>
                        <div className="col-6 text-end">
                            <p className='m-0 me-4 verified-bg d-inline-block'>Verified</p>
                        </div>
                    </section>

                    <section className="w-100 d-flex flex-wrap align-items-center mt-4 p-1">
                        {postDetails()}
                    </section>

                    <section className="w-100 d-flex flex-wrap align-items-center mt-4 p-1">
                        <div className="col-12 col-md-8 col-lg-7 col-xxl-5 d-inline-flex flex-wrap">
                            <div className="col-8">
                                <InputOnly
                                    type="text"
                                    className="search-input-padding border"
                                    placeholder="Enter Vehicle Number"
                                    change={(e) => console.log(e.target.value)}
                                    keyDown={(e) => console.log(e.code)}
                                />
                            </div>

                            <div className="col-4">
                                <ButtonComponent
                                    className="custom-success fs-15 ms-2"
                                    buttonName="Add Vehicle"
                                    title="Add Vehicle"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="w-100 mt-4 p-1 ">
                        <Card className='rounded-1 w-100'>
                            <Card.Body className='d-flex flex-wrap'>
                                {dashboardState?.dashboard_profile_data?.vehicle_data?.map((vehItem, vehInd) => (
                                    <div className='col-6 col-lg-4 p-1' key={vehInd}>
                                        <Card className='rounded-2'>
                                            <Card.Body>
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <div className="col-11 ">
                                                        <h6 className='mb-0'>{vehItem?.vehicle_no}</h6>
                                                    </div>
                                                    <div className="col-1">
                                                        {Icons.deleteIcon}
                                                    </div>
                                                </div>

                                                <div className="border d-flex flex-wrap align-items-center rounded-2 mt-2">
                                                    {vehicleStatus(vehItem, vehInd)}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </section>


                    <section className="w-100 mt-4 p-1">
                        <Card className='rounded-1'>
                            <Card.Header className='py-3 bg-transparent border-0'>
                                <div className="col-12 d-inline-flex flex-wrap align-items-center">
                                    <div className="col-4">
                                        <h5 className=''>Load Post</h5>
                                    </div>
                                    <div className="col-8 d-inline-flex flex-wrap justify-content-end pe-4">
                                        <div className="col-6">
                                            <InputOnly
                                                type="text"
                                                className="search-input-padding border"
                                                placeholder="Search Here"
                                                change={(e) => console.log(e.target.value)}
                                                keyDown={(e) => console.log(e.code)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <ButtonComponent
                                                className="custom-success fs-15 ms-2"
                                                buttonName="Search"
                                                title="Search"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </section>

                    <section className="w-100 mt-4 p-1">
                        <Card className='rounded-1'>
                            <Card.Header className='py-3 bg-transparent border-0'>
                                <div className="col-12 d-inline-flex flex-wrap align-items-center">
                                    <div className="col-4">
                                        <h5 className=''>Buy & Sell Post</h5>
                                    </div>
                                    <div className="col-8 d-inline-flex flex-wrap justify-content-end pe-4">
                                        <div className="col-6">
                                            <InputOnly
                                                type="text"
                                                className="search-input-padding border"
                                                placeholder="Search Here"
                                                change={(e) => console.log(e.target.value)}
                                                keyDown={(e) => console.log(e.code)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <ButtonComponent
                                                className="custom-success fs-15 ms-2"
                                                buttonName="Search"
                                                title="Search"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </section>

                    <section className="w-100 d-flex flex-wrap align-items-center bg-light mt-4 p-3 rounded">
                        <div className="col-6">
                            <h6 className='mb-0'>Delete This Account</h6>
                        </div>
                        <div className="col-6 text-end">
                            <ButtonComponent
                                className="btn-primary fs-15 ms-2  px-4"
                                buttonName="Delete"
                                title="Delete"
                            />
                        </div>
                    </section>
                </div>
            </div >
        </div >
    )
}

export default UserProfileDetails