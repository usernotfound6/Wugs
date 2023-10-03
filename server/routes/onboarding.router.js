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

// Client Location router --------------------------------------

router.put("/clientlocationinfo", (req, res) => {
  // POST route code here

  let queryText = `UPDATE client
  SET 
  business_name = $1,
  address = $2,
  website = $3,
  manager_id = $4,
  phone = $5,
  hours_of_operation = $6,
  minimarket_location = $7
  WHERE client.id = $8;`;
  pool
    .query(queryText, [
      req.body.business_name,
      req.body.address,
      req.body.website,
      req.body.manager_id,
      req.body.phone,
      req.body.hours_of_operation,
      req.body.minimarket_location,
      
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });




// Demographic router --------------------------------------

router.put("/demographic", (req, res) => {
  // POST route code here

  let queryText = `UPDATE client
  SET number_of_people = $1,
  demographics = $2,
  neighborhood_info = $3,
  industry = $4
  WHERE client.id = $5;`;
  pool
    .query(queryText, [
      req.body.number_of_people,
      req.body.demographics,
      req.body.neighborhood_info,
      req.body.industry,
      
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Service Choice router --------------------------------------
router.put("/servicechoice", (req, res) => {
  const client_id = req.body.client_id;
  const service_id = req.body.service_id;

  const deleteQuery = `DELETE FROM client_service WHERE client_id = $1`;
  const insertQuery = `INSERT INTO client_service (client_id, service_id) VALUES ($1, $2)`;

  const deleteValues = [client_id];
  const insertValues = [client_id, service_id];

  pool
    .query(deleteQuery, deleteValues)
    .then(() => {
      return pool.query(insertQuery, insertValues);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing PUT service query", err);
      res.sendStatus(500);
    });
});

// Product Choice router --------------------------------------
router.put("/foodpreferences", (req, res) => {
  const client_id = req.body.client_id;
  const service_id = req.body.product_id;

  const deleteQuery = `DELETE FROM client_product WHERE client_id = $1`;
  const insertQuery = `INSERT INTO client_product (client_id, product_id) VALUES ($1, $2)`;

  const deleteValues = [client_id];
  const insertValues = [client_id, service_id];

  pool
    .query(deleteQuery, deleteValues)
    .then(() => {
      return pool.query(insertQuery, insertValues);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing PUT service query", err);
      res.sendStatus(500);
    });
});

// addtional info router --------------------------------------

router.put("/additionalinfo", (req, res) => {
  // POST route code here

  let queryText = `UPDATE client
  SET demensions = $1,
  pictures = $2,
  visit = $3
  WHERE client.id = $4;`;
  pool
    .query(queryText, [
      req.body.demensions,
      req.body.pictures,
      req.body.visit,
      
      
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});






module.exports = router;
