const { MongoClient } = require("mongodb");
 
// Connection URI
const uri = "mongodb://localhost:27017";
 
// Create a new MongoClient
const client = new MongoClient(uri);
 
// Database Name
const dbName = "fruitsDB";
 
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
 
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    //creating collection
    const database = client.db(dbName);
    const fruits = database.collection("fruits");
 
    // create an array of documents to insert
    const doc =
    [   
        {
            name:"Apple",
            score : 8,
            review: "Great fruit"
        },
        {
            name:"Orange",
            score : 5,
            review: "Kind a sour"
        },
        {
            name:"Banana",
            score : 8,
            review: "Great stuff!"
        }
    ]
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
 
    const result = await fruits.insertMany(doc);
    console.log(`${result.insertedCount} documents were inserted`);
 
    // Reading from collections
 
 
    // you can add query also option if you want to read spcific data like in this case read only thosewhich have scoe of 8
    // const query = {score:8};
    const cursor = fruits.find(); // reads all data
    // print a message if no documents were found
    if ((await fruits.estimatedDocumentCount()) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
 
 
 
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);