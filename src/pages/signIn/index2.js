import React, { useState, useEffect, useRef, useContext } from 'react'
import config from 'config'
import useAppNavigate from 'hooks/useAppNavigate/index'
import SignIn from './signIn'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import { getLocalStorage } from 'functions/storage/localStorage';

const index = () => {
  const appNavigate = useAppNavigate()

  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    

  useEffect(() => {
    console.log(state.context)
    if (state.context.userInfo?.status === 'ok') {
      appNavigate(state.context.userInfo.user.Home_Page)
    }
  }, [])
  
  if (state.context.userInfo?.status !== 'ok') {
    return <SignIn />
  }

};

export default index