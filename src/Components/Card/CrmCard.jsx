import React from 'react'
import { Card } from 'react-bootstrap'

const CrmCard = ({
    placeholder,
    crmData
}) => {


    return (
        placeholder ?
            [1, 2, 3, 4]?.map((v, i) => (
                <div className="col-6 p-1">
                    <Card className='W-100 rounded-3 h-100'>
                        <Card.Body className='pb-1' >
                            <h6 className={placeholder ? 'placeholder w-75 py-3 rounded-2' : ''}>
                                {crmData?.heading1}
                            </h6>

                            <p className={placeholder ? 'placeholder w-75 py-3 rounded-2' : ''}>
                                {crmData?.heading1}
                            </p>

                            <p className={placeholder ? 'placeholder w-100 py-4 pb-5 rounded-2' : 'mb-0 text-secondary'}>
                                {crmData?.blog_content}
                            </p>

                            <p className={placeholder ? 'placeholder w-100 py-3 rounded-2' : ''}>
                                {crmData?.heading1}
                            </p>
                        </Card.Body>
                    </Card >
                </div>
            ))

            :

            crmData?.length ?
                crmData?.map((v, i) => (
                    <div className="col-6 p-1">
                        <Card className='W-100 rounded-3 h-100'>
                            <Card.Body className='pb-1' >
                                <h6 className='m-0 py-2'>
                                    <span className='fw-bold fs-17 pe-2'>crm_status:</span>
                                    <span>{v?.crm_status}</span>
                                </h6>

                                <p className='m-0 py-2'>
                                    <span className='fw-bold fs-17 pe-2'>entry_date:</span>
                                    <span>{v?.entry_date}</span>
                                </p>

                                <p className='p-0'>
                                    <span className='fw-bold fs-17 pe-2'>message:</span>
                                    <span>{v?.message}</span>
                                </p>

                                <p className={placeholder ? 'placeholder w-100 py-3 rounded-2' : ''}>
                                    {v?.heading1}
                                </p>
                            </Card.Body>
                        </Card >
                    </div>
                ))

                :

                <div className="crm_model_no_data_height w-100 d-flex flex-wrap align-items-center justify-content-center">
                    <div className="col-6 p-1 text-center">
                        <p>No Data Found</p>
                    </div>
                </div>
    )
}

export default CrmCard