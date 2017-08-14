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
  getModuleData(module_name){
    let data = {}
    let version;
    return new Promise((resolve, reject)=>{
      models.Module.findOne({
        where:{
          name: module_name
        }
      }).then(module=>{
        data.baseinfo = module.dataValues
        let jsonpath = path.join('./module_files', module_name, module.version, 'package.json')
        data.packageinfo = jsonfile.readFileSync(jsonpath)
        version = module.version
        return files.glob(path.join('./module_files', module_name, module.version, '**/*.*'))
        
      }).then(files=>{
        data.files = files.map(v=>{
          return path.relative(path.join('./module_files', module_name, version), v)
        })
        resolve(data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}