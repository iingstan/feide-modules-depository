/**
 * middleware
 */

var models = require('../models')
let user = require('./user')

module.exports = {
  checkLogin (req, res, next) {
    let token = req.cookies['fmd-token']
    if(token){
      token = unescape(token)
      let username = user.checkLoginToken(token)
      if(username != ''){
        models.User.findOne({
          where: {
            username: username
          }
        }).then(function (user) {
          req.body.user = user
          next()
        }).catch(function (error) {
          next(error)
        })
        return
      }
    }
    res.redirect('/member/login')
  },
  
  simpleCheckLogin(req, res, next) {
    let token = req.cookies['fmd-token']
    if(token){
      token = unescape(token)
      let username = user.checkLoginToken(token)
      if(username != ''){
        req.body.username = username
        next()
        return
      }
    }
    res.redirect('/member/login')
  }
}