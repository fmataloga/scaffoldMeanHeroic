var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ModelGeneralConfig = mongoose.model('ModelGeneralConfig');
/* GET home page. */
router.get('/', function(req, res, next) {
 ModelGeneralConfig.findOne({meanCase:"meancase"}, function (err, data) {
		//Other views  admin-lte,admin-sb
		res.render('views/'+data.template+'/index');
	})
});

module.exports = router;