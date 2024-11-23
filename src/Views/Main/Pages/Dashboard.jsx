import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import JsonData from 'Utils/JsonData'
import InputOnly from 'Components/Input/inputOnly';
import Icons from 'Utils/Icons';
import Pagination from 'Components/Pagination/Pagination';
import SelectBox from 'Components/Input/SelectBox';


const Dashboard = () => {
    const { totalCount, pageSize, currentPage, showing_entries } = useSelector((state) => state.commonState);
    const dashboardMenu = JsonData()?.jsxJson?.dashboardMenus;


    function dashboardBasicMetrics() {
        return dashboardMenu?.map((value, index) => (
            <div className="col-3 px-2">
                <div className="card border-0">
                    <div className="card-body">
                        <div className="d-block">
                            <span className='dashboard-icon'>{value?.icon}</span>
                        </div>
                        <p className='my-3'>{value?.content}</p>
                        <p className='mt-2 mb-0 fs-17 fw-bold'>{value?.value}</p>
                    </div>
                </div>
            </div>
        ))
    }
    return (
        <Fragment>
            <div className="w-100 d-flex flex-wrap">
                {dashboardBasicMetrics()}
            </div>
            <div className="mt-3 w-100 d-flex flex-wrap justify-content-end">
                <div className="position-relative col-xxl-3">
                    <InputOnly
                        type="text"
                        className="search-input-padding mb-3"
                        placeholder="Search for anything..."
                        change={(e) => console.log(e.target.value)}
                        keyDown={(e) => console.log(e.code)}
                    />

                    <span className="input-group-start-icon">{Icons.searchIcon}</span>
                    <span className="input-group-end-icon-one">{Icons.searchCancelIcon}</span>
                    <span className="input-group-end-icon-two">{Icons.searchIcon}</span>
                </div>
            </div>
            <div className="w-100">
                <div className="card border-0">
                    <div className="dashboard-table-height">
                        <div class="table-responsive h-100 overflow-scroll rounded">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th scope="table-head">Profile</th>
                                        <th scope="table-head">Name</th>
                                        <th scope="table-head">Phone Number</th>
                                        <th scope="table-head">Category</th>
                                        <th scope="table-head">No.Of.Post</th>
                                        <th scope="table-head">Aadhar</th>
                                        <th scope="table-head">View-profile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card-footer w-100 d-flex flex-wrap border-0 bg-transparent ">
                        <div className="col-12 col-md-6">
                            <div className='col-12 d-inline-flex flex-wrap align-items-center'>
                                <p className='m-0'>Showing</p>
                                <div className="select-table-sizer mx-2">
                                    <SelectBox
                                        selectBoxSize="sm"
                                        selectOptions={showing_entries}
                                        className="col"
                                        disableSelectBox={false}
                                    />
                                </div>
                                <p className='m-0'>of 50</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-inline-flex justify-content-end">
                            <Pagination totalCount={totalCount} currentPage={currentPage} pageSize={pageSize} />
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}

export default Dashboard