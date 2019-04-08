
const itemDatabase = require("../database/items");

class ItemRoute {

    list(req, res) {
        itemDatabase.list().then(snapshot => {
            let itemsArray = [];
            snapshot.forEach(doc => {
                let docSnapshot = doc.data();
                let item = {
                    id : doc.id,
                    nome: docSnapshot.nome,
                    categoria: docSnapshot.categoria
                }
                itemsArray.push(item);
              });
            res.json(itemsArray);
        }).catch(err => {
           console.log('Error getting items from database: ', err); 
           res.status(500).send({
               message: 'Failed to retrieve items from database'
           });
        });
    }

}

module.exports = new ItemRoute();