let Assignmentslib = require('../models/assignmentslib');

// Récupérer tous les assignmentslibs (GET)
function getAssignmentslibsSansPagination(req, res){
    Assignmentslib.find((err, assignmentslibs) => {
        if(err){
            res.send(err)
        }

        res.send(assignmentslibs);
    });
}

function getAssignmentslibs(req, res) {
    var aggregateQuery = Assignmentslib.aggregate();
    Assignmentslib.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignmentslibs) => {
        if (err) {
          res.send(err);
        }
        res.send(assignmentslibs);
      }
    );
}

/*
function getAssignmentslibs(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  Assignmentslib.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec((err, assignmentslibs) => {
      if (err) {
        res.send(err);
      } else {
        res.send(assignmentslibs);
      }
    });
}
*/
   
// Récupérer un assignmentslib par son id (GET)
function getAssignmentslib(req, res){
    let assignmentslibId = req.params.id;

    Assignmentslib.findOne({_id: assignmentslibId}, (err, assignmentslib) =>{
        if(err){res.send(err)}
        res.json(assignmentslib);
    })
}

module.exports = { getAssignmentslibsSansPagination, getAssignmentslibs, getAssignmentslib };
