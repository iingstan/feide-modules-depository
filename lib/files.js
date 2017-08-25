const exists = require('fs-exists-sync')
const fs = require('fs')
const mkdir = require('mkdirp')
const path = require('path')
const glob = require('glob')
const del = require('delete')

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
  },
  delete(dest){
    return new Promise((resolve, reject)=>{
      del(dest, function(err, deleted) {
        if (err){
          reject(err)
        }
        else{
          resolve(deleted)
        }
      })
    })
  },
  glob(dest, options){
    return new Promise((resolve, reject)=>{
      glob(dest, options, function (err, files) {
        if(err){
          reject(err)
        }
        else{
          resolve(files)
        }
      })
    })
  },
  readBigFile: function(filepath){
    return new Promise((resolve, reject)=>{
      var input = fs.createReadStream(filepath);
      var remaining = '';

      input.on('data', (chunk) => {
        remaining = remaining + chunk;
      });
      input.on('end', () => {
        resolve(remaining);
      });
      input.on('error', (error)=>{
        reject(error)
      });
    })

  }
}