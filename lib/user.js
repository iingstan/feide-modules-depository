/**
 * user
 */
let models = require('../models');
let fecrypto = require('./fecrypto')

module.exports = {
  /**
   * 登录时效(毫秒)
   */
  validTimeCount: 30 * 24 * 60 * 60 * 1000,
  /**
   * 用户注册
   */
  reg(newuser) {
    newuser.authorization = this.makeAuthorization(50)
    newuser.password = fecrypto.sha1x50(newuser.password)
    return models.User.create(newuser)
  },
  /**
   * 生成验证字符串
   */
  makeAuthorization(length) {
    let chars = 'ABCDEFGHJIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    let back = '';　　
    for (let i = 0; i < length; i++) {　　　　
      back += chars.charAt(Math.floor(Math.random() * chars.length));　　
    }　　
    return back
  },
  /**
   * 生成登录token
   */
  makeLoginToken(user) {
    let token = user.username + ',' + ((new Date()).getTime() + this.validTimeCount).toString()
    return fecrypto.en_aes(token)
  },
  /**
   * 验证登录token
   */
  checkLoginToken(token){
    try {
      token = fecrypto.de_aes(token)
      let [username, token_time] = token.split(',')
      token_time = parseInt(token_time)
      let this_time = (new Date()).getTime()
      if(this_time - token_time > this.validTimeCount) return ''
      return username
    } catch (error) {
      console.error(error)
      return ''
    }
  },
  /**
   * 用户登录
   */
  login(loginuser) {
    let _this = this
    return new Promise((resolve, reject)=>{
      loginuser.password = fecrypto.sha1x50(loginuser.password)
      models.User.findOne({
        where: loginuser
      }).then(function (user) {
        if (user == null) {
          reject(new Error('用户名或者密码错误'))
          return false
        }
        //登录成功
        resolve(_this.makeLoginToken(loginuser))
      }).catch(function (error) {
        reject(error)
      })      
    })
  }

}