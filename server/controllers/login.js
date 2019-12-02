const User = require('../models/User')
const {createUserSession} = require('../helpers/createUserSession')
const handleRedis = require('../helpers/handleRedis')
const { handleSuccessResponse } = require('../helpers/handleResponse')

const login = (bcrypt, req, res, next) => {
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

  const validatePassword = async (password, userData) => {
    return bcrypt.compare(password, userData.hash)
  }

  const validateUserData = async () => {
    const { email, password } = req.body

    const userData = await getUserData(email).catch(err => next(err))
    const match = await validatePassword(password, userData).catch(err => next(err))
    
    !match && next('invalid credentails')

    return userData
  }

  const handleSignin = async () => {
    const { authorization } = req.headers

    if(authorization) {
      const userData = await handleRedis.getAuthTokenData(authorization).catch(err => {return next(err)})
      return userData[0] === null
        ? next('Token Error')
        : handleSuccessResponse(
          res,
          202,
          { data: 
            {
              id: userData[0], 
              avatar: userData[1],  
              username: userData[2]
            } 
          })
    }
  
    const userToken = await validateUserData()
    const {id, email} = userToken
    
    if(!id || !email){
      next('token error')
    }
    createUserSession(res, next, userToken)
  }
  handleSignin()
}

module.exports = {
  login
}