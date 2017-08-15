/**
 * modules_file
 */
let models = require('../models')
let files = require('./files')
let path = require('path')
let init_data = require('./init_data')

let modules_file = {
  save(module_info, module_files) {
    return new Promise((resolve, reject) => {
      this.checkAuthor(module_info).then(([user, module_record]) => {
        if(this.checkModule(module_info)){
          reject(new Error('已经有此版本号的模块了！'))
          return
        }
        return Promise.all([
          this.saveModuleFiles(module_info, module_files),
          this.saveModuleData(user.username, module_info, module_record)
        ])
      }).then(()=>{
        init_data.moduleList()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 检查授权字符串，模块是否已被注册
   * 
   * @param {any} module_info 
   * @returns 
   */
  checkAuthor(module_info) {
    return new Promise((resolve, reject) => {
      models.User.findOne({
        where: {
          authorization: module_info.module_author
        }
      }).then(function (user) {
        if (user == null) {
          reject(new Error('验证授权字符串失败！'))
          return
        }
        models.Module.findOne({
          where:{
            name: module_info.module_name
          }
        }).then(module=>{
          if(module == null){
            resolve([user, null])
            return
          }
          else{
            if(module.username != user.username){
              reject(new Error('该模块名字已经被别人使用'))
            }
            else{
              resolve([user, module])
            }
          }
        }).catch(function (error) {
          reject(error)
        })
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  /**
   * 检查版本号
   * 
   * @param {any} module_info 
   * @returns 
   */
  checkModule(module_info) {
    let filepath = path.join('module_files', module_info.module_name, module_info.module_version)
    return files.exists(filepath)
  },
  /**
   * 保存模块文件
   * 
   * @param {any} module_info 
   * @param {any} module_files 
   * @returns 
   */
  saveModuleFiles(module_info, module_files) {
    return Promise.all(module_files.map(v=>{
      return files.writeFile(
        path.join('./module_files', module_info.module_name, module_info.module_version, v.originalname),
        v.buffer
      )
    }))
  },
  /**
   * 保存模块信息
   * 
   * @param {any} username 用户名
   * @param {any} module_info 模块信息
   * @param {any} module_record 获取到的模块记录
   * @returns 
   */
  saveModuleData(username, module_info, module_record) {
    if(module_record == null){
      return models.Module.create({
        name: module_info.module_name,
        username: username,
        version: module_info.module_version,
        intro: module_info.module_intro
      })
    }
    else{
      return module_record.update({
        version: module_info.module_version,
        intro: module_info.module_intro
      })
    }
  }
}

module.exports = modules_file
