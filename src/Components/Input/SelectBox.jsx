import React from 'react'
import { Form } from 'react-bootstrap'

const SelectBox = ({
    selectBoxSize,
    selectOptions,
    className,
    defaultOption,
    disableSelectBox,
    change
}) => {

    return (
        <Form.Select size={selectBoxSize} className={className} disabled={disableSelectBox} onChange={change}>
            {
                selectOptions?.map((value, ind) => {
                    return <option value={value}>{value}</option>
                })
            }
        </Form.Select>
    )
}

export default SelectBox