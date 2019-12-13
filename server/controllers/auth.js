const { handleSuccessResponse } = require('../helpers/handleResponse')
const userSession  = require('../helpers/userSession')

const revoke = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    const isRevoked = await userSession.remove(authorization)
    isRevoked
      ? handleSuccessResponse(res, 202, null)
      : next('Redis error on DELETE request')
  } catch (err) {
    next('Server error on DELETE request')
  }
}

module.exports = {
  revoke: revoke
}