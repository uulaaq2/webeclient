import React, { useEffect, useContext } from 'react';

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import { useNavigate } from 'react-router-dom';

const index = () => {

  
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    

  useEffect(() => {      
    console.log('state changed ', state.value)
  }, [state.value])

  return (
    <div>
      aaa
    </div>
  );
};

export default index;