import axios from 'axios'
import { setSuccessReply } from 'functions/replies';
import CustomError from 'classes/CustomError';
import { getLocalStorage } from 'functions/localStorage';

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
    data.site = getLocalStorage('selectedSite').value
   
    const result = await axios({ method, url, data, headers })
    
    if (!result.data?.iStatus || result.data?.iStatus === 'error') {
      throw new CustomError(result.data)
    }
    
    if (result.data.data)
      return result.data.data

    return result.data
    
  } catch (error) {
    throw new CustomError(error)
  }  
}