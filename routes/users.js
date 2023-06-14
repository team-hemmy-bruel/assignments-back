let User = require('../models/user');

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
    user.id = req.body.id;
    user.nomprenom = req.body.nomprenom;
    user.email = req.body.email;
    user.mdp = req.body.mdp;
    user.fonction = req.body.fonction;

    console.log("POST user reçu :");
    console.log(user)

    user.save( (err) => {
        if(err){
            res.send('cant post user ', err);
        }
        res.json({ message: `${user.nomprenom} saved!`})
    })
}

// Ajout d'un user (POST)
function loginUser(req, res){
    let user = new User();
    user.email = req.body.email;
    user.mdp = req.body.mdp;
    User.findOne({email: user.email, mdp: user.mdp}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
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



module.exports = { getUsers, postUser, getUser, updateUser, deleteUser, loginUser };
