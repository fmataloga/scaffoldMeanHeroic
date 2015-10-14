var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var passwordHash = require('password-hash');
var passport = require('passport');


/*  LOGIN   */


    router.post('/register', function(req, res) {
      Users.register(new Users({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({status: 'Registration successful!'});
        });
      });
    });

    router.post('/login', function(req, res, next) {
      req.session.us = false;
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          req.session.us = false;
          return res.status(500).json({err: err});
        }
        if (!user) {
          req.session.us = false;
          return res.status(401).json({err: info});
        }
        req.logIn(user, function(err) {
          if (err) {
            req.session.us = false;
            return res.status(500).json({err: 'Could not log in user'});
          }
          req.session.us = true;
          req.session.name = user.username;
          req.session.id = user.id;
          res.status(200).json({status: 'Login successful!'});

        });
      })(req, res, next);
    });

  router.get('/logout', function(req, res) {
    req.logout();
    req.session.us = false;
    res.status(200).json({status: 'Bye!'});
  });



/*  END LOGIN   */

/* GET users listing. */
router.get('/users', function(req, res, next) {
   Users.find(function(err, models){
        if(err){return next(err)}

        res.json(models)
    })
});


//POST - Add users
router.post('/users', function(req, res, next){
    var user = new Users(req.body);
    //user.password = passwordHash.generate(req.body.password); 
    user.save(function(err, user){
         if(err){return next(err)}
            res.json(user);
    })
})


//PUT - Update users
router.put('/users/:id', function(req, res){
    Users.findById(req.params.id, function(err, user){
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.country = req.body.country;
        user.city = req.body.city;
        user.age = req.body.age;
        user.height = req.body.height;
        user.tipo = req.body.tipo; 
        user.usuario = req.body.usuario; 
        user.password = passwordHash.generate(req.body.password); 

        user.save(function(err){
            if(err){res.send(err)}

            res.json(user);
        })
    })
})

//DELETE - Delete users
router.delete('/users/:id', function(req, res){
    Users.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
            res.json({message: 'El usuario se elimino satisfactoriamente!'});
    })
})

module.exports = router;
