import CStyles from './styles.css'
import React, { useState, useEffect, useRef } from 'react'
import Logo from 'images/app/logo.png'
import config from 'config'
import usePageInit from 'hooks/usePageInit'
import { _getDebugLine } from 'functions/helpers'
import { validateInputFields } from 'functions/validateInputFields'
import IInputError from 'IComponents/IInputError'

const SignIn = () => {
  usePageInit({
    pagePath: 'api.user.signIn'
  })

  const [error, setError] = useState()

  const emailAddressRef = useRef()
  const passwordRef = useRef()
  const keepmeSignedInRef = useRef()
  const [erroredInputs, setErroredInputs] = useState([])  
  
  const [inputs] = useState({
    emailAddress: {      
      id: 'email',
      label: 'Email address',
      type: 'text',
      errorText: '',
      ref: emailAddressRef,
      required: true,
      validate: true
    },
    password: {
      id: 'password',
      label: 'Password',
      type: 'password',
      errorText: '',
      ref: passwordRef,
      required: true,
      validate: true
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  

  useEffect(() => {
    emailAddressRef.current.focus()
  }, [])

  useEffect(() => {
    if (erroredInputs[0]) {
      erroredInputs[0].focus()
    }
  }, [erroredInputs])

  async function handleSubmit(e) {
    e.preventDefault()

    const validateInputFieldsResult = validateInputFields(inputs)
    if (validateInputFieldsResult.status === 'error') { 
      setError(validateInputFieldsResult.message)
    }
    if (validateInputFieldsResult.status !== 'ok') return

    console.log(_getDebugLine())
  }

  return (
    <>
      <div className={CStyles.logoContainer}>
        <img src={Logo} className={CStyles.logo} alt={config.app.name} />
      </div>
      <div className="container-lg clearfix p-2">

        <div className="Box col-sm-10 col-md-7 col-lg-5 p-5 border mx-auto">
        <form onSubmit={handleSubmit}>
           
          <div className={`form-group ${inputs.emailAddress.errorText ? 'errored' : ''}`}>
            <div className="form-group-header">
              <label htmlFor={inputs.emailAddress.id}>Email address</label>
            </div>
            <div className="form-group-body">
              <input className="form-control" type="text" id={inputs.emailAddress.id} maxLength={255} ref={inputs.emailAddress.ref} />
            </div>   
            { inputs.emailAddress.errorText && <IInputError message={inputs.emailAddress.errorText} /> }            
          </div>

          <div className={`form-group ${inputs.password.errorText ? 'errored' : ''}`}>
            <div className="form-group-header">
              <label htmlFor={inputs.password.id}>Password</label>
            </div>
            <div className="form-group-body">
              <input className="form-control" type="password" id={inputs.password.id} maxLength={255} ref={inputs.password.ref} />
            </div>
            { inputs.password.errorText && <IInputError message={inputs.password.errorText} /> }              
          </div>

          <div className="form-checkbox">
            <label>
              <input type="checkbox" ref={keepmeSignedInRef} />
              Keep me signed in
            </label>
          </div>

          <div className='form-group'>
            <button className='btn btn-primary btn-block'>
              Sign in
            </button>
          </div>
    
        </form>

        </div>
      </div>
    </>
  );
};

export default SignIn;