var express = require('express');
var router = express.Router();
var model = require('../models/index');
var util = require("util");
const datatable = require(`sequelize-datatables`);

/* GET todo listing. */
router.get('/', function(req, res, next) {
    model.Transactions.findAll({})
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

router.get('/:id', function(req, res, next) {
    model.Transactions.findById(req.params.id)
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

router.post('/:id', (req, res) => {
    datatable(model.Transactions, req.body, {where:{joueur:req.params.id}})
        .then((result) => {
            res.json(result);
        });
});
 
module.exports = router;