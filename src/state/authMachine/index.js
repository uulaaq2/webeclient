import { createMachine, interpret, assign } from 'xstate'
import signIn from 'functions/user/signIn/signIn'
import { _getDebugLine } from 'functions/helpers';
import { setSuccessReply, setErrorReply, setCustomReply } from 'functions/replies';
import { setLocalStorage } from 'functions/storage/localStorage';

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

    const signInResult = await signIn({
      emailAddress,
      password,
      keepMeSignedIn
    })

    console.log(signInResult)

    if (signInResult.status === 'ok') {
      const tokenExpiresIn = (keepMeSignedIn && signInResult.user.Can_Be_Remembered) ? config.tokenExpiresIn : null

      const setEmailResult = setLocalStorage('emailAddress', emailAddress, tokenExpiresIn)
      if (setEmailResult.status !== 'ok') {
        return setCustomReply({
          status: setEmailResult.status,
          message: setEmailResult.message,
          debugLine: _getDebugLine(),
          returnedDebugLine: setEmailResult.debugLine,
          obj: setEmailResult.obj
        })
      }

      const setTokenResult = setLocalStorage('token', signInResult.token, tokenExpiresIn)
      if (setTokenResult.status !== 'ok') {
        return setCustomReply({
          status: setTokenResult.status,
          message: setTokenResult.message,
          debugLine: _getDebugLine(),
          returnedDebugLine: setTokenResult.debugLine,
          obj: setTokenResult.obj
        })
      }        

      const setSiteResult = setLocalStorage('site', signInResult.user.site, tokenExpiresIn)
      if (setSiteResult.status !== 'ok') {
        return setCustomReply({
          status: setSiteResult.status,
          message: setSiteResult.message,
          debugLine: _getDebugLine(),
          returnedDebugLine: setSiteResult.debugLine,
          obj: setSiteResult.obj
        })
      }
    }
    
    return signInResult
  } catch (error) {
    console.log(c)
    return setErrorReply({
      debugLine: _getDebugLine(),
      message: error.message,
      obj: error,
      aaa: 'bbb'
    })
  }
}