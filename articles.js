const express = require('express');
const routerArticles = express.Router();
const client = require('./db');

routerArticles.get('/', (req, res) => {
  client.query('SELECT * FROM articles', (err, result) => {
    res.json(result.rows);
  });
});

routerArticles.post('/', (req, res) => {
  client.query('INSERT INTO articles (title, text) VALUES ($1, $2) WHERE id=10 RETURNING id', [req.body.title, req.body.text], (err, result) => {
    res.json(result.rows[0]);
  });
});

module.exports = routerArticles;
