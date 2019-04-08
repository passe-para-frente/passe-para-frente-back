
const firestore = require("./firestoresetup");

class UsersDatabase {

    constructor() {
        this.collectionRef = firestore.collection('users');
    }

    list() {
        return this.collectionRef.get();
    }

}

module.exports = new UsersDatabase();