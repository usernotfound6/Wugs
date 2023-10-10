const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * Admin GET for ALL clients
 */
router.get("/", (req, res) => {
  // in query updated client table to c, user to u, service to s... for readability
  const sqlQuery = `
  SELECT
    c.id AS client_id,
    c.business_name,
    c.address_street,
    c.address_city,
    c.address_state,
    c.address_zip,
    c.website,
    c.phone,
    c.hours_of_operation,
    c.micromarket_location,
    c.neighborhood_info,
    c.demographics,
    c.number_of_people,
    c.target_age_group,
    c.industry,
    c.pictures,
    c.dimensions,
    c.wugs_visit,
    c.contract,
    c.admin_notes,
    s.status_name,
    u.first_name,
    u.last_name,
    u.username,
      ARRAY(SELECT DISTINCT service.service_name FROM client_service JOIN service ON client_service.service_id = service.id WHERE client_service.client_id = c.id) AS service_names,
      ARRAY(SELECT DISTINCT product.type FROM client_product JOIN product ON client_product.product_id = product.id WHERE client_product.client_id = c.id) AS product_types
    FROM
      client AS c
    JOIN
      "user" AS u ON c.manager_id = u.id
    LEFT JOIN
      status AS s ON c.status_id = s.id;
  `;
  pool
    .query(sqlQuery)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log("error on ALL clients GET", error)
      res.sendStatus(500);
    })
});

router.get("/user", (req, res) => {
  const query = `SELECT * FROM user`;
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



router.put("/:id", (req, res) => {
  // POST route code here
  console.log("router.put for Admin", req.body);
  let queryText = `UPDATE client
    SET 
    admin_notes = $1,
    status_id = $2
    WHERE client.id = $3;`;
  pool
    .query(queryText, [req.body.admin_notes, req.body.status_id, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const clientId = req.params.id;

  const deleteQuery1 = "DELETE FROM client_service WHERE client_id = $1;";
  const deleteQuery2 = "DELETE FROM client WHERE id = $1;";
  const deleteQuery4 = "DELETE FROM client_product WHERE client_id = $1;"; // New query

  // Execute the first DELETE query
  pool
    .query(deleteQuery1, [clientId])
    .then(() => {
      // Execute the second DELETE query
      return pool.query(deleteQuery2, [clientId]);
    })
    .then(() => {
      return pool.query(deleteQuery4, [clientId]);
    })
    .then(() => {
      res.status(200).json({ message: "Data deleted successfully" });
    })
    .catch((error) => {
      console.log("Error DELETE /api/recipe", error);
      res.sendStatus(500);
    });
});

module.exports = router;
