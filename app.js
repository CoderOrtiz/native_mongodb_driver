const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

//  Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect(function(err) {
  assert.strictEqual(null, err);
  console.log("Connected sucessfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  //  Insert some Documents
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great Fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda Sour"
    }, 
    {
      name: "Banana",
      score: 9,
      review: "Great Stuff"
    }
  ], function(err, result){
    assert.equal(err, null);
    assert.equal(3, result.result);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 Documents into the Collection");
    callback(result);
  });
}

