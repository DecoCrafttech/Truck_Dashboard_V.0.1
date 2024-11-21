import Form from 'react-bootstrap/Form';

const Input = ({
    componentFrom,
    className,
    htmlFor,
    type,
    placeholder,
    label,
    labelClassName,
    mandatory,
    inputError,
    change
}) => {

    return (
        <>
            <Form.Label htmlFor={htmlFor} className={labelClassName}>
                {label}

                {
                    mandatory ?
                        <span className='text-danger ms-1'>*</span>
                        :
                        null
                }

            </Form.Label>
            <Form.Control
                type={type}
                id={htmlFor}
                placeholder={placeholder}
                className={className}
                onChange={change}
            />
            {
                inputError ?
                    <Form.Text id={label + "Block"} muted>
                        {inputError}
                    </Form.Text>
                    :
                    null
            }

        </>
    )
}

export default Input