const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('req.body:', req.body);
    const queryParams = [
        req.body.name,  //1
        req.body.email,  //2
        req.body.phone_number,  //3
        req.body.industry,  //4
        req.body.about_you,  //5
        req.body.why_wugs  //6
    ];

    const sqlQuery = `
        INSERT INTO interested (name, email, phone_number, industry, about_you, why_wugs)
        VALUES
        ($1, $2, $3, $4, $5, $6);
    `;
    pool.query(sqlQuery, queryParams)
        .then(result => {
            console.log("success with POST server-side")
            res.sendStatus(201);
        })
        .catch(error => {
            console.log("error with POST server-side:", error)
            res.sendStatus(500);
        })
});

module.exports = router;
