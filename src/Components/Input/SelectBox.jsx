import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap'

const SelectBox = ({
    selectBoxSize,
    selectOptions,
    className,
    defaultOption,
    disableSelectBox,
    change,
    htmlFor,
    labelClassName,
    label,
    mandatory
}) => {

    return (
        <Fragment>
            {label ?
                <Form.Label htmlFor={htmlFor} className={labelClassName}>
                    {label}

                    {
                        mandatory ?
                            <span className='text-danger ms-1'>*</span>
                            :
                            null
                    }

                </Form.Label>
                :
                null
            }
            <Form.Select size={selectBoxSize} className={className} disabled={disableSelectBox} onChange={change}>
                {
                    selectOptions?.map((value, ind) => {
                        return <option value={value} key={ind}>{value}</option>
                    })
                }
            </Form.Select>
        </Fragment>
    )
}

export default SelectBox