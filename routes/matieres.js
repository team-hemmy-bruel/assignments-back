let Matiere = require('../models/matiere');

// Récupérer tous les matieres (GET)
function getMatieresSansPagination(req, res){
    Matiere.find((err, matieres) => {
        if(err){
            res.send(err)
        }

        res.send(matieres);
    });
}

function getMatieres(req, res) {
    var aggregateQuery = Matiere.aggregate();
    
    Matiere.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, matieres) => {
        if (err) {
          res.send(err);
        }
        res.send(matieres);
      }
    );
   }
   
// Récupérer un matiere par son id (GET)
function getMatiere(req, res){
    let matiereId = req.params.id;

    Matiere.findOne({_id: matiereId}, (err, matiere) =>{
        if(err){res.send(err)}
        res.json(matiere);
    })
}

// Ajout d'un matiere (POST)
function postMatiere(req, res) {
    let matiere = new Matiere();
    matiere.nom = req.body.nom;
    matiere.image = req.body.image;
    matiere.professeur = req.body.professeur;
  
    console.log("POST matiere reçu :");
    console.log(matiere);
  
    matiere.save((err) => {
      if (err) {
        res.send('Impossible d\'ajouter l\'matiere ', err);
      }
      res.json({ message: `${matiere.nom} enregistré !` });
    });
}

/*
// Update d'un matiere (PUT)
function updateMatiere(req, res) {
    console.log("UPDATE recu matiere : ");
    console.log(req.body);
    
    Matiere.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, matiere) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: matiere.nom + 'updated'})
        }

      // console.log('updated ', matiere)
    });

}
*/

// Mise à jour d'un matiere (PUT)
function updateMatiere(req, res) {
    console.log("UPDATE reçu pour l'matiere : ");
    console.log(req.body);
  
    Matiere.findByIdAndUpdate(
      req.body.id,
      {
        nom: req.body.nom,
        image: req.body.image,
      },
      { new: true },
      (err, matiere) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: `${matiere.nom} mis à jour` });
        }
      }
    );
}

// Suppression d'un matiere (DELETE)
function deleteMatiere(req, res) {
    Matiere.findByIdAndRemove(req.params.id, (err, matiere) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${matiere.nom} supprimé` });
    });
}



module.exports = { getMatieres, postMatiere, getMatiere, updateMatiere, deleteMatiere, getMatieresSansPagination };
