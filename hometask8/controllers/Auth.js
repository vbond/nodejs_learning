'use strict';

var url = require('url');


var Auth = require('./AuthService');


module.exports.loginPost = function loginPost (req, res, next) {
  var login = req.swagger.params['login'].value;
  

  var result = Auth.loginPost(login);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
