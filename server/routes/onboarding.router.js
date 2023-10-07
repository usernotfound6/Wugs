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
  pool
    .query(sqlQuery, clientId)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log("error on single client GET", error)
      res.sendStatus(500);
    })
})

/**
 * Admin GET for ALL clients
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
  pool
    .query(sqlQuery)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log("error on single client GET", error)
      res.sendStatus(500);
    })
});

// Service Choice router ------------------------------------------------------------------------------------------------------------------

router.put("/servicechoice/:id", (req, res) => {
  console.log("req.body is:", req.body)
  const client_id = Number(req.params.id);
  const service_id = req.body.service_id; // Assuming service_id is an array

  const deleteQuery = `DELETE FROM client_service WHERE client_id = $1`;
  const deleteValues = [client_id];

  pool
    .query(deleteQuery, deleteValues)
    .then(() => {
      // Use a loop to insert multiple rows
      const insertQuery = `
        INSERT INTO client_service (client_id, service_id)
        SELECT $1, unnest($2::int[]);
      `;
      const insertValues = [client_id, service_id];
      return pool.query(insertQuery, insertValues);
    })
    .then(() => {
      console.log("successful PUT");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing PUT service query", err);
      res.sendStatus(500);
    });
});

// Client Location router ------------------------------------------------------------------------------------------------------------------

router.put("/clientlocationinfo/:id", (req, res) => {
  console.log("req.body", req.body);
  const clientId = Number(req.params.id);
  console.log("clientId:", clientId);

  let queryParams = [
    req.body.business_name, //1
    req.body.address, //2
    req.body.website, //3
    req.body.phone, //4 
    req.body.hours_of_operation, //5
    req.body.micromarket_location, //6
    clientId //7
  ];
  let sqlText = `
  UPDATE client
  SET 
    business_name = $1,
    address = $2,
    website = $3,
    phone = $4,
    hours_of_operation = $5,
    micromarket_location = $6
  WHERE client.id = $7;
  `;

  pool
    .query(sqlText, queryParams)
    .then((result) => {
      console.log("successful PUT");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Demographic router ------------------------------------------------------------------------------------------------------------------

router.put("/demographics/:id", (req, res) => {
  const clientId = Number(req.params.id);
  console.log("clientId:", clientId);

  let queryParams = [
    req.body.number_of_people, //1
    req.body.demographics, //2 
    req.body.neighborhood_info, //3 
    req.body.industry, //4
    req.body.age_group, //5
    clientId //6
  ];
  let queryText = `
  UPDATE client
  SET 
    number_of_people = $1,
    demographics = $2,
    neighborhood_info = $3,
    industry = $4,
    target_age_group = $5
  WHERE client.id = $6;
  `;
  pool
    .query(queryText, queryParams)
    .then((result) => {
      console.log("successful PUT");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Product Choice router ------------------------------------------------------------------------------------------------------------------
router.put("/foodpreferences", (req, res) => {
  const clientId = Number(req.params.id);
  console.log("clientId:", clientId);
  const product_id = req.body.product_id;

  const deleteQuery = `DELETE FROM client_product WHERE client_id = $1`;
  const deleteValues = clientId;

  pool
    .query(deleteQuery, deleteValues)
    .then(() => {
      // Use a loop to insert multiple rows unnest($2::int[]) is used to "unnest" or expand the array of service IDs
      const insertQuery = `
        INSERT INTO client_product (client_id, product_id)
        SELECT $1, unnest($2::int[])
      `;
      const insertValues = [clientId, product_id];

      return pool.query(insertQuery, insertValues);
    })
    .then(() => {
      console.log("successful PUT");
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
  const clientId = Number(req.params.id);
  console.log("clientId:", clientId);
  const queryParams = [
    req.body.dimensions, //1
    req.body.pictures, //2
    req.body.wugs_visit, //3
    clientId //4
  ];
  const queryText = `
  UPDATE client
  SET 
    dimensions = $1,
    pictures = $2,
    wugs_visit = $3
  WHERE client.id = $4;
  `;
  pool
    .query(queryText, queryParams)
    .then((result) => {
      console.log("successful PUT");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
