'use strict';

var bcrypt = require('bcrypt'),
    Mongo   = require('mongodb');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();} //if user exsists just go to call back
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb); //saving to database
  });
};

User.authenticate = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();} //if user doesn't exsist get out and go to callback kick you out
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();} //if not okay callback with nothing
    cb(user);
  });
};

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, cb);
};

User.all = function(cb){
  User.collection.find().toArray(cb);
};

module.exports = User;


