let User = require('../models/User')
let path = require('path')

module.exports.getProfileImage = (req, res, next) => {
  const fetchProfileImage = async () => {
    await User.findById(req.params.id, 'image', (err, doc) => {
      if(err) {
        return res.status(500).json({ 
          status: 'error',
          message: err
        })
      }
      res.type(doc.image.contentType)
      res.sendFile(path.resolve(__dirname+'/../public/images/avatars/'+doc.image.file))
    })
  }

  fetchProfileImage().catch(err => next(err))
}