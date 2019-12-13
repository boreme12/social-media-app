const handleRedis = require('../helpers/handleRedis')
const { handleErrorResponse } = require('../helpers/handleResponse')

const requireAuth = async(req, res, next) => {
  const {authorization} = req.headers

  if(!authorization){
    return handleErrorResponse(res, 'unauthorized, no auth token', 401, 'fail')
  }
  try {
    const isValid = await handleRedis.autheniticate(authorization)
    if(!isValid){
      return res.status(401).json('unauthorized')
    } 
    next()
  } catch (err) {
    res.status(401).json(`unauthorized ${err}`)
  }
}

const handleError = (err, req, res, next) => {
  console.log('error: '+err)
  handleErrorResponse(res, err, 500, 'fail')
}

module.exports = {
  requireAuth: requireAuth, 
  handleError: handleError
}