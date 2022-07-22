import { createMachine, interpret, assign } from 'xstate'
import signIn from 'functions/user/signIn'
import { setSuccessReply } from 'functions/replies';
import CustomError from 'classes/CustomError'
import { setLocalStorage } from 'functions/localStorage';
import config from 'config'

export const authMachine = createMachine({
  id: 'authMachine',
  preserveActionOrder: true,
  initial: 'waiting',
  context: { 
    inProgress: false
  },

  states: {

    waiting: {
      on: {
        SIGN_IN: {
          target: 'started'
        }
      }
    },

    started: {
      entry: assign({ inProgress: true}),      
      invoke: {
        id: 'start',
        src: doSignIn,
        onDone: [
          {
            target: 'success',
            cond: (c, e) => e.data.status === 'ok'
          },
          {
            target: 'failed'
          }
        ]
      },
      exit: [
        assign({ userInfo: (c, e) => e.data })
      ]
    },

    failed: {
      entry: assign({ inProgress: false }),
      on: {
        SIGN_IN: {
          target: 'started'
        }
      }
    },

    success: {      
      on: {
        RESET: {
          actions: assign({ inProgress: false }),
          target: 'waiting'
        }
      }
    }

  }
  
})

// Interpret the machine, and add a listener for whenever a transition occurs.
const service = interpret(authMachine).onTransition((state) => {
  console.log(state.value)
})

// Start the service
service.start()

async function doSignIn(c, e) {
  try {
    const { emailAddress, password, keepMeSignedIn } = e    
    console.log(e)
    let signInType = (emailAddress && password) ? 'credentials' : 'token'

    const signInResult = await signIn({
      emailAddress,
      password,
      keepMeSignedIn
    })

    if (signInType === 'credentials' && signInResult.status === 'ok') {
      const tokenExpiresIn = (keepMeSignedIn && signInResult.user.Can_Be_Remembered) ? config.tokenExpiresIn : null
      const setEmailResult = setLocalStorage('emailAddress', emailAddress, tokenExpiresIn)
      const setTokenResult = setLocalStorage('token', signInResult.token, tokenExpiresIn)
      const setSiteResult = setLocalStorage('selectedSite', signInResult.selectedSite, tokenExpiresIn)
    }
    
    return signInResult
  } catch (error) {
    return new CustomError(error)
  }
}