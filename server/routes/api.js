var express = require('express');
var router = express.Router();
var db = require('../models/heroestable.js');

router.get('/heroes', (req, res) => {
  var query = 'SELECT * FROM ' + db.db_name;
  db.teradata.read(query).then(response => res.send(response));
});

router.get('/hero/:id', (req, res) => {
  var query = `select * from ${db.db_name} where id = ${req.params.id} `;
  db.teradata.read(query).then(response => res.send(response));
});

router.get('/search/', (req, res) => {
  var query = `select * from ${db.db_name} where name like any('%${
    req.query.name
  }%');`;
  db.teradata.read(query).then(response => res.send(response));
});

router.post('/addhero', (req, res) => {
  var query = `INSERT INTO ${db.db_name} values(${req.body.id}, '${
    req.body.name
  }');`;
  db.teradata.write(query).then(response => res.sendStatus(200));
});

router.put('/update/hero/:id', (req, res) => {
  var query = `update ${db.db_name} set name = '${req.body.name}' where id = ${
    req.params.id
  };`;
  db.teradata.write(query).then(response => res.sendStatus(200));
});

router.delete('/delete/:id', (req, res) => {
  var query = `DELETE from ${db.db_name} where id = ${req.params.id} ;`;
  db.teradata.write(query).then(response => {
    res.sendStatus(200);
  });
});

module.exports = router;
