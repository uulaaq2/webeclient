import { createMachine, interpret, assign } from 'xstate'

export const authMachine = createMachine({
  id: 'authMachine',
  preserveActionOrder: true,
  initial: 'waiting',
  context: {
    userInfo: {
      status: ''
    },
    signInType: '',
    rememberMe: false,
    inProgress: false,
    appStarted: false
  },

  //states

  states: {
    waiting: {

    }
  }
  // states
  
})

const service = interpret(authMachine).onTransition((state) => {
  console.log(state.value)
})

service.start()