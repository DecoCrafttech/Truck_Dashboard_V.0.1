import React, { useEffect } from 'react'
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter';
import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import { update_crm_status_entry_user_id, updateSelectedButton } from 'Slices/Pages_slice/Crm_slice';
import { handleGetCrmDashboard, handleGetCrmModal } from 'Actions/Pages_actions/CrmActions';
import { SearchComponent } from 'ResuableFunctions/SearchFun';
import Img from 'Components/Img/Img';
import Icons from 'Utils/Icons';
import { initializeFilterDetails } from 'Slices/Pages_slice/Services_slice';
import SpinnerComponent from 'Components/Spinner/Spinner';

const Crm = () => {
    const { commonState, crmState } = useCommonState();
    const dispatch = useDispatch()

    const params = {
        page_no: commonState?.currentPage || 1,
        search_val: commonState?.search ? commonState?.search_value?.trim() || "" : "",
        data_limit: commonState?.pageSize || 10
    }

    useEffect(() => {
        if (commonState?.re_render) {
            dispatch(handleGetCrmDashboard({
                endpoint: crmState?.slected_button === "after_sale" ? "/get_crm_dashboard" : "/get_crm_before_sales",
                data: params,
                slected_button: crmState?.slected_button
            }))
        }
    }, [commonState?.currentPage, commonState?.pageSize, commonState?.re_render, crmState?.slected_button, crmState?.recall_again])

    function crmTableHeader() {
        switch (crmState?.slected_button) {
            case "after_sale":
                return <tr className='text-center'>
                    <th className="table-head">Profile image</th>
                    <th className="table-head">Status</th>
                    <th className="table-head">Entry date</th>
                    <th className="table-head">Message</th>
                    <th className="table-head">Customer Name</th>
                    <th className="table-head">category</th>
                    <th className="table-head">Phone Number</th>
                    <th className="table-head">Email</th>
                    <th className="table-head">Load post</th>
                    <th className="table-head">Truck post</th>
                    <th className="table-head">Driver post</th>
                    <th className="table-head">Buy and sell post</th>
                    <th className="table-head">Feedback</th>
                    <th className="table-head">View</th>
                </tr>

            case "before_sale":
                return <tr className='text-center'>
                    <th className="table-head">Name</th>
                    <th className="table-head">Entry date</th>
                    <th className="table-head">CRM Deal Value</th>
                    <th className="table-head">Message</th>
                    <th className="table-head">Email</th>
                    <th className="table-head">Location</th>
                    <th className="table-head">Phone Number</th>
                    <th className="table-head">View</th>
                </tr>

            default:
                break;
        }
    }

    function crmTableBody(crmVal, crmInd) {
        switch (crmState?.slected_button) {
            case "after_sale":
                return <tr className='table-body-tr text-center' key={crmInd}>
                    <td>
                        <Img
                            src={crmVal?.profile_image_name}
                            alt={crmVal?.first_name + "profile image"}
                            width="35rem"
                            height="35rem"
                            className="rounded-circle"
                        />
                    </td>
                    <td className='cursor-pointer' onClick={() => dispatch(update_crm_status_entry_user_id(crmVal?.user_id))}>{crmVal?.CRM_value}</td>
                    <td className='fs-14'>{crmVal?.CRM_entry_date?.slice(0, 25)}</td>
                    <td>{crmVal?.CRM_message}</td>
                    <td>{crmVal?.first_name}</td>
                    <td>{crmVal?.category}</td>
                    <td>{crmVal?.phone_number}</td>
                    <td>{crmVal?.email}</td>
                    <td>{crmVal?.load_post}</td>
                    <td>{crmVal?.truck_post}</td>
                    <td>{crmVal?.driver_post}</td>
                    <td>{crmVal?.buy_and_sell_post}</td>
                    <td>{crmVal?.driver_post}</td>
                    <td className='text-center cursor-pointer'>
                        <span className='w-100 text-center' onClick={() => dispatch(handleGetCrmModal({ user_id: crmVal?.user_id, slected_button: crmState?.slected_button }))}>
                            {Icons.eyeIcon}
                        </span>
                    </td>
                </tr>

            case "before_sale":
                return <tr className='table-body-tr text-center' key={crmInd}>
                    <td>{crmVal?.name}</td>
                    <td className='fs-14'>{crmVal?.CRM_entry_date?.slice(0, 25)}</td>
                    <td className='cursor-pointer' onClick={() => dispatch(update_crm_status_entry_user_id(crmVal?.sales_id))}>{crmVal?.CRM_value}</td>
                    <td>{crmVal?.CRM_message}</td>
                    <td>{crmVal?.email_id}</td>
                    <td>{crmVal?.location}</td>
                    <td>{crmVal?.phone_no}</td>
                    <td className='text-center cursor-pointer'>
                        <span className='w-100 text-center' onClick={() => dispatch(handleGetCrmModal({ user_id: crmVal?.sales_id, sales_id: crmVal?.sales_id, slected_button: crmState?.slected_button }))}>
                            {Icons.eyeIcon}
                        </span>
                    </td>
                </tr>

            default:
                break;
        }
    }

    return (
        <div className="w-100 h-100 d-flex flex-wrap align-items-center">
            <div className="w-100 card border-0 rounded-4">
                <div className="card-header rounded-top-4 bg-transparent border-0 d-flex flex-wrap align-items-center mt-3 px-3">
                    <div className="col-6">
                        <div className="col-12 col-xxl-8">
                            <p className='mb-0 fs-14 text-secondary'>Services</p>
                            <div className="col-10 row border-bottom py-2">
                                <div className="col px-1">
                                    <ButtonComponent
                                        buttonName="After Sales"
                                        className={`w-100 ${crmState?.slected_button === "after_sale" ? "btn-danger" : null}`}
                                        clickFunction={() => dispatch(updateSelectedButton("after_sale"))}
                                    />
                                </div>
                                <div className="col px-1">
                                    <ButtonComponent
                                        buttonName="Before Sales"
                                        className={`w-100 ${crmState?.slected_button === "before_sale" ? "btn-danger" : null}`}
                                        clickFunction={() => dispatch(updateSelectedButton("before_sale"))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 d-inline-flex justify-content-end">
                        <SearchComponent className="search-input-padding py-2 mb-0" placeholder="Search for anything..." />
                    </div>
                </div>
                <div className="feedback-table-height card-body">
                    <div className='d-flex flex-wrap justify-content-end p-2 pt-0'>
                        {
                            crmState?.slected_button === "before_sale" ?
                                <ButtonComponent
                                    buttonName="Add Entry"
                                    className={`${crmState?.slected_button === "before_sale" ? "btn-danger" : null}`}
                                    clickFunction={() => dispatch(initializeFilterDetails({ from: "CRM", type: "Before_Sale_Entry" }))}
                                />
                                :
                                null
                        }
                    </div>
                    {!crmState?.initalGlow ?
                        crmState?.crm_dashboard_data?.length ?
                            <div className="table-responsive h-100 overflow-scroll">
                                <table className="table table-hover">
                                    <thead>
                                        {crmTableHeader()}
                                    </thead>
                                    <tbody>
                                        {
                                            crmState?.crm_dashboard_data?.map((crmVal, crmInd) => (
                                                crmTableBody(crmVal, crmInd)
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                            :

                            <div className="feedback-table-height">
                                <div className="h-100 row align-items-center justify-content-center">
                                    <div className="col text-center">
                                        <p>No Data Found</p>
                                    </div>
                                </div>
                            </div>
                        :
                        <div className="feedback-table-height">
                            <div className="h-100 row align-items-center justify-content-center">
                                <div className="col text-center">
                                    <SpinnerComponent />
                                    <p>Getting details...</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {commonState?.totalCount ? <ServiesFooter /> : null}
        </div>
    )
}

export default Crm