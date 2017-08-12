const exists = require('fs-exists-sync')
const fs = require('fs')
const mkdir = require('mkdirp')
const path = require('path')

module.exports = {
  createDirectory(dest) {
    var dir = path.dirname(dest);
    if (exists(dir)) return;
    mkdir.sync(dir);
  },
  exists(filepath){
    return exists(filepath)
  },
  writeFile(filepath, data, options){
    return new Promise((resolve, reject)=>{
      this.createDirectory(filepath)
      fs.writeFile(filepath, data, options, function(err){
        if(err == null){
          resolve()
        }
        else{
          reject(err)
        }
      })
    })
  }
}