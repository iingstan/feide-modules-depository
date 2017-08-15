/**
 * 初始化模块数据
 */


const path = require('path')
let files = require('./files')
const glob = require('glob')
let models = require('../models')
const jsonfile = require('jsonfile')

module.exports = {
  data: [],
  moduleList(){
    models.Module.findAll().then(modulelist=>{
      this.data = modulelist.map(v=>{
        return v.dataValues
      })
    })
  },
  moduleListSearch(search){
    return new Promise((resolve, reject)=>{
      models.Module.findAll({
        where:{
          name: {
            $like: '%' + search + '%'
          }
        }
      }).then(modulelist=>{ 
        resolve(modulelist.map(v=>{
          return v.dataValues
        }))
      })      
    })

  },
  getModuleData(module_name, version){
    let data = {}
    let this_version = ''
    // if(version){
    //   this_version = version
    // }
    return new Promise((resolve, reject)=>{
      models.Module.findOne({
        where:{
          name: module_name
        }
      }).then(module=>{
        data.baseinfo = module.dataValues
        if(version){
          this_version = version
        }
        else{
          this_version = module.version
        }
        let jsonpath = path.join('./module_files', module_name, this_version, 'package.json')
        data.packageinfo = jsonfile.readFileSync(jsonpath)
        version = module.version
        return files.glob(path.join('./module_files', module_name, this_version, '**/*.*'))
      }).then(module_files=>{
        data.files = module_files.map(v=>{
          return path.relative(path.join('./module_files', module_name, this_version), v)
        })
        return files.glob(path.join('./module_files', module_name, '/*/'))
      }).then((versions)=>{
        data.versions = versions.map(v=>{
          return path.basename(v)
        })
        resolve(data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}