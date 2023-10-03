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




router.put("/demographic", (req, res) => {
  // POST route code here

  let queryText = `UPDATE client
  SET number_of_people = $1,
  demographics = $2,
  neighborhood_info = $3,
  industry = $4
  WHERE client.id = 16;`;
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
// router.put("/servicechoice", (req, res) => {
//   const client_id = req.body.client_id;
//   const service_ids = req.body.service_id; // Assuming this is an array

//   const deleteQuery = `DELETE FROM client_service WHERE client_id = $1`;
//   const insertQuery = `INSERT INTO client_service (client_id, service_id) VALUES ($1, $2)`;

//   const deleteValues = [client_id];
  
//   // Use Promise.all to handle multiple inserts
//   Promise.all(
//     service_ids.map((service_id) => {
//       const insertValues = [client_id, service_id];
//       return pool.query(deleteQuery, deleteValues)
//         .then(() => pool.query(insertQuery, insertValues));
//     })
//   )
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log("Error completing PUT service query", err);
//       res.sendStatus(500);
//     });
// });




module.exports = router;
