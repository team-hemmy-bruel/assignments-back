var jwt = require('jsonwebtoken');
var config = require('../config');
/*
function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}
*/
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  const jwtToken = token.split(' ')[1];

  jwt.verify(jwtToken, config.secret, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    
    // Si tout est bon, enregistrez l'ID de l'utilisateur dans la requête pour une utilisation ultérieure
    req.userId = decoded.id;
    next();
  });
}

module.exports = { verifyToken } ;