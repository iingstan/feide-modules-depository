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
    return new Promise((resolve, reject)=>{
      this.checkUsername(newuser.username).then(checkresult=>{
        if(checkresult){
          newuser.authorization = this.makeAuthorization(50)
          newuser.password = fecrypto.sha1x50(newuser.password)
          return models.User.create(newuser)          
        }
        else{
          reject(new Error('已经有此用户名了'))
        }
      }).then(()=>{
        resolve()
      }).catch(error=>{
        reject(error)
      })
    })
  },
  /**
   * 检查是否已经有此用户名了
   */
  checkUsername(username){
    return new Promise((resolve, reject)=>{
      models.User.findOne({
        where: {
          username: username
        }
      }).then(function (user) {
        if (user == null) {
          resolve(true)
        }
        else{
          resolve(false)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
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
  },
  /**
   * 修改密码
   */
  modyPassport(thisuser, opassword, password){
    return new Promise((resolve, reject)=>{
      if(fecrypto.sha1x50(opassword) != thisuser.password){
         reject(new Error('旧密码错误！'))
         return
      }
      thisuser.password = fecrypto.sha1x50(password)
      thisuser.save().then(()=>{
        resolve()
      }).catch(error=>{
        reject(error)
      })
    })
  },

  /**
   * 更改授权字符串
   */
  changeAuthor(thisuser){
    return new Promise((resolve, reject)=>{
      thisuser.authorization = this.makeAuthorization(50)
      thisuser.save().then(()=>{
        resolve()
      }).catch(error=>{
        reject(error)
      })
    })
  }  

}