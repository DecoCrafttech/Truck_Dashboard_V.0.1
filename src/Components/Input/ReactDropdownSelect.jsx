import React, { Fragment } from 'react'
import Select from 'react-dropdown-select'

const ReactDropdownSelect = ({
    componentFrom,
    name,
    isMandatory,
    multi,
    options,
    value,
    change,
    labelField,
    valueField,
    className
}) => {
    return (
        <Fragment>
            <h6 className="text-secondary mt-2 mb-0 fs-14">
                {name}
                {
                    isMandatory ?
                        <span className='text-danger ms-1'>*</span>
                        :
                        null
                }

            </h6>
            <Select
                multi={multi}
                options={options}
                labelField={labelField}
                valueField={valueField}
                values={value}
                onChange={change}
                className={className}
            />
        </Fragment>
    )
}

export default ReactDropdownSelect