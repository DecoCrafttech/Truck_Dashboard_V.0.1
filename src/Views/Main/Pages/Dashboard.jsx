import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import JsonData from 'Utils/JsonData' 
import Icons from 'Utils/Icons';
import Pagination from 'Components/Pagination/Pagination';
import SelectBox from 'Components/Input/SelectBox';
import { handleGetDashboard } from 'Actions/Pages_actions/dashboardAction';
import { useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { updateEntriesCount} from 'Slices/Common_Slice/Common_slice';
import { SearchComponent } from 'ResuableFunctions/SearchFun';
import Img from 'Components/Img/Img';


const Dashboard = () => {
    const { commonState, dashboardState } = useSelector((state) => state);
    const dashboardMenu = JsonData()?.jsxJson?.dashboardMenus;
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    const params = {
        page_no: commonState?.currentPage || 1,
        search_val: commonState?.search_clicked ? commonState?.search_value || "" : "",
        data_limit: commonState?.pageSize || 10
    }

    useEffect(() => {
        dispatch(handleGetDashboard(params))
    }, [commonState?.pageSize, commonState?.currentPage, commonState?.search_clicked])


    function dashboardBasicMetrics() {
        return dashboardMenu?.map((value, index) => (
            <div className="col-3 px-2" key={index}>
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
                <SearchComponent className="search-input-padding mb-3" placeholder="Search for anything..."/>
            </div>
            <div className="w-100">
                <div className="card border-0">
                    <div className="dashboard-table-height">
                        <div className="table-responsive h-100 overflow-scroll rounded">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="table-head" className='text-center'>Profile</th>
                                        <th scope="table-head">Name</th>
                                        <th scope="table-head">Phone Number</th>
                                        <th scope="table-head" >Category</th>
                                        <th scope="table-head" className='text-center'>No.Of.Post</th>
                                        <th scope="table-head" className='text-center'>Aadhar</th>
                                        <th scope="table-head" className='text-center'>View-profile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dashboardState?.dashboard_data?.profile?.map((dashboardItem, dashboardIndex) => (
                                            <tr key={dashboardIndex}>
                                                {/* <th>{(commonState?.currentPage - 1) * commonState?.pageSize + (dashboardIndex + 1)}</th> */}
                                                <td className='text-center'>
                                                    <Img
                                                        src={dashboardItem?.profile_image_name}
                                                        alt={dashboardItem?.first_name + "profile image"}
                                                        width="35rem"
                                                        height="35rem"
                                                        className="rounded-circle"
                                                    />
                                                </td>
                                                <td>{dashboardItem?.first_name}</td>
                                                <td>{dashboardItem?.phone_number}</td>
                                                <td >{dashboardItem?.category}</td>
                                                <td className='text-center'>{dashboardItem?.post_count} Posts</td>
                                                <td className='text-center'>{dashboardItem?.is_aadhar_verified ? <span className='text-success'>Verified</span> : <span className='text-danger'>Not Verified</span>}</td>
                                                <td className='text-center cursor-pointer'>
                                                    <span className='w-100 text-center' onClick={() => navigate(`/dashboard/home/profile?id=${window.btoa(dashboardItem?.user_id)}`)}>
                                                        {Icons.eyeIcon}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card-footer w-100 d-flex flex-wrap border-0 bg-transparent ">
                        <div className="col-12 col-md-6">
                            <div className='col-12 d-inline-flex flex-wrap align-items-center'>
                                <p className='m-0'>Entries</p>
                                <div className="select-table-sizer mx-2">
                                    <SelectBox
                                        selectBoxSize="sm"
                                        selectOptions={commonState?.showing_entries}
                                        className="col"
                                        disableSelectBox={false}
                                        change={(e) => dispatch(updateEntriesCount(e.target.value))}
                                        value={commonState?.pageSize}
                                        componentFrom="Entries"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-inline-flex justify-content-end">
                            <Pagination totalCount={commonState?.totalCount} currentPage={commonState?.currentPage} pageSize={commonState?.pageSize} />
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}

export default Dashboard