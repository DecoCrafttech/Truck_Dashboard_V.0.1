import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

const InputOnly = ({
    componnetFrom, 
    placeholder,
    value,
    change, 
    keyDown,
    className
}) => {
    return (
        <InputGroup className="mb-3">
            <Form.Control
                placeholder={placeholder}
                value={value}
                onChange={change}
                onKeyDown={keyDown}
                className={className}
            />
        </InputGroup>
    )
}

export default InputOnly