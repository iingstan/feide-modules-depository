/**
 * modules_file
 */
let models = require('../models')
let files = require('./files')
let path = require('path')
let init_data = require('./init_data')
let version_module = require('../dev/modules/version')

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
      }).then((user)=> {
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
        }).catch((error)=> {
          reject(error)
        })
      }).catch((error)=> {
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
    return Promise.all(module_files.map((v, i)=>{
      return files.writeFile(
        path.join('./module_files', module_info.module_name, module_info.module_version, module_info.module_files_path[i]),
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
  },
  /**
   * 删除模块版本
   * 
   * @param {any} username 用户名
   * @param {any} module_info 模块信息
   */
  deleteVersion(username, module_info){
    return new Promise((resolve, reject)=>{
      models.Module.findOne({
        where: {
          name: module_info.module_name,
          username: username
        }
      }).then((module)=> {
        if (module == null) {
          return Promise.reject(new Error('模块操作权限验证失败！'))
          //reject(new Error('模块操作权限验证失败！'))
          //return false
        }
        else{
          return this.deleteVersionData(module, module_info.module_name, module_info.module_version)          
        }
      }).then(()=>{
        return this.deleteVersionFile(module_info.module_name, module_info.module_version)
      }).then(()=>{
        resolve()
      }).catch((error)=> {
        reject(error)
      })

    })
  },
  /**
   * 删除模块
   *   
   * @param {any} username 用户名
   * @param {any} module_info 模块信息
   */
  deleteModule(username, module_info){
    return new Promise((resolve, reject)=>{
      models.Module.findOne({
        where: {
          name: module_info.module_name,
          username: username
        }
      }).then((module)=> {
        if (module == null) {
          return Promise.reject(new Error('模块操作权限验证失败！'))
          //reject(new Error('模块操作权限验证失败！'))
          //return false
        }
        else{
          return this.deleteModuleData(module)          
        }
      }).then(()=>{
        return this.deleteModuleFile(module_info.module_name)
      }).then(()=>{
        resolve()
      }).catch((error)=> {
        reject(error)
      })

    })
  },
  deleteVersionFile(module_name, module_version){
    return files.delete(path.join('./module_files', module_name, module_version))
  },
  deleteModuleFile(module_name){
    return files.delete(path.join('./module_files', module_name))
  },
  deleteVersionData(module, module_name, module_version){
    return new Promise((resolve, reject)=>{
      if(module.version != module_version){
        resolve()
        return false
      }
      files.glob(path.join('./module_files', module_name, '/*/')).then(versions=>{
        versions = versions.map(v=>{
          return path.basename(v)
        })
        versions = versions.sort(version_module.sort)
        if(versions.length == 1){
          reject(new Error('此版本是该模块唯一的版本，不能删除此版本'))
          return false
        }

        let mody_version = versions[0]
        if(mody_version == module_version) mody_version = versions[1]

        return module.update({
          version: mody_version
        })
      }).then(()=>{
        resolve()
      }).catch((err)=>{
        reject(err)
      })
    })
    
  },
  deleteModuleData(module){
    return module.destroy()
  }
  
}

module.exports = modules_file
