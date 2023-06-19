let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let user = require('./routes/users');
let matiere = require('./routes/matieres');
let assignmentlib = require('./routes/assignmentslib');
let verifyToken = require('./routes/VerifyToken');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://crud_tuto:crud_tuto@cluster0.6nvil.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(verifyToken.verifyToken, assignment.getAssignments)
  .post(verifyToken.verifyToken, assignment.postAssignment)
  .put(verifyToken.verifyToken, assignment.updateAssignment);

app.route(prefix + '/assignmentslib/:id')
  .get(verifyToken.verifyToken, assignmentlib.getAssignmentslib);

app.route(prefix + '/assignmentslibs')
  .get(verifyToken.verifyToken, assignmentlib.getAssignmentslibs);

app.route(prefix + '/rendu')
  .post(verifyToken.verifyToken, assignment.rendu);

app.route(prefix + '/assignments/:id')
  .get(verifyToken.verifyToken, assignment.getAssignment)
  .delete(verifyToken.verifyToken, assignment.deleteAssignment);

app.route(prefix + '/matieres')
  .get(verifyToken.verifyToken, matiere.getMatieres);

app.route(prefix + '/matiere/:id')
  .get(verifyToken.verifyToken, matiere.getMatiere)
  .delete(verifyToken.verifyToken, matiere.deleteMatiere);

app.route(prefix + '/matiere')
  .post(verifyToken.verifyToken, matiere.postMatiere)
  .put(verifyToken.verifyToken, matiere.updateMatiere);

app.route(prefix + '/users')
  .get(verifyToken.verifyToken, user.getUsers)
  .post(user.postUser)
  .put(verifyToken.verifyToken, user.updateUser);

app.route(prefix + '/user/login')
  .post(user.login);

app.route(prefix + '/user/logout')
  .get(user.logout);

app.route(prefix + '/user/register')
  .post(user.register);

app.route(prefix + '/user/me')
  .get(verifyToken.verifyToken, user.me);

app.route(prefix + '/users/:id')
  .get(verifyToken.verifyToken, user.getUser)
  .delete(verifyToken.verifyToken, user.deleteUser);
  

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


