const bcrypt = require('bcrypt')
let User = require('../models/User')
const userSession  = require('../helpers/userSession')
const { handleSuccessResponse } = require('../helpers/handleResponse')

validation = async (queryName, data) => (
  User.exists({[queryName]: data})
)

validateUser = async (userData) => {
  return new Promise((resolve, reject) => {
    const emailExists = validation('email', userData.email).catch(err => reject(err))
    const usernameExists = validation('username', userData.username).catch(err => reject(err))

    if(!emailExists || !usernameExists){
      reject('Invalid details provided')
    }
    resolve()
  })
}

createHash = async (password) => {
  const saltRounds = 10
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err || !hash){
        reject('Error creating Hash:', err)
      }
      resolve(hash)
    })
  })
}

createUser = async (userData, hash) => {
  let newUser = new User({
    username: userData.username,
    email: userData.email,
    bio: '',
    avatar: '',
    hash: hash
  })

  return await newUser.save()
}

create = async (req, res, next) => {
  try{
    await validateUser(res, req.body)
    const hash = await createHash(req.body.password)
    const user = await createUser(req.body, hash)
    const session = await userSession.create(user)
    const token = session.token
    const respObj = {
      id: user._id,
      username: user.username,
      token,
    }
    handleSuccessResponse(res, 201, respObj)
  } catch(err) {
   next(err)
  }
}

remove = async (req, res, next) => {
  const { authorization } = req.headers
  try{
    await User.deleteOne({ _id: req.params.id })
    const isRevoked = await userSession.remove(authorization)
    isRevoked
      ? handleSuccessResponse(res, 202, null)
      : next('Redis error on DELETE request')
  }catch(err){
    next('Server error on DELETE request')
  }
}

module.exports = {
  create: create,
  remove: remove
}