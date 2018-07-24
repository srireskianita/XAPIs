const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('category');
    // Insert some documents
    collection.insertMany([
        { initial: 'Main',  
            name: 'Main Baverage' ,  
            active: 1 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 documents into the collection");
        callback(result);
    });
}

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('category');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

// const removeDocument = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('category');
//     // Delete document where a is 3
//     collection.deleteOne({ name : 'Main' }, function(err, result) {
//       assert.equal(err, null);
//       assert.equal(1, result.result.n);
//       callback(result);
//     });    
//   }

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function () {
        findDocuments(db, function () {
                client.close();
            // removeDocument(db, function () {
            // });
        });

    }) ;
});