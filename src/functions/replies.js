import config from '../config'

export function setSuccessReply(params = {}) {
  const { message = '',  ...rest } = params
  let reply ={
    iStatus: 'ok',
    message,
    ...rest
  }

  return reply
}

export function setCustomReply(params = {}) {
  const { status = '', message = '',  ...rest } = params
  let reply ={
    iStatus: status || 'ok',
    message,
    ...rest
  }

  return reply
}