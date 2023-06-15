let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const AssignmentslibSchema = Schema({
  rendu: {
    type: Boolean,
    required: true
  },
  dateDeRendu: {
    type: Date,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  note: {
    type: Number,
    required: true
  },
  remarques: {
    type: String,
    required: true
  },
  auteur_info: {
    nomprenom: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  matiere_info: {
    nom: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('assignmentslib', AssignmentslibSchema);
