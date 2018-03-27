var express = require('express');
var router = express.Router();
var model = require('../models/index');
var util = require("util");
const datatable = require(`sequelize-datatables`);

/* GET tout les joueurs. */
router.get('/', function(req, res, next) {
    model.Joueurs.findAll({})
    .then(todos => res.json({
        error: false,
        data: todos
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

/* GET un joueur. */
router.get('/:id', function(req, res, next) {
    model.Joueurs.findById(req.params.id)
    .then(user => res.json({
        error: false,
        data: user
    }))
    .catch(error => res.json({
        error: true,
        data: null,
        error: error
    }));
});
 
/* POST un joueur. */
router.post('/', function (req, res, next) {
    model.Joueurs.findOrCreate({where: {pseudo: req.body.newPseudo}, defaults: {
        nom: req.body.newNom,
        prenom: req.body.newPrenom,
        dateNaissance: req.body.newDate,
        mail: req.body.newMail,
        pseudo: req.body.newPseudo,
        }
    }) 
    .spread((user, created) => {
      if(created){
        res.status(201).json({
            status:'success',
            message: 'Nouveau joueur crée.',
            title:"Réussite"
        })
      }
      else{
          res.json({
            status:'warning',
            message: 'Le pseudo existe déjà',
            title:'Echec'
        })
      }
    })
});
 
/* update un joueur. */
router.put('/update/:id', function(req, res, next) {
    const { nom, prenom, dateNaissance, mail, pseudo } = req.body;
    model.Joueurs.findOne({
            where: {pseudo: pseudo} 
        }).then(search => {
            if(search && search.id != search.dataValues['id']){
                res.json({
                    error: true,
                    status:'warning',
                    message: 'Le pseudo renseigné existe déjà.',
                    title:'Echec'
                })
            }
            else{
                model.Joueurs.update({
                    nom:nom,
                    prenom:prenom,
                    dateNaissance:dateNaissance,
                    mail:mail,
                    pseudo:pseudo
                    }, {
                        where:{
                            id: req.params.id
                        }
                    })
                .then(todo => res.status(201).json({
                    status: 'success',
                    message: 'Ce joueur a été mis à jour',
                    title: 'Réussite'
                }))
                .catch(error => res.json({
                    errorDetails: true,
                    status: 'warning',
                    message: 'Une erreur est survenue',
                    title:'Echec'
                    })
                );
            }
    })
});

/* UPDATE crédit d'un joueaur (addition). */
router.put('/update/credit/:id', function(req, res, next) {
    model.Joueurs.findById(req.params.id).then(user => {
        console.log( parseFloat(user.credit) + parseFloat(req.body.newCredit));
        model.Joueurs.update({
            credit: parseFloat(user.credit) + parseFloat(req.body.newCredit)
            }, {
                where:{
                    id:req.params.id
                }
            })
            .then(todo => res.status(201).json({
                status: 'success',
                message: 'Ce joueur reçu ' + req.body.newCredit + ' euros',
                title:'Réussite'
            }))
            .catch(error => res.json({
                status: 'warning',
                errorInfo: error,
                message:'Une erreur est survenue',
                title:'Echec'
            }));
    })
});
 
//A garder au caou
router.get('/dt', (req, res) => {
    datatable(model.Joueurs, req.body, {})
      .then((result) => {
        res.json(result);
      });
  });

  /* GET tout les joueurs dans un format datatables. */
  router.post('/dt', (req, res) => {
    datatable(model.Joueurs, req.body, {})
      .then((result) => {
        res.json(result);
      });
  });
 
module.exports = router;