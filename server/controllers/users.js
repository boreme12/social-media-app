let User = require('../models/User')
const {createUserSession}  = require('../helpers/createUserSession')
const { handleSuccessResponse } = require('../helpers/handleResponse')
  

const createUser = async (bcrypt, req, res, next) => {
  const validation = async (queryName, data) => (
    User.exists({[queryName]: data})
  )
  
  const validateUser = (userData) => {
    const emailExists = validation('email', userData.email).catch(err => next(err))
    const usernameExists = validation('username', userData.username).catch(err => next(err))
  
    if(!emailExists || !usernameExists){
      next('Invalid details provided')
    }
  }
  
  const createHash = async (password) => {
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
  
  const createUser = async (res, userData, hash) => {
    let newUser = new User({
      username: userData.username,
      email: userData.email,
      bio: '',
      avatar: '',
      hash: hash
    })
  
    const user = await newUser.save()
    const token = await createUserSession(res, next, user, false)
      
    const respObj = {
      data : {
        id: user._id,
        username: user.username,
        token,
      }
    }
    handleSuccessResponse(res, 201, respObj)
  }
  
  validateUser(res, req.body)
  const hash = await createHash(req.body.password)
    .catch(err => next(err))
  createUser(res, req.body, hash)
}

const deleteUser = async (req, res, next) => {
  await User.deleteOne({ _id: req.params.id })
    .catch(err => {
      console.log(err)
      return next('Server error on DELETE request')
    })

  handleSuccessResponse(res, 202, null)
}

module.exports = {
  createUser,
  deleteUser
}