var express = require('express');
var router = express.Router();
var fss = require('fs');
var fs = require('fs-extra');
var replace = require("replace");
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('views/admin-sb/index', { title: 'Express' });
  res.render('views/simple/index', { title: 'Express' });
  //res.render('views/admin-lte/index', { title: 'Express' });
});

module.exports = router;