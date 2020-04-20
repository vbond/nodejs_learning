'use strict';

var url = require('url');


var Users = require('./UsersService');


module.exports.userPost = function userPost (req, res, next) {
  var user = req.swagger.params['user'].value;
  

  var result = Users.userPost(user);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.userIdGet = function userIdGet (req, res, next) {
  var id = req.swagger.params['id'].value;
  

  var result = Users.userIdGet(id);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.userIdPut = function userIdPut (req, res, next) {
  var id = req.swagger.params['id'].value;
  var user = req.swagger.params['user'].value;
  

  var result = Users.userIdPut(id, user);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.userIdDelete = function userIdDelete (req, res, next) {
  var id = req.swagger.params['id'].value;
  

  var result = Users.userIdDelete(id);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.userLoginLimitGet = function userLoginLimitGet (req, res, next) {
  var login = req.swagger.params['login'].value;
  var limit = req.swagger.params['limit'].value;
  

  var result = Users.userLoginLimitGet(login, limit);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
