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

const create = async (userToken) => {
  const {email, id, avatar, username} = userToken
  const token = await signToken(email)
  await handleRedis.set(token, userToken)
  return { token, id, avatar, username }
}

const remove = async (authToken) => {
  return await handleRedis.revoke(authToken)
}

module.exports = {
  create: create, 
  remove: remove
}

