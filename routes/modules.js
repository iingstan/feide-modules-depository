var express = require('express');
var router = express.Router();
var models  = require('../models');
var multer  = require('multer')
var upload = multer()
var request = require('request');
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('ok')
});

router.get('/test', function(req, res, next) {
  console.info(111);
  //fs.createReadStream('./package.json').pipe(request.post('http://localhost:8870/modules/uptest'))

  var formData = {
    // Pass a simple key-value pair
    my_field: 'my_value',
    // Pass data via Streams
    //my_file: fs.createReadStream(__dirname + '/package.json'),
    // Pass multiple values /w an Array
    attachments: [
      fs.createReadStream('./package.json'),
      fs.createReadStream('./app.js'),
    ]//,
    // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
    // Use case: for some types of streams, you'll need to provide "file"-related information manually.
    // See the `form-data` README for more information about options: https://github.com/form-data/form-data
    // custom_file: {
    //   value:  fs.createReadStream('/dev/urandom'),
    //   options: {
    //     filename: 'topsecret.jpg',
    //     contentType: 'image/jpeg'
    //   }
    // }
  };
  request.post({url:'http://localhost:8870/modules/uptest', formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
  });

  console.info(222);
  res.send('ok')
});


var cpUpload = upload.fields([{ name: 'my_field' }, { name: 'attachments' }])
router.post('/uptest', cpUpload, function(req, res, next) { //upload.array('attachments')
  console.info(333);
  console.info(req.files);
  req.files.attachments.forEach(v=>{
    fs.writeFileSync('./modules/' + v.originalname, v.buffer)
  })
  console.info(req.body);
  res.send('ok')
}); 



module.exports = router;