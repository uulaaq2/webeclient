import config from '../config'

export function setSuccessReply(params = {}) {
  const { message = '', ...rest } = params
  let reply ={
    iStatus: 'ok',
    message,
    ...rest
  }

  return reply
}

export function setCustomReply(params = {}) {
  const { iStatus = '', message = '',  ...rest } = params
  let reply ={
    iStatus,
    message,
    ...rest
  }

  return reply
}