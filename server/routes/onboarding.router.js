const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  const query = `SELECT * FROM client_service`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all user", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here

  let queryText = `INSERT INTO client (business_name,
    address,
    website,
    manager_id,
    phone,
    hours_of_operation,
    minimarket_location,
    neighborhood_info,
    demographics,
    number_of_people,
    target_age_group,
    industry,
    pictures,
    contract,
    admin_notes,
    status_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
    `;
  pool
    .query(queryText, [
      req.body.business_name,
      req.body.address,
      req.body.website,
      req.body.manager_id,
      req.body.phone,
      req.body.hours_of_operation,
      req.body.minimarket_location,
      req.body.neighborhood_info,
      req.body.demographics,
      req.body.number_of_people,
      req.body.target_age_group,
      req.body.industry,
      req.body.pictures,
      req.body.contract,
      req.body.admin_notes,
      req.body.status_id,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const client = req.body;

  const queryText = `UPDATE client
  SET
    "business_name" = $1,
    "address" = $2,
    "website" = $3,
    "manager_id" = $4,
    "phone" = $5,
    "hours_of_operation" = $6,
    "minimarket_location" = $7,
    "neighborhood_info" = $8,
    "demographics" = $9,
    "number_of_people" = $10,
    "target_age_group" = $11,
    "industry" = $12,
    "pictures" = $13,
    "contract" = $14,
    "admin_notes" = $15,
    "status_id" = $16,

  WHERE id = $17;`;

  const queryValues = [
    // Values go here
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing PUT client query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
