import { setSuccessReply } from 'functions/replies'
import CustomError from 'classes/CustomError'
import { baseFetch, fetchOptions } from 'functions/api/baseFetch'
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

    return signInResult    
  } catch (error) {
    throw new CustomError(error)
  }
}

export default signIn