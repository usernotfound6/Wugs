const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * The single client GET 
 */
router.get("/client/:id", (req, res) => {
  const clientId = [Number(req.params.id)];
  // console.log('clientId is:', clientId)

  // in query updated client table to c, user to u, service to s... for readability
  const sqlQuery = `
  SELECT
    c.id AS client_id,
    c.business_name,
    c.address,
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
      status AS s ON c.status_id = s.id
    WHERE
      c.id = $1;
  `;
  pool.query(sqlQuery, clientId)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log("error on single client GET", error)
      res.sendStatus(500);
    })
})

/**
 * The GET for ALL clients
 */
router.get("/allclients", (req, res) => {

  // in query updated client table to c, user to u, service to s... for readability
  const sqlQuery = `
  SELECT
    c.id AS client_id,
    c.business_name,
    c.address,
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
  pool.query(sqlQuery)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log("error on single client GET", error)
      res.sendStatus(500);
    })
});


/**
 * GET route template
 */
router.get("/clientservice/:id", (req, res) => {
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

// Client Location router ------------------------------------------------------------------------------------------------------------------

router.put("/clientlocationinfo/:id", (req, res) => {
  // POST route code here
  console.log("req.body", req.body)

  let queryParams = req.body.clientLocationInfoObject

  let queryText = `UPDATE client
  SET 
  business_name = $1,
  address = $2,
  website = $3,
  phone = $4,
  hours_of_operation = $5,
  micromarket_location = $6
  WHERE client.id = $7;`;
  pool
    .query(queryText, [
      queryParams.business_name,
      queryParams.address,
      queryParams.website,
      queryParams.phone,
      queryParams.hours_of_operation,
      queryParams.micromarket_location,
      queryParams.client_id
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Demographic router ------------------------------------------------------------------------------------------------------------------

router.put("/demographic/:id", (req, res) => {
  // POST route code here

  let queryText = `UPDATE client
  SET number_of_people = $1,
  demographics = $2,
  neighborhood_info = $3,
  industry = $4,
  target_age_group = $5
  WHERE client.id = $6;`;
  pool
    .query(queryText, [
      req.body.number_of_people,
      req.body.demographics,
      req.body.neighborhood_info,
      req.body.industry,
      req.body.age_group,
      req.params.id
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Service Choice router ------------------------------------------------------------------------------------------------------------------

router.put("/servicechoice", (req, res) => {
  console.log("req.body is:", req.body)
  const client_id = req.body.client_id;
  const service_id = req.body.service_id; // Assuming service_id is an array

  const deleteQuery = `DELETE FROM client_service WHERE client_id = $1`;

  const deleteValues = [client_id];

  pool
    .query(deleteQuery, deleteValues)
    .then(() => {
      // Use a loop to insert multiple rows
      const insertQuery = `
        INSERT INTO client_service (client_id, service_id)
        SELECT $1, unnest($2::int[])
      `;
      const insertValues = [client_id, service_id];

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

// Product Choice router ------------------------------------------------------------------------------------------------------------------
router.post("/foodpreferences", (req, res) => {
  const client_id = req.body.client_id;
  const product_ids = req.body.clickedButtons;

  const deleteQuery = `DELETE FROM client_product WHERE client_id = \$1 AND product_id NOT IN (${product_ids.join()})`;
  const deleteValues = [client_id];

  pool
    .query(deleteQuery, deleteValues)
    .then(() => {
      const insertQuery = `
        INSERT INTO client_product (client_id, product_id)
        SELECT \$1, unnest(\$2::int[])
        ON CONFLICT (client_id, product_id) DO NOTHING
      `;
      const insertValues = [client_id, product_ids];

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




// addtional info router ------------------------------------------------------------------------------------------------------------------

router.put("/additionalinfo/:id", (req, res) => {
  // POST route code here

  let queryText = `UPDATE client
  SET dimensions = $1,
  pictures = $2,
  wugs_visit = $3
  WHERE client.id = $4;`;
  pool
    .query(queryText, [req.body.dimensions, req.body.pictures, req.body.wugs_visit, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
