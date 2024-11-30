import React from 'react'
import { useSelector } from 'react-redux';
import InputOnly from 'Components/Input/inputOnly';
import Icons from 'Utils/Icons';
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter';

const Feedback = () => {
    const { totalCount, pageSize, currentPage, showing_entries } = useSelector((state) => state.commonState);

    return (
        <div className="w-100 h-100 d-flex flex-wrap align-items-center">
            <div className="w-100 card border-0 rounded-4">
                <div className="card-header rounded-top-4 bg-transparent border-0 d-flex flex-wrap mt-3 px-3">
                    <div className="col-6">
                        <h5>Feedback and Complaint</h5>
                    </div>
                    <div className="col-6 d-inline-flex justify-content-end">
                        <div className="col-12 col-md-6 position-relative">
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
                </div>
                <div className="feedback-table-height p-3 card-body">
                    <div className="table-responsive h-100 overflow-scroll">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th className="table-head">Complaint ID</th>
                                    <th className="table-head">Customer Name</th>
                                    <th className="table-head">Category</th>
                                    <th className="table-head">Phone Number</th>
                                    <th className="table-head">Email</th>
                                    <th className="table-head">Feedback</th>
                                    <th className="table-head">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table-body-tr'>
                                    <td>1</td>
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
            </div>

            { totalCount ? <ServiesFooter /> : null }
        </div>
    )
}

export default Feedback