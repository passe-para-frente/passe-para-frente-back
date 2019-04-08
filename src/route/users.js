
const usersDatabase = require("../database/users");

class UsersRoute {

    list(req, res) {
        usersDatabase.list().then(snapshot => {
            let usersArrays = [];
            snapshot.forEach(doc => {
                let docSnapshot = doc.data();
                let user = {
                    id : doc.id,
                    name: docSnapshot.name,
                    created_at: docSnapshot.created_at,
                    location: {
                        lat: docSnapshot.location._latitude,
                        lon: docSnapshot.location._longitude
                    }
                }
                usersArrays.push(user);
              });
            res.json(usersArrays);
        }).catch(err => {
           console.log('Error getting users from database: ', err); 
           res.status(500).send({
               message: 'Failed to retrieve users from database'
           });
        });
    }

    save(req, res) {
        let user = req.body;
        user['created_at'] = new Date();
        user['updated_at'] = new Date();
        usersDatabase.add(
            user
        ).then(snapshot => {
            user[id] = snapshot.id;
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