import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import sha256 from 'sha256'; 
import InputGroup from 'Components/Input/InputGroup';
import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import SpinnerComponent from 'Components/Spinner/Spinner';
import { handleEyeFunction, handleLogin, handleLoginCredentials, handleValidation } from 'Actions/Common_actions/Common_action';

const LoginForm = () => {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    const handlSubmitOnEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (commonState?.usernamee && commonState?.passwordd) {
            let username = commonState?.usernamee
            let password = commonState?.passwordd
            const basicAuth = { username, password };
            dispatch(handleLogin(basicAuth))
        } else {
            dispatch(handleValidation)
        }
    };

    useEffect(() => {
        if (commonState?.user_id && commonState?.user_role) {
            switch (commonState?.user_role) {
                case "Super Admin":
                    navigate("/dashboard/home")
                    break;

                case "admin":
                case "Admin":
                    navigate("/dashboard/home")
                    break;

                case "Employee":
                    navigate("/dashboard/services/insurance")
                    break;

                case "SEO Specialist":
                    navigate("/dashboard/blog")
                    break;

                default:
                    break;
            }
        }
    }, [commonState?.token, commonState?.user_id, commonState?.user_role, dispatch])

    return (
        <Form noValidate validated={commonState?.validated} className='pb-3'>
            <Row className="mb-3">
                <InputGroup
                    controlId="validationLoginUsername"
                    gropuClassName="col-12 py-2 text-secondary mb-2"
                    inputHeading="Username"
                    inputType="text"
                    placeholder="Username"
                    inputError="Username required"
                    change={(e) => dispatch(handleLoginCredentials({ username: e.target.value }))}
                    value={commonState?.usernamee}
                />

                <InputGroup
                    controlId="validationLoginPassword"
                    gropuClassName="col-12 py-2 text-secondary"
                    inputHeading="Password"
                    inputType="password"
                    placeholder="Password"
                    inputError="Password required"
                    value={commonState?.passwordd}
                    eyeState={!commonState?.eyeOpen}
                    change={(e) => dispatch(handleLoginCredentials({ password: e.target.value }))}
                    eyeFunctionClick={() => dispatch(handleEyeFunction())}
                    keyDown={handlSubmitOnEnter}
                />
            </Row>

            <ButtonComponent
                type="button"
                className="btn-md btn-primary w-100"
                clickFunction={handleSubmit}
                title="Login"
                buttonName={commonState?.buttonSpinner ?
                    <SpinnerComponent />
                    :
                    "Login"
                }
                btnDisable={commonState?.buttonSpinner}
            />
        </Form>
    )
}

export default LoginForm