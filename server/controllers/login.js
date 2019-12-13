const User = require('../models/User')
const bcrypt = require('bcrypt')
const userSession = require('../helpers/userSession')
const handleRedis = require('../helpers/handleRedis')
const { handleSuccessResponse } = require('../helpers/handleResponse')

const getUserData = async (email) => {
  return User.findOne({ email }, (err, doc) => {
    if(err) {
      return next('unable to signin')
    } else if(!doc) {
      return next('Invalid user credentials')
    } else {
      return doc
    }
  })
}

const validatePassword = (password, userData) => 
  bcrypt.compare(password, userData.hash)


const validateUserData = async (req) => {
  const { email, password } = req.body

  const userData = await getUserData(email)
  const match = await validatePassword(password, userData)
  
  !match && next('invalid credentails')

  return userData
}



const login = async (req, res, next) => {
  const { authorization } = req.headers

  if(authorization) {
    try {
      const userData = await handleRedis.get(authorization)
      return userData[0] === null
        ? next('Token Error')
        : handleSuccessResponse(
          res,
          202,
          { 
            id: userData[0], 
            avatar: userData[1],  
            username: userData[2]
          })
    } catch (err) {
      next(err)
    }
  }
  try {
    const userToken = await validateUserData(req)
    const {id, email} = userToken
    
    if(!id || !email){
      return next('token error')
    }
    const sessionObj = await userSession.create(userToken)
    handleSuccessResponse(res, 201, sessionObj)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  login
}