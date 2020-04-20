'use strict';

var url = require('url');


var Groups = require('./GroupsService');


module.exports.groupPost = function groupPost (req, res, next) {
  var group = req.swagger.params['group'].value;
  

  var result = Groups.groupPost(group);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.groupGetAllGet = function groupGetAllGet (req, res, next) {
  

  var result = Groups.groupGetAllGet();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.groupIdGet = function groupIdGet (req, res, next) {
  var id = req.swagger.params['id'].value;
  

  var result = Groups.groupIdGet(id);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.groupIdPut = function groupIdPut (req, res, next) {
  var id = req.swagger.params['id'].value;
  var group = req.swagger.params['group'].value;
  

  var result = Groups.groupIdPut(id, group);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.groupIdDelete = function groupIdDelete (req, res, next) {
  var id = req.swagger.params['id'].value;
  

  var result = Groups.groupIdDelete(id);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
