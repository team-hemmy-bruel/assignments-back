let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('assignments', AssignmentSchema);
