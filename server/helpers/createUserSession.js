const jwt = require('jsonwebtoken')
const handleRedis = require('./handleRedis')
const { handleSuccessResponse } = require('./handleResponse')

const signToken = async (email) => {
  const jwtPayload = { email }
  return new Promise((resolve, reject) => {
    jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: '2 days'}, (err, token) => {
      if(err || !token) {
        return reject('error signing token')
      }
      return resolve(token)
    })
  })
}

const createUserSession = async (res, next, userToken, handleResp = true) => {
  const {email, id, avatar, username} = userToken
  const token = await signToken(email).catch(err => next(err))
  const redisResp = await handleRedis.setAuthToken(token, userToken).catch(err => {return next(err)})

  if(!handleResp){
    return token
  } else {
    const session = { token, id, avatar, username }
    handleSuccessResponse(res, 201, session)
  }
}

module.exports = {
  createUserSession
}

