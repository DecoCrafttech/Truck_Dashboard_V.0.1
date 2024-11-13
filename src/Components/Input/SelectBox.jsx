import React from 'react'
import { Form } from 'react-bootstrap'

const SelectBox = ({
    selectBoxSize,
    selectOptions,
    defaultOption,
    disableSelectBox,
    change
}) => {
    return (
        <Form.Select size={selectBoxSize} disabled={!disableSelectBox} onChange={change}>
            <option value={JSON.stringify('')}>{defaultOption}</option>

            {
                selectOptions?.map((value, ind) => {
                    return <option value={JSON.stringify(value)}>{value.service_name}</option>
                })
            }
        </Form.Select>
    )
}

export default SelectBox