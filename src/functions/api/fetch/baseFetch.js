import axios from 'axios'
import { setCustomReply, setErrorReply } from 'functions/replies';
import { getLocalStorage } from 'functions/storage/localStorage';
import { _getDebugLine } from 'functions/helpers';

export const fetchOptions = {
  headers: {
    accepts: {
      json: {
        "Accept": "application/json",
        "Content-Type": "application/json"  
      }
    }
  }  
}

export async function baseFetch(method, url, data = {}, accepts = {}) {
  try {
    const headers = {
      ...accepts,
      "Access-Control-Allow-Origin": "*"
    }

    data.token = getLocalStorage('token').value
    data.site = getLocalStorage('site').value
   
    const result = await axios({ method, url, data, headers })
    console.log(result)
    if (result.data.status !== 'ok') {
      return setCustomReply({
        status: result.data.status,
        message: result.data.message,
        debugLine: _getDebugLine(),
        returnedDebugLine: result.data.debugLine,
        obj: result.data.obj
      })
    }

    return result.data
  } catch (error) {
    return setErrorReply({
      debugLine: _getDebugLine(),
      obj: error
    })
  }  
}