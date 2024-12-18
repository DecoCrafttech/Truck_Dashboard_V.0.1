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
                    <Card className='W-100 shadow rounded-3 h-100'>
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

            <div className="col-6 p-1">
                <Card className='W-100 shadow rounded-3 h-100'>
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
    )
}

export default CrmCard