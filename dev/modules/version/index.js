/**
 * 版本
 */

module.exports = {
  /**
   * 版本排序
   * 
   */
  sort:function(b, a){
    a = a.split('.').map(v=>{
      return parseInt(v)
    })
    b = b.split('.').map(v=>{
      return parseInt(v)
    })
    if(a[0] > b[0]) return true
    if(a[1] > b[1]) return true
    if(a[2] > b[2]) return true
    return false
  }
}