const { handleSuccessResponse } = require('../helpers/handleResponse')
const handleRedis = require('../helpers/handleRedis')

const revoke = async (req, res, next) => {
  const { authorization } = req.headers
  const isTokenRevoked = await handleRedis.revokeToken(authorization).catch(err => {next(err)})

  console.log(isTokenRevoked)

  isTokenRevoked === 1 
    ? handleSuccessResponse(res, 201, null)
    : next('cannot delete token')
}

module.exports = {
  revoke: revoke
}