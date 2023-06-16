let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const AssignmentslibSchema = Schema({
  rendu: Boolean,
  dateDeRendu: Date,
  nom: String,
  note: Number,
  remarques: String,
  auteur_info: {
    nomprenom: String,
    email: String,
    status: String,
    image: String
  },
  matiere_info: {
    nom: String,
    image: String
  }
});

AssignmentslibSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('assignmentslib', AssignmentslibSchema, 'assignmentslib');
