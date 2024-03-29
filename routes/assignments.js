const { now } = require('mongoose');
let Assignment = require('../models/assignment');

// Récupérer tous les assignments (GET)
function getAssignmentsSansPagination(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();
    // Ajoutez un étape de tri par ordre descendant sur la propriété _id
    if(req.params.ordre){
      aggregateQuery.sort({ _id: parseInt(req.params.ordre) });
    }
    Assignment.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        res.send(assignments);
      }
    );
   }
   
// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({_id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = null;
    assignment.rendu = false;
    assignment.auteur = req.body.auteur;
    assignment.matiere = req.body.matiere;
    assignment.note = 0;
    assignment.remarques = '';
  
    console.log("POST assignment reçu :");
    console.log(assignment);
  
    assignment.save((err) => {
      if (err) {
        res.send('Impossible d\'ajouter l\'assignment ', err);
      }
      res.json({ message: `${assignment.nom} enregistré !` });
    });
}

/*
// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: assignment.nom + 'updated'})
        }

      // console.log('updated ', assignment)
    });

}
*/

// Mise à jour d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE reçu pour l'assignment : ");
    console.log(req.body);
  
    Assignment.findByIdAndUpdate(
      req.body.id,
      {
        nom: req.body.nom,
        dateDeRendu: req.body.dateDeRendu,
        rendu: req.body.rendu,
        auteur: req.body.auteur,
        matiere: req.body.matiere,
        note: req.body.note,
        remarques: req.body.remarques,
      },
      { new: true },
      (err, assignment) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: `${assignment.nom} mis à jour` });
        }
      }
    );
}
//6491810dd897cf7dfcabde6e

// Mise à jour d'un assignment (PUT)
function rendu(req, res) {
  console.log("UPDATE reçu pour l'assignment : ");
  console.log(req.body);

  Assignment.findByIdAndUpdate(
    req.body.id,
    {
      dateDeRendu: now(),
      rendu: true,
      note: req.body.note,
      remarques: req.body.remarques,
    },
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: `${assignment.nom}, la note à été mis à jour` });
      }
    }
  );
}

// Suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${assignment.nom} supprimé` });
    });
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, rendu };
