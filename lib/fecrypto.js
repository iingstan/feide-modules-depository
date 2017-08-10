/**
 * hash和加解密
 */

const crypto = require('crypto');
const fs = require('fs')
let encry_key = require('../config/encry_key.json');
let iv = '2348919826828391'
let key = encry_key.key

console.info(iv);
console.info(key);

module.exports = {
  sha1(str) {
    var sha1 = crypto.createHash("sha1");
    sha1.update(str);
    var res = sha1.digest("hex");
    return res;
  },
  sha1x50(str) {
    for (let i = 0; i < 50; i++) {
      str = this.sha1(str)
    }
    return str
  },
  sha1File(filepath) {
    let file_content = fs.readFileSync(filepath, 'utf-8')
    return this.sha1(file_content)
  },
  checkFileSha1(filepath, sha1_value) {
    return this.sha1File(filepath) === sha1_value
  },
  /**
   * aes加密
   */
  en_aes: function (data) {
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');
    return crypted;
  },
  /**
   * aes解密
   */
  de_aes: function (crypted) {
    crypted = new Buffer(crypted, 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(crypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
  }
}