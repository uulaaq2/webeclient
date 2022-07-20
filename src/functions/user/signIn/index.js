import { setSuccessReply, setCustomReply, setErrorReply } from 'functions/replies'
import { _getDebugLine} from 'functions/helpers'
import { baseFetch, fetchOptions } from 'functions/api/fetch/baseFetch'
import config from 'config'

async function signIn(params) {
  try {
    const { emailAddress, password, keepMeSignedIn } = params

    const data = {
      emailAddress,
      password,
      keepMeSignedIn
    }
    
    const signInResult = await baseFetch('POST', config.urls.signIn.apiUrl, data)

    if (signInResult.status !== 'ok') {
      return setCustomReply({
        status: signInResult.status,
        message: signInResult.message,
        debugLine: _getDebugLine(),
        returnedDebug: signInResult.debug
      })
    }

    return signInResult    
  } catch (error) {
    return setErrorReply({
      debugLine: _getDebugLine(),
      errorObj: error
    })    
  }
}

export default signIn