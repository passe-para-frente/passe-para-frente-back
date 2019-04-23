
const usersDatabase = require("../database/users");

function parseDbUser(doc) {
    let docSnapshot = doc.data();
    let user = docSnapshot.d;
    user.id = doc.id;
    user.created_at = user.created_at.toDate();
    user.updated_at = user.updated_at.toDate();
    user.location = {
        lat: docSnapshot.l.latitude,
        lon: docSnapshot.l.longitude,
    }
    return user;
}

class UsersRoute {

    list(req, res) {
        usersDatabase.list().then(snapshot => {
            let usersArrays = [];
            snapshot.forEach(doc => {
                usersArrays.push(parseDbUser(doc));
              });
            res.json(usersArrays);
        }).catch(err => {
           console.log('Error getting users from database: ', err); 
           res.status(500).send({
               message: 'Failed to retrieve users from database'
           });
        });
    }

    listNear(req, res) {
        let lat = req.query.lat;
        let lon = req.query.lon;
        usersDatabase.listNear(lat, lon).then(snapshot => {
            let usersArrays = [];
            snapshot.docs.forEach(doc => {
                usersArrays.push(parseDbUser(doc));
              });
            res.json(usersArrays);
        }).catch(err => {
           console.log('Error getting users from database: ', err); 
           res.status(500).send({
               message: 'Failed to retrieve users from database'
           });
        });
    }

    /**
     * Body example
     * {
            "name": "Ricardo",
            "location": {
                "lat": -22.8546261,
                "lon": -47.0534367
            },
            "contact" : {
                "email" : "ricardo.faria@outlook.com.br",
                "cellphone" : "1999998888"
            }
        }
     */
    save(req, res) {
        let user = req.body;
        // validateUser
        if (!user.location || !user.location.lat || !user.location.lon) {
            // throw validation error
            console.log("Can't save user without location: " + user);
            return;
        }
        let location = user.location;
        delete user.location;
        usersDatabase.add(
            user, location.lat, location.lon
        ).then(snapshot => {
            user.id = snapshot.id;
            res.send(user);
        }).catch(err => {
            console.log('Error while saving user: ', err); 
           res.status(500).send({
               message: 'Error while saving user.',
               content: user
           });
        })
    }

}

module.exports = new UsersRoute();