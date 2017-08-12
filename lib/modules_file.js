/**
 * modules_file
 */
let models = require('../models')
let files = require('./files')
let path = require('path')

let modules_file = {
  save(module_info, module_files) {
    return new Promise((resolve, reject) => {
      this.checkAuthor(module_info.module_author).then((user) => {
        if(this.checkModule(user.username, module_info)){
          reject(new Error('已经有此版本号的模块了！'))
          return
        }
        return Promise.all([
          this.saveModuleFiles(user.username, module_info, module_files),
          this.saveModuleData(user.username, module_info)
        ])
      }).then(()=>{
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  checkAuthor(author) {
    return new Promise((resolve, reject) => {
      models.User.findOne({
        where: {
          authorization: author
        }
      }).then(function (user) {
        if (user == null) {
          reject(new Error('验证授权字符串失败！'))
        }
        else {
          resolve(user)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  checkModule(username, module_info) {
    let filepath = path.join('module_files', username, module_info.module_name, module_info.module_version)
    return files.exists(filepath)
  },
  saveModuleFiles(username, module_info, module_files) {
    return Promise.all(module_files.map(v=>{
      return files.writeFile(
        path.join('./module_files', username, module_info.module_name, module_info.module_version, v.originalname),
        v.buffer
      )
    }))
  },
  saveModuleData(username, module_info) {
    return models.Module.create({
      name: module_info.module_name,
      version: module_info.module_version,
      username: username,
      intro: module_info.module_intro
    })
  }
}

module.exports = modules_file
