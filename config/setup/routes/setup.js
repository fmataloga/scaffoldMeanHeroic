var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ModelSetup = mongoose.model('ModelSetup');

router.get('/home', function (req, res, next) {
    res.render('config/setup/public/index', { title: 'Express' });
});

router.get('/layouts', function (req, res, next) {
    ModelSetup.find(function (err, models) {
        if (err) {
            return next(err)
        }
        res.json(models)
    })
});

router.post('/layouts', function (req, res, next) {
    var layout = new ModelSetup({
        name: req.body.name,
        label:((req.body.name).toLowerCase()).replace(/ /g,"-")
    });
    layout.save(function (err, layout) {
        if (err) {
            return next(err)
        } else {
            res.json(layout);
        }
    });
});

module.exports = router;