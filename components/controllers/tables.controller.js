'use strict';

const MongoClient = require('mongodb').MongoClient;
const templateCtrl = require('./template.controller');

module.exports=exports= function(server){
    let name = 'tables';
    let dbo;

    templateCtrl(server,name);

   server.get('/api/tablesorder', (req, res, next) => {
       MongoClient.connect(config.dbconn, function (err, db){
           if (err) throw err;
           dbo = db.db(config.dbname);
           dbo.collection(name)
           .aggregate([
            { "$lookup": {
              "from": "reservations",
              "localField": "_id",
              "foreignField": "tableId",
              "as": "reservation"
            }},
            { "$unwind": { "path": '$reservation', 'preserveNullAndEmptyArrays': true }},
            { "$lookup": {
              "from": "orders",
              "localField": "reservation._id",
              "foreignField": "reservationId",
              "as": "orders",
            }},
            { "$unwind": { "path": '$orders', 'preserveNullAndEmptyArrays': true }},
            { "$lookup": {
              "from": "products",
              "localField": "orders.productId",
              "foreignField": "_id",
              "as": "orders.products"
            }},
            { "$unwind": { "path": '$orders.products', 'preserveNullAndEmptyArrays': true }},
            { "$addFields": {
              "orders.name": "$orders.products.name"
            }},
            { "$group": {
              "_id": "$_id",
              "code":{ "$first" : "$code"},
              "seat":{ "$first" :"$seat"},
              "description": { "$first": "$description" },
              "reservation": { "$first": "$reservation" },
              "orders": { "$push": "$orders" }
            }},
            { "$project": { "orders.products": 0 }}
          ])
           .toArray(function (err, response) {
               if (err) throw err;
               res.send(200, response);
               db.close();
           });
       });
   });
}