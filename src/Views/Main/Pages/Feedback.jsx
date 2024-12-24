import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter';
import { handleGetFeedbackComplaints } from 'Actions/Pages_actions/FeedbackAction';
import ButtonComponent from 'Components/Button/Button';
import { updateFeedbackModal } from 'Slices/Pages_slice/Feedback_slice';
import { SearchComponent } from 'ResuableFunctions/SearchFun';

const Feedback = () => {
    const { commonState, feedbackState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const params = {
        page_no: commonState?.currentPage || 1,
        search_val: commonState?.search_clicked ? commonState?.search_value || "" : "",
        data_limit: commonState?.pageSize || 10
    }

    useEffect(() => {
        if (commonState?.search_clicked) {
            dispatch(handleGetFeedbackComplaints(params))
        }
        else {
            dispatch(handleGetFeedbackComplaints(params))
        }

    }, [commonState?.pageSize, commonState?.currentPage, commonState?.search_clicked, feedbackState?.re_render])

    function dynamicActionButton(sts, data) {
        switch (sts) {
            case "":
            case "not solved":
                return <ButtonComponent
                    className="btn-danger feedback-danger"
                    title="Not solved"
                    buttonName="Not solved"
                    clickFunction={() => dispatch(updateFeedbackModal({ from: "Feedback", type: "not solved", data: data }))}
                />

            case "solved":
            case "Solved":
                return <ButtonComponent
                    className="btn-success feedback-success px-4"
                    title="solved"
                    buttonName="solved"
                    clickFunction={() => dispatch(updateFeedbackModal({ from: "Feedback", type: "solved", data: data }))}
                />

            default:
                break;
        }
    }
    return (
        <div className="w-100 h-100 d-flex flex-wrap align-items-center">
            <div className="w-100 card border-0 rounded-4">
                <div className="card-header rounded-top-4 bg-transparent border-0 d-flex flex-wrap mt-3 px-3">
                    <div className="col-6">
                        <h5>Feedback and Complaint</h5>
                    </div>
                    <div className="col-6 d-inline-flex justify-content-end">
                        <SearchComponent className="search-input-padding py-2 mb-0" placeholder="Search for anything..." />
                    </div>
                </div>
                {
                    feedbackState?.feeback_data?.length ?
                        <div className="feedback-table-height p-3 card-body">
                            <div className="table-responsive h-100 overflow-scroll">
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th className="table-head">Complaint ID</th>
                                            <th className="table-head">Entry Type</th>
                                            <th className="table-head">Customer Name</th>
                                            <th className="table-head">Category</th>
                                            <th className="table-head">Phone Number</th>
                                            <th className="table-head">Email</th>
                                            <th className="table-head">Feedback</th>
                                            <th className="table-head">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            feedbackState?.feeback_data?.map((v, i) => (
                                                <tr className='table-body-tr'>
                                                    <td>{v?.complaint_id}</td>
                                                    <td>{v?.entry_type}</td>
                                                    <td>{v?.customer_name}</td>
                                                    <td>{v?.category}</td>
                                                    <td>{v?.phone_no}</td>
                                                    <td>{v?.email_id}</td>
                                                    <td>{v?.content}</td>
                                                    <td>{dynamicActionButton(v?.status, v)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        null
                }
            </div>

            {commonState?.totalCount ? <ServiesFooter /> : null}
        </div >
    )
}

export default Feedback