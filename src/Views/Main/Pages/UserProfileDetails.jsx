import React from 'react'
import { Card } from 'react-bootstrap'
import { useCustomNavigate } from 'Components/CustomHooks'
import Icons from 'Utils/Icons'
import Img from 'Components/Img/Img'
import ButtonComponent from 'Components/Button/Button'
import InputOnly from 'Components/Input/inputOnly'

const UserProfileDetails = () => {
    const navigate = useCustomNavigate()

    function userDetailsOne() {
        return [{ key: "Name", value: "Krishna" }, { key: "Mobile Number", value: "9787533778" }, { key: "Date of birth", value: "18-03-2000" }, { key: "Pin Code", value: "627415" }]
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

    function userDetailsTwo() {
        return [{ key: "Name", value: "Krishna" }, { key: "Mobile Number", value: "9787533778" }, { key: "Date of birth", value: "18-03-2000" }, { key: "Pin Code", value: "627415" }]
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
        return [{ title: "Total Load Post", value: 16 }, { title: "Total Truck Post", value: "9787533778" }, { title: "Total Driver Post", value: "18-03-2000" }, { title: "Total Buy/Sell Post", value: "627415" }, { title: "Total Truck Added", value: "627415" }]
            .map((value, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 post_details_width p-1" key={index}>
                    <div className="border border-danger rounded p-3">
                        <p>{value.value}</p>
                        <h6 className='mb-0'>{value.title}</h6>
                    </div>
                </div>
            ))
    }

    function vehicleDynamicDateStatus(date) {
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

    function vehicleStatus(status) {
        return [{ title: "Fitness UpTo", date: "2024-10-1" }, { title: "Insurance", date: "2024-12-22" }, { title: "PUCC", date: "2025-1-1" }, { title: "Road Tax", date: "2023-1-1" }, { title: "RC Status", date: "2024-12-21" }]
            .map((sts, stsInd) => (
                <div className="col-12 d-inline-flex p-2 border-bottom" key={stsInd}>
                    <div className="col-10">
                        <h6 className='mb-1'>{sts.title}</h6>
                        <p className='mb-1 text-secondary fs-13'>{sts.date}</p>
                    </div>
                    <div className="col-2">
                        {vehicleDynamicDateStatus(sts.date)}
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
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s"
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

                    <section className="w-100 mt-4 p-1">
                        <Card className='rounded-1'>
                            <Card.Body>

                                <div className='col-4'>
                                    <Card className='rounded-2'>
                                        <Card.Body>
                                            <div className="d-flex flex-wrap align-items-center">
                                                <div className="col-11 ">
                                                    <h6 className='mb-0'>TN67AN1212</h6>
                                                </div>
                                                <div className="col-1">
                                                    {Icons.deleteIcon}
                                                </div>
                                            </div>

                                            <div className="border d-flex flex-wrap align-items-center rounded-2 mt-2">
                                                {vehicleStatus()}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>


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
            </div>
        </div>
    )
}

export default UserProfileDetails