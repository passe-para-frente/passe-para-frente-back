
const firestore = require("./firestoresetup");

class ItemDatabase {

    constructor() {
        this.collectionRef = firestore.collection('items');
    }

    list() {
        return this.collectionRef.get();
    }

}

module.exports = new ItemDatabase();