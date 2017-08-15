var express = require('express');
var router = express.Router();
var models  = require('../models');
let init_data = require('../lib/init_data')


router.get('/modules', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  let search = req.query.search;
  if(search == undefined || search == ""){
    res.send(init_data.data)
  }
  else{
    init_data.moduleListSearch(search).then(result=>{
      res.send(result)
    })
    
  }
});

router.get('/module/:modulename([a-zA-z0-9_-]+)', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  let modulename = req.params.modulename
  let version = req.query.version
  init_data.getModuleData(modulename, version).then(info=>{
    res.send(info)
  }).catch(err=>{
    res.send('error')
    console.error(err)
  })
});


module.exports = router;