import React from 'react'
import LoginForm from 'Components/Form/LoginForm'
import Img from 'Components/Img/Img'
import Image from 'Utils/Image'

const Login = () => {
  return (
    <div className="bg-light">
      {/* <div className="row justify-content-center vh-100 align-items-center">
          <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 login-large-screen-width">
            <div className="card border border-light-subtle rounded-4 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5 py-5">
                <div className="text-center mb-3">
                  <Img
                    src={Image.CompanyLogo}
                    alt="modelrocket-logo"
                    width="60%"
                    height="60%"
                  /> 
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div> */}

      <div className="row justify-content-center vh-100 p-0 overflow-hidden">
        <div className="col d-none d-lg-block">
          <Img
            src={Image.LoginImage}
            alt="modelrocket-logo"
            width="100%"
          />
        </div>
        <div className="col-12 col-sm-8 col-md-6 h-100">
          <div className="card border-0 bg-transparent h-100">
            <div className="card-header border-0 bg-transparent">
              <div className="mb-3">
                <Img
                  src={Image.CompanyLogo}
                  alt="modelrocket-logo"
                  width="30%"
                  height="30%"
                />
              </div>
            </div>
            <div className="card-body row justify-content-center align-items-center h-100">
              <div className="col-10 col-sm-8 col-md-8 col-lg-5">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login