exports = function (changeEvent) {
  /*
    This database trigger copies the inserted document into another collection 
    and records the time at which it was created to create a different view.
    
    Test it out:
    1. Go to cloud.mongodb.com, log on, and click the Browse Collections button 
    2. Add a database called 'db' and a collection called 'items'
    3. Insert a document in the 'items' collection
    3. Notice that the document in 'items_copy' collection has been inserted and updated
  */
  const mongodb = context.services.get("mongodb-atlas");
  const db = mongodb.db("db");
  const postsCollection = db.collection("items");
  const postsCopyCollection = db.collection("items_copy");

  if (changeEvent.operationType === "insert") {
    const date = new Date();
    var fullDocument = changeEvent.fullDocument;
    fullDocument = { ...fullDocument, date_created: date };

    postsCopyCollection.insertOne(fullDocument)
      .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
      .catch(err => console.error(`Failed to insert item: ${err}`))
    return;
  } else {
    console.log("Unexpected database action detected. Document was not copied over.")
    return;
  }

};
