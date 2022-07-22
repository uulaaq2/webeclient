import config from 'config'
import { setSuccessReply, setCustomReply } from 'functions/replies';
import CustomError from 'classes/CustomError';

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
      date.setTime(date.getTime() + (config.tokenExpiresIn.replace(/\D/g,'') * 24 * 60 * 60 * 1000));
      expires = "expires=" + date.toUTCString();
    }
    
    document.cookie = key + "=" + value + "; " + expires + "; path=/";    
  
    return setSuccessReply({ 
      data: {
        key,
        value
      }
    })

  } catch (error) {
    throw new CustomError(error)
  }
}

function getCookie(key) {
  try {
    key += "="
    const keyTemp = key
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded .split('; ');
    let res = ''

    if (cArr) {
      cArr.forEach(val => {
          if (val.indexOf(key) === 0) res = val.substring(key.length);
      })      
    }

    key = key.slice(-1)
    
    if (res) {
      return setSuccessReply({
        data: {
          res
        }
      })
    } else {
      return setCustomReply({
        iStatus: 'empty',
        message: `Empty cookie value for ${key}`
    })
    }
  } catch (error) {
    console.log('local storage error', error)
    throw new CustomError(error)
  }
}

function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}