var express = require('express');
var router = express.Router();
var models  = require('../models');
var multer  = require('multer')
var upload = multer()
var request = require('request');
var fs = require('fs')
let jsonresult = require('../lib/jsonresult')
let modules_file = require('../lib/modules_file')
let init_data = require('../lib/init_data')
let files = require('../lib/files')
const path = require('path')
let middleware = require('../lib/middleware')

/* GET home page. */
router.get('/', function(req, res, next) {
  let name = req.query.name;
  let username = req.query.username;
  res.render('modules/index', { title: '模块一览', name:name, username: username});
});



router.get('/info/:modulename([a-zA-z0-9_-]+)', function(req, res, next) {
  let modulename = req.params.modulename
  let version = req.query.version
  // init_data.getModuleData(modulename).then(info=>{
  //   res.render('modules/info', { title: modulename + ' 模块信息', modulename: modulename, info:info});
  // }).catch(err=>{
  //   res.send('没有找到此模块')
  // })
  res.render('modules/info', { title: modulename + ' 模块信息', modulename: modulename, version: version});
});

router.get('/raw', function (req, res, next) {
  let filepath = req.query.path;
  filepath = path.join('./module_files', filepath)
  files.readBigFile(filepath).then((content)=>{
    res.setHeader("Content-Type", 'text/plain; charset=utf-8');
    res.send(content);
  }).catch(error=>{
    res.setHeader("Content-Type", 'text/plain; charset=utf-8');
    res.send('no such file');
  });
});


let cpUpload = upload.fields([{ name: 'my_field' }, { name: 'attachments' }])
router.post('/uptest', cpUpload, function(req, res, next) { //upload.array('attachments')
  console.info(req.body)
  let module_info = {
    module_name: req.body.module_name,
    module_author: req.body.module_author,
    module_version: req.body.module_version,
    module_intro: req.body.module_intro,
    module_files_path: req.body.module_files_path
  }
  let module_files = req.files.attachments
  console.info(module_files);
  //console.info(req.files);
  //req.files.attachments.forEach(v=>{
  //  fs.writeFileSync('./module_depository/' + v.originalname, v.buffer)
  //})
  //console.info(req.body);
  //res.send('ok')
  let back = new jsonresult(true, '', null)

  modules_file.save(module_info, module_files).then(()=> {
    res.json(back);
  }).catch(error=>{
    console.error(error)
    back.re = false
    back.message = error.message
    res.json(back);
  });
}); 

//删除模块版本
router.post('/delete_version', middleware.simpleCheckLogin,function(req, res, next) {
  let module_info = {
    module_name: req.body.module_name,
    module_version: req.body.module_version
  }
  modules_file.deleteVersion(req.body.username, module_info).then(result=>{
    let back = new jsonresult(true, '', result)
    res.send(back)
  }).catch(err=>{
    console.error(err)
    let back = new jsonresult(false, err.message, null)
    res.send(back)
  })
}); 

//删除模块
router.post('/delete_module', middleware.simpleCheckLogin,function(req, res, next) {
  let module_info = {
    module_name: req.body.module_name
  }
  modules_file.deleteModule(req.body.username, module_info).then(result=>{
    let back = new jsonresult(true, '', result)
    res.send(back)
  }).catch(err=>{
    console.error(err)
    let back = new jsonresult(false, err.message, null)
    res.send(back)
  })
}); 

module.exports = router;