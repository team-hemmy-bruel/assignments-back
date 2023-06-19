//--VUE COMPLET
db.createView(
  "assignmentsComplet", // Nom de la vue
  "assignments", // Collection source
  [
    {
      $lookup: {
        from: "matieres", // Collection pour la jointure avec matiere
        localField: "idMatiere",
        foreignField: "id",
        as: "matiere"
      }
    },
    {
      $unwind: "$matiere" // Dérouler le tableau matiere résultant
    },
    {
      $lookup: {
        from: "users", // Collection pour la jointure avec user
        localField: "matiere.idProfesseur",
        foreignField: "id",
        as: "professeur"
      }
    },
    {
      $unwind: "$professeur" // Dérouler le tableau user résultant
    },
    {
      $project: {
        id: 0, // Exclure le champ id de la vue
        id: 1,
        nom: 1,
        dateAttribution: 1,
        remarque: 1,
        note: 1,
        dateDeRendu: 1,
        rendu: 1,
        idEtudiant: 1,
        "matiere.id": 1,
        "matiere.nom": 1,
        "matiere.remarque": 1,
        "professeur.id": 1,
        "professeur.nom_complet": 1,
        "professeur.email": 1,
        "professeur.poste": 1
      }
    }
  ]
)



db.createView(
    "assignmentslib", // Nom de la vue
    "assignments", // Collection source
    [
        {
            $lookup: {
            from: "users",
            localField: "auteur",
            foreignField: "_id",
            as: "auteur_info"
            }
        },
        {
            $lookup: {
            from: "matieres",
            localField: "matiere",
            foreignField: "_id",
            as: "matiere_info"
            }
        },
        {
            $project: {
            _id: 1,
            nom: 1,
            dateDeRendu: 1,
            rendu: 1,
            note: 1,
            remarques: 1,
            "auteur_info.nomprenom": 1,
            "auteur_info.email": 1,
            "auteur_info.status": 1,
            "auteur_info.image": 1,
            "matiere_info.nom": 1,
            "matiere_info.image": 1
            }
        }
    ]
);
