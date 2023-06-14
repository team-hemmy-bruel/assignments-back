let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: {
      type: Boolean,
      default: false
    },
    auteur: {
      nom: String,
      photo: String
    },
    matiere: {
      nom: String,
      image: String
    },
    note: {
      type: Number,
      min: 0,
      max: 20,
      required: function() {
        return this.rendu;
      }
    },
    remarques: String
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('assignments', AssignmentSchema);
