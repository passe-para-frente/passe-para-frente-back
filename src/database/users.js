
var GeoPoint = require("firebase-admin").firestore.GeoPoint;
const firestore = require("./firestoresetup");
const GeoFirestoreModule = require('geofirestore');
const geofirestore = new GeoFirestoreModule.GeoFirestore(firestore);
const geokit = require('geokit');

const RADIUS_IN_KM = 50;

class UsersDatabase {

    constructor() {
        this.collectionRef = firestore.collection('users');
    }

    list() {
        return this.collectionRef.get();
    }

    listNear(lat, lon) {
        let location = new GeoPoint(parseFloat(lat), parseFloat(lon));
        const geolocationCollectionRef = geofirestore.collection('users');
        const query = geolocationCollectionRef.near({ center: location, radius: RADIUS_IN_KM });
        return query.get();
    }

    add(user, lat, lon) {
        user['created_at'] = new Date();
        user['updated_at'] = new Date();
        let numberLat = parseFloat(lat);
        let numberLon = parseFloat(lon);

        const hash = geokit.Geokit.hash({
            'lat' : numberLat,
            'lng' : numberLon
        });
        let locationGeopoint = new GeoPoint(numberLat, numberLon);
        user.location = locationGeopoint;
        
        let documentToSave = {
            g: hash,
            l: locationGeopoint,
            d: user
        }
        return this.collectionRef.add(documentToSave);
    }

}

module.exports = new UsersDatabase();