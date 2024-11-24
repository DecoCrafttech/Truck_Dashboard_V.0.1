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
    change,
    multiple,
    value
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
                multiple={multiple}
                value={value}
            />
            {
                inputError ?
                    <div className='text-danger pt-2 ps-1 fs-15'>
                        {inputError}
                    </div>
                    :
                    null
            }

        </>
    )
}

export default Input