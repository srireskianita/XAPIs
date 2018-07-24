'use strict';

const MongoClient = require('mongodb').MongoClient;
const templateCtrl = require('./template.controller');

module.exports=exports= function(server){
    let name = 'products';
    let dbo;

    templateCtrl(server,name);

   server.get('/api/productscategory', (req, res, next) => {
       MongoClient.connect(config.dbconn, function (err, db){
           if (err) throw err;
           dbo = db.db(config.dbname);
           dbo.collection(name)
           .aggregate([
               {
                   $lookup:
                   {
                       from: "categories",
                       localField: "categoryId",
                       foreignField: "_id",
                       as: "category"
                   }
               }, {$unwind: "$category"
            }, {
                $project: {
                    "initial": 1,
                    "name":1,
                    "description": 1,
                    "price": 1,
                    "_id":1,
                    "categoryId": 1,
                    "category.initial": 1,
                    "category.name": 1
                }
            }
           ])
           .toArray(function (err, response) {
               if (err) throw err;
               res.send(200, response);
               db.close();
           });
       });
   });
}