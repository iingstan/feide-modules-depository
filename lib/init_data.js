/**
 * 初始化模块数据
 */


const path = require('path')
let files = require('./files')
const glob = require('glob')

module.exports = {
  moduleList(){
    return glob.sync('./module_files/*/*/')
  },
  init(){
    this.data = []
    glob.sync('./module_files/*/').forEach((v, i)=>{
      this.data.push({
        username: path.basename(v),
        modules:[]
      })

      glob.sync(v + '*/').forEach((m, i2)=>{
        this.data[i].modules.push({
          module_name:path.basename(m),
          module_version:[]
        })

        glob.sync(m + '*/').forEach((n, i3)=>{
          this.data[i].modules[i2].module_version.push({
            version:path.basename(n),
            module_files:[]
          })

          glob.sync(n + '**/*.*').forEach((h, i4)=>{
            //this.data[i].modules[i2].module_version[i3].module_files.push(path.basename(h))
            this.data[i].modules[i2].module_version[i3].module_files.push(path.relative(n, h))
          })

        })
      })
    })

    console.info(JSON.stringify(this.data))

    // return new Promise((resolve, reject)=>{
    //   files.glob('./module_files/*/').then(usernames=>{
    //     return Promise.all(usernames.map(v=>{
    //       this.data.push({
    //         username: path.basename(v)
    //       })
    //       return files.glob(v + '*/')
    //     })) 
    //   }).then(user_modules=>{
    //     let prolist = []
    //     user_modules.forEach((v, i)=>{
    //       this.data[i].modules = v.map((m)=>{
    //         return path.basename(m)
    //       })
    //       v.forEach((m,i2)=>{
    //         prolist.push(files.glob(m + '*/'))
    //       })
    //     })
    //     return Promise.all(prolist)
    //   }).then(module_files=>{
    //     console.info(module_files)
    //   }).catch(err=>{
    //     reject(err)
    //   })      
    // })
    // files.glob('./module_files/**/*.*').then(module_files=>{
    //   console.info(module_files)
    //   module_files.forEach(v=>{
    //     let repath = (path.relative('./module_files/', v)).split(path.sep)
    //     if(repath.length == 3){
    //       this.data.push({
    //         username: repath[0]
    //       })
    //     }
    //     console.info(this.data)
    //   })
    // })

  },
  readUser(){
    return files.glob('./module_files/*/')
  },
  readModule(username){
    return files.glob('./module_files/*/' + username)
  },
  readVersion(){

  },
  readFiles(){

  }
}