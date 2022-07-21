import React, { useState, useEffect, useContext } from 'react'
import { setSuccessReply, setCustomReply } from 'functions/replies'
import CustomError from 'classes/CustomError';
import { getLocalStorage } from 'functions/storage/localStorage';
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
        iStatus: 'alreadySignedIn',
        message: 'Already signed in',
        authInProgress: false
      }))

      return
    }
    // get token
    const getTokenResult = getLocalStorage('token')
    send('SIGN_IN', { token: getTokenResult.value })
    // get token    
  }

  useEffect(() => {
    if (state.matches('failed') || state.matches('success')) {      
      setAuthResult(setCustomReply({
        iStatus: state.context.userInfo.status,
        message: state.context.userInfo.message,
        authInProgress: state.matches('failed') ? false : false,
      }))
    }
  }, [state.value])
 
  
  return [authResult, startAuth]
};

export default useIsUserSignedIn