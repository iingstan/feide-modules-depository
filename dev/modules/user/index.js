/**
 * user
 */

var cookie = require('../cookie')

module.exports = {
  /**
   * 退出登录
   */
  logOut: function(){
    cookie.del('fmd-token')
  }
}