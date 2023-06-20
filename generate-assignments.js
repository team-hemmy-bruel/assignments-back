const faker = require('faker');
const mongoose = require('mongoose');
const Assignment = require('./models/assignment');

// Lien de connexion MongoDB Atlas
const uri = 'mongodb+srv://crud_tuto:crud_tuto@cluster0.6nvil.mongodb.net/assignments?retryWrites=true&w=majority';

// Se connecter à la base de données MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connecté à la base de données');
    generateAssignments();
  })
  .catch(err => console.log(err));

// Générer 1000 assignments aléatoires
const generateAssignments = async () => {
  try {
    for (let i = 0; i < 1000; i++) {
      const assignment = new Assignment({
        id: i + 1,
        nom: faker.lorem.words(),
        dateDeRendu: faker.date.future(),
        rendu: faker.random.boolean(),
        auteur: {
          nom: faker.name.findName(),
          photo: faker.image.avatar(),
        },
        matiere: {
          nom: faker.random.arrayElement(['Base de données', 'Technologies Web', 'Grails']),
          image: faker.image.image(),
        },
        note: faker.random.number({ min: 0, max: 20 }),
        remarques: faker.lorem.sentence(),
      });

      await assignment.save();
      console.log(`Assignment ${i + 1} généré`);
    }

    console.log('Génération des assignments terminée');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
