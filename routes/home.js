var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Test.findAll().then(tests=>{
    res.render('home/index', { title: '首页', tests: tests});
  })
  
});

function aaa(req, res, next) {
  next()
}

router.get('/test', function(req, res, next){
  next()
}, function(req, res, next) {

    res.send('aaa');
});


module.exports = router;