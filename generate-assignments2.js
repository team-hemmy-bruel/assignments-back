const Assignment = require('./models/assignment');
const User = require('./models/user');
const Matiere = require('./models/matiere');
const faker = require('faker');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://crud_tuto:crud_tuto@cluster0.6nvil.mongodb.net/assignments?retryWrites=true&w=majority';

const NUM_ASSIGNMENTS = 1000;

// Générer un ID unique pour chaque assignment
let assignmentId = 1;

// Fonction pour générer une date aléatoire dans une plage donnée
function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Fonction pour récupérer un ID d'utilisateur aléatoire
async function getRandomUserId() {
  const count = await User.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const user = await User.findOne().skip(randomIndex);
  return user._id;
}

// Fonction pour récupérer un ID de matière aléatoire
async function getRandomMatiereId() {
  const count = await Matiere.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const matiere = await Matiere.findOne().skip(randomIndex);
  return matiere._id;
}

// Générer les assignments
async function generateAssignments() {
  try {
    // Supprimer tous les assignments existants
    await Assignment.deleteMany();

    for (let i = 0; i < NUM_ASSIGNMENTS; i++) {
      const userId = await getRandomUserId();
      const matiereId = await getRandomMatiereId();

      const assignment = new Assignment({
        id: assignmentId,
        dateDeRendu: generateRandomDate(new Date(2023, 0, 1), new Date()),
        nom: faker.lorem.words(3),
        rendu: faker.random.boolean(),
        auteur: userId,
        matiere: matiereId,
        note: faker.random.number({ min: 0, max: 20 }),
        remarques: faker.lorem.sentence()
      });

      await assignment.save();

      assignmentId++;
    }

    console.log(`${NUM_ASSIGNMENTS} assignments generated successfully.`);
  } catch (err) {
    console.error('Error generating assignments:', err);
  } finally {
    // Fermer la connexion à la base de données
    mongoose.connection.close();
  }
}

// Connexion à la base de données et génération des assignments
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Appeler la fonction de génération des assignments
    generateAssignments();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
