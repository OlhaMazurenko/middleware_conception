const express = require('express');
const router = express.Router();
const client = require('./db');

router.get('/', (req, res) => {
    client.query('SELECT * FROM authors', (err, result) => {
        res.json(result.rows);
    });
});

router.get('/:authorId(\\d+)', (req, res) => {
    client.query('SELECT * FROM authors WHERE id = $1', [req.params.authorId], (err, result) => {
        if (result.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.json(result.rows[0]);
        }
    });
});

router.post('/:firstName/:lastName', (req, res) => {
    client.query('INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING id',
        [req.params.firstName, req.params.lastName], (err, result) => {
        res.json(result.rows[0]);
        });
});

router.put('/:authorId(\\d+)/:firstName/:lastName', (req, res) => {
    client.query('UPDATE authors SET first_name = $1, last_name = $2 WHERE id = $3',
        [req.params.firstName, req.params.lastName, req.params.authorId], (err, result) => {
        res.json({status: 'ok'});
        });
});

router.delete('/:authorId(\\d+)', (req, res) => {
    client.query('DELETE FROM authors WHERE id = $1', [req.params.authorId], (err, result) => {
        res.json({status: 'ok'});
    });
});

module.exports = router;
