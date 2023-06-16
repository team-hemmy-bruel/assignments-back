let User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Récupérer tous les users (GET)
function getUsersSansPagination(req, res){
    User.find((err, users) => {
        if(err){
            res.send(err)
        }

        res.send(users);
    });
}

function getUsers(req, res) {
    var aggregateQuery = User.aggregate();
    
    User.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, users) => {
        if (err) {
          res.send(err);
        }
        res.send(users);
      }
    );
   }
   
// Récupérer un user par son id (GET)
function getUser(req, res){
    let userId = req.params.id;

    User.findOne({id: userId}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

// Ajout d'un user (POST)
function postUser(req, res){
    let user = new User();
    user.nomprenom = req.body.nomprenom;
    user.email = req.body.email;
    user.mdp = req.body.mdp;
    user.status = req.body.status;

    console.log("POST user reçu :");
    console.log(user)

    user.save( (err) => {
        if(err){
            res.send('cant post user ', err);
        }
        res.json({ message: `${user.nomprenom} saved!`})
    })
}


function loginUser(req, res){
    let user = new User();
    user.email = req.body.email;
    user.mdp = req.body.mdp;
    User.findOne({email: user.email, mdp: user.mdp}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

function register(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.mdp, 8);

    User.create({
        nomprenom : req.body.nomprenom,
        email : req.body.email,
        mdp : hashedPassword,
        status : req.body.status,
        image: req.body.image
      },
      function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    }); 
}

function me(req, res){
  User.findById(req.userId, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
}

function login(req, res){
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        var passwordIsValid = bcrypt.compareSync(req.body.mdp, user.mdp);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, token: token });
    });
}

function logout(req, res){
    res.status(200).send({ auth: false, token: null });
}


/*
//authentification user
function loginUser(req, res){
    console.log("Mon login test");
    let email = req.body.email;
    let mdp = req.body.mdp;
    console.log(email + "/" + mdp);
    User.findOne({ email: email, mdp : mdp }, (err, user) => {
        if (err) {
          res.send(err);
        }
        res.json(user);
    });
}
*/

// Update d'un user (PUT)
function updateUser(req, res) {
    console.log("UPDATE recu user : ");
    console.log(req.body);
    
    User.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: user.nomprenom + 'updated'})
        }

      // console.log('updated ', user)
    });

}

// suppression d'un user (DELETE)
function deleteUser(req, res) {

    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${user.nomprenom} deleted`});
    })
}

function logout(req, res){
    res.status(200).send({ auth: false, token: null });
}

function logout(req, res) {
    res.clearCookie('token'); // Effacer le cookie contenant la token (si vous utilisez des cookies)
    // Ou bien, si vous utilisez des tokens JWT stockés dans le localStorage ou le sessionStorage, vous pouvez simplement ne rien faire ici car la token sera automatiquement supprimée côté client lors de la déconnexion.
  
    res.status(200).send({ auth: false, token: null });
  }
  

module.exports = { getUsers, postUser, getUser, updateUser, deleteUser, loginUser, register, me, login, logout };
