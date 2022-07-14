import config from 'config'
import { setSuccessReply, setErrorReply } from 'functions/replies';
import { _getDebugLine } from 'functions/helpers';

export function setLocalStorage(key, value, setExpirationTime = null) {
  if (config.localStorageType === 'cookie') {
    return setCookie(key, value, setExpirationTime)
  }
}

export function getLocalStorage(key) {
  if (config.localStorageType === 'cookie') {
    return getCookie(key)
  }
}

export function deleteLocalStorage(name) {
  deleteCookie(name)
}

function setCookie(key, value, setExpirationTime) {
  try {        
    let expires = ''
    if (setExpirationTime) {
      let date = new Date();
      date.setTime(date.getTime() + (config.tokenExpiresIn * 24 * 60 * 60 * 1000));
      expires = "expires=" + date.toUTCString();
    }
    
    document.cookie = key + "=" + value + "; " + expires + "; path=/";    
  
    let data = {
      key,
      value
    }

    return setSuccessReply({ 
      debugLine: _getDebugLine(),
      data 
    })

  } catch (error) {
    return setErrorReply({
      debugLine: _getDebugLine(),
      obj: error
    })
  }
}

function getCookie(key) {
  try {
    key += "="
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded .split('; ');
    let res = ''

    if (cArr) {
      cArr.forEach(val => {
          if (val.indexOf(key) === 0) res = val.substring(key.length);
      })      
    }

    key = key.slice(-1)

    const data = {
      key,
      value: res ? res : ''
    }
    
    return setSuccess(data)
  } catch (error) {
    return setError(error)
  }
}

function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}