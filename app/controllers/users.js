'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){ //if this is true and good and found
      res.redirect('/');
    }else{ //if there was nothing return to register screen
      res.redirect('/register');
    }
  });
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;  //what ever you write here gets saved to redis
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

