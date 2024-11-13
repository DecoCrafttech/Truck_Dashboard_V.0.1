import React from 'react'
import { Form } from 'react-bootstrap'

const Textbox = ({
    componentFrom,
    className,
    controlId,
    label,
    rows,
    cols,
    change,
    value
}) => {

    return (
        <Form.Group className={`mb-3 ${className}`} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="textarea" rows={rows} cols={cols} onChange={change} value={value}/>
        </Form.Group>
    )
}

export default Textbox