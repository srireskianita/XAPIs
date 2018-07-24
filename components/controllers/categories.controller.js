'use strict';

const MongoClient = require('mongodb').MongoClient;
const templateCtrl = require('./template.controller');

module.exports=exports= function(server){
    let name = 'categories';
    let dbo;
    templateCtrl(server,name);

}