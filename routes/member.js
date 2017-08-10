var express = require('express');
var router = express.Router();
var models = require('../models');
let jsonresult = require('../lib/jsonresult')
let user = require('../lib/user')

function checkLogin(req, res, next) {
  next()
}

router.get('/login', checkLogin, function (req, res, next) {
  res.render('member/login', {
    title: '登录'
  });
});

router.get('/reg', function (req, res, next) {
  res.render('member/reg', {
    title: '注册'
  });
});

router.get('/author', function (req, res, next) {
  res.render('member/author', {
    title: '授权管理'
  });
});

router.post('/reg', function (req, res, next) {
  let newuser = {
    username: req.body.username,
    password: req.body.password
  }


  let back = new jsonresult(true, '', null)

  user.reg(newuser).then(function () {
    res.json(back);
  }).catch(function (error) {
    back.re = false
    back.message = error.message
    res.json(back);
  });

});

router.post('/login', function (req, res, next) {
  let loginuser = {
    username: req.body.username,
    password: req.body.password
  }


  let back = new jsonresult(true, '', null)

  user.login(loginuser).then(function (token) {
    res.cookie('fmd-token', escape(token),{
      maxAge: 30*24*60*60*1000
    })
    res.json(back);
  }).catch(function (error) {
    back.re = false
    back.message = error.message
    res.json(back);
  });

});

router.get('/islogin', function (req, res, next) {
  let token = req.cookies['fmd-token']
  let back = new jsonresult(false, '', null)
  if(token){
    token = unescape(token)
    let username = user.checkLoginToken(token)
    if(username != ''){
      back.re = true
      back.result = username
    }
  }

  res.json(back)
});

module.exports = router;