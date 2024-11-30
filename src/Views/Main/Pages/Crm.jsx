import React from 'react'
import { useSelector } from 'react-redux';
import SelectBox from 'Components/Input/SelectBox'
import InputOnly from 'Components/Input/inputOnly';
import Icons from 'Utils/Icons';
import JsonData from 'Utils/JsonData';
import ServiesFooter from 'Components/Panel_compnent/ServiesFooter';

const Crm = () => {
    const { totalCount } = useSelector((state) => state.commonState);
    const Json = JsonData()?.jsonOnly;


    return (
        <div className="w-100 h-100 d-flex flex-wrap align-items-center">
            <div className="w-100 card border-0 rounded-4">
                <div className="card-header rounded-top-4 bg-transparent border-0 d-flex flex-wrap align-items-center mt-3 px-3">
                    <div className="col-6">
                        <div className="col-8">
                            <p className='mb-0 fs-14 text-secondary'>Services</p>
                            <SelectBox
                                selectBoxSize="md"
                                selectOptions={Json?.services}
                                className="col"
                                disableSelectBox={false}
                            />
                        </div>
                    </div>
                    <div className="col-6 d-inline-flex justify-content-end">
                        <div className="col-12 col-md-6 position-relative">
                            <InputOnly
                                type="text"
                                className="search-input-padding"
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
                <div className="feedback-table-height card-body">
                    <div className="table-responsive h-100 overflow-scroll">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th className="table-head">Complaint ID</th>
                                    <th className="table-head">Customer Name</th>
                                    <th className="table-head">Update</th>
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

export default Crm