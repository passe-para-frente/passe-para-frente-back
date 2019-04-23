
var GeoPoint = require("firebase-admin").firestore.GeoPoint;
const firestore = require("./firestoresetup");
const GeoFirestoreModule = require('geofirestore');
const geofirestore = new GeoFirestoreModule.GeoFirestore(firestore);
const geokit = require('geokit');

const RADIUS_IN_KM = 1000;

class UsersDatabase {

    constructor() {
        this.collectionRef = firestore.collection('users');
        this.geolocationCollectionRef = geofirestore.collection('users');
    }

    list() {
        return this.collectionRef.get();
    }

    listNear(lat, lon) {
        let location = new GeoPoint(parseFloat(lat), parseFloat(lon));
        const query = this.geolocationCollectionRef.near({ center: location, radius: RADIUS_IN_KM });
        return query.get();
    }

    add(user, lat, lon) {
        user['created_at'] = new Date();
        user['updated_at'] = new Date();
        let location = {
            lat : parseFloat(lat),
            lon : parseFloat(lon)
        }
        const hash = geokit.Geokit.hash(location);
        let locationGeopoint = new GeoPoint(location.lat, location.lon);
        
        let documentToSave = {
            g: hash,
            l: locationGeopoint,
            d: user
        }
        return this.collectionRef.add(documentToSave);
    }

}

module.exports = new UsersDatabase();