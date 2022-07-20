import React, { useState, useEffect, useContext } from 'react'
import { setSuccessReply, setCustomReply, setErrorReply } from 'functions/replies'
import { getLocalStorage } from 'functions/storage/localStorage';
import { _getDebugLine } from 'functions/helpers';
import signIn from 'functions/user/signIn'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const useIsUserSignedIn = (initialAuthResult) => {
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)  
  const [authResult, setAuthResult] = useState(initialAuthResult)

  function startAuth() {    
    if (state.context.userInfo?.status === 'ok') {
      setAuthResult(setCustomReply({
        status: 'alreadySignedIn',
        message: 'alreadySignedIn',
        authInProgress: false,
        debugLine: _getDebugLine()
      }))

      return
    }
    // get token
    const getTokenResult = getLocalStorage('token')

    if (getTokenResult.status === 'error') {     
      setAuthResult(setCustomReply({
        status: getTokenResult.status,
        message: getTokenResult.message,
        authInProgress: false,
        debugLine: _getDebugLine(),
        returnedDebug: getTokenResult.debug
      }))

      return
    }

    if (getTokenResult.status === 'ok' && getTokenResult.value) {
      send('SIGN_IN', { token: getTokenResult.value })
    } else {
      setAuthResult(setCustomReply({
        status: 'noToken',
        message: 'noToken',
        authInProgress: false,
        debugLine: _getDebugLine()
      }))
    }
    // get token    
  }

  useEffect(() => {
    if (state.matches('failed') || state.matches('success')) {      
      setAuthResult(setCustomReply({
        status: state.context.userInfo.status,
        message: state.context.userInfo.message,
        authInProgress: state.matches('failed') ? false : false,
        debugLine: _getDebugLine(),
        returnedDebug: state.context.userInfo.debug
      }))
    }
  }, [state.value])
 
  
  return [authResult, startAuth]
};

export default useIsUserSignedIn