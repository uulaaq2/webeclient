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
    
    const signInResult = await baseFetch('POST', config.urls.api.user.signIn.url, data)

    if (signInResult.status !== 'ok') {
      return setCustomReply({
        status: signInResult.status,
        message: signInResult.message,
        debugLine: _getDebugLine(),
        returnedDebugLine: signInResult.debugLine,
        obj: signInResult.obj || null
      })
    }

    return signInResult    
  } catch (error) {
    return setErrorReply({
      debugLine: _getDebugLine(),
      obj: error
    })    
  }
}

export default signIn