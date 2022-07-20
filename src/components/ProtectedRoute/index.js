import React, { useContext, useEffect, useState } from 'react'
import useIsUserSignedIn from 'hooks/useIsUserSignedIn'
import IPageLoading from 'IComponents/IPageLoading/index'
import IPageLoadError from 'IComponents/IPageLoadError'
import useAppNavigate from 'hooks/useAppNavigate/index'
import config from 'config'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const ProtectedRoute = ({ element }) => {
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)  

  const [authResult, startAuth] = useIsUserSignedIn({ status: 'waiting', authInProgress: true })  
  const [statusForRedirection] = useState(['noToken', 'invalidToken', 'accountIsExpired', 'shouldChangePassword'])
  
  const appNavigate = useAppNavigate()
  console.log('protected route')
  useEffect(() => {
    startAuth()
  }, [])

  useEffect(() => {
    console.log(authResult)
    if (statusForRedirection.includes(authResult.status)) {
      appNavigate(config.urls.signIn.url)
    }
  }, [authResult])
  
  if (authResult.authInProgress) {
    return (
      <div style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <IPageLoading />
      </div>
    )
  }

  if (authResult.status === 'error') {
    return <IPageLoadError errorObj={authResult} />
  }  

  if (authResult.status === 'ok' || authResult.status === 'alreadySignedIn') {
    return element
  }
  
};

export default ProtectedRoute;