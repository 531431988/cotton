const responseBody = {
  message: '',
  timestamp: 0,
  data: null,
  code: 0
}

export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}

export const getParams = (options) => {
  const obj = {}
  options = options.url.split('?')[1].split('&')
  options.forEach(item => {
    const key = item.split('=')
    obj[key[0]] = key[1]
  })
  return obj
}
