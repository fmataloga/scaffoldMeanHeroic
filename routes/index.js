var express = require('express');
var router = express.Router();
var fss = require('fs');
var fs = require('fs-extra');
var replace = require("replace");
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('admin-sb/index', { title: 'Express' });
  res.render('simple/index', { title: 'Express' });
  //res.render('admin-lte/index', { title: 'Express' });
});

module.exports = router;