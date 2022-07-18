import React, { createContext } from 'react'
import { useInterpret } from '@xstate/react'
import { authMachine } from 'state/authMachine'

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = (props) => {
  const authService = useInterpret(authMachine);
  console.log('AAA ', authService)

  return (
    <GlobalStateContext.Provider value={{ authService, context: authService.state?.context }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};