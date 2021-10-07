const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//get all candidates
router.get('/candidate', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    
    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//query to select one candidate
router.get('/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates where id = ?`;
    const params = [req.params.id];

    db.query(sql, params,  (err, rows) => {
        if(err) {
            res.status(500).json({error: err.message});
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// query to delete a candidate
router.delete('/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: res.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not Found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

//add candidate to db
router.post('/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: body
    });
    });
})

module.exports = router;