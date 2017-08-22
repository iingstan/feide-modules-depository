/**
 * 初始化模块数据
 */


const path = require('path')
let files = require('./files')
const glob = require('glob')
let models = require('../models')
const jsonfile = require('jsonfile')
let version_module = require('../dev/modules/version')

module.exports = {
  //data: [],
  /**
   * 获取模块列表
   * 
   * @param {number} [pagesize=9] 分页大小
   * @param {number} [pageindex=1] 当前第几页
   * @param {string} [search=""] 模块名搜索
   * @param {string} [username=""] 用户
   * @returns 
   */
  moduleList(pagesize = 9, pageindex = 1, search = "", username = ""){
    let query_where_obj = {}

    if(search != ""){
      query_where_obj = {
        name: {
          $like: '%' + search + '%'
        }
      }
    }
    else if(username != ""){
      query_where_obj = {
        username: username
      }
    }

    return new Promise((resolve, reject)=>{
      Promise.all([
        models.Module.count({
          where: query_where_obj
        }),
        models.Module.findAll({
          where: query_where_obj,
          limit: pagesize,
          offset: (pageindex - 1) * pagesize
        })
      ]).then(result=>{
        resolve({
          count: result[0],
          modules: result[1].map(v=>{
            return v.dataValues
          })
        })
      }).catch(err=>{
        reject(err)
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
          return path.relative(path.join('./module_files', module_name, this_version), v).replace(
            path.sep,
            '/'
          )
        })
        return files.glob(path.join('./module_files', module_name, '/*/'))
      }).then((versions)=>{
        data.versions = versions.map(v=>{
          return path.basename(v)
        }).sort(version_module.sort)
        resolve(data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}