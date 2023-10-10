const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const { google } = require("googleapis");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});
const upload = multer({ storage: storage });
const keyFile = require("/Users/papaporo/Prime/wugs_app/Wugs/our-chassis-401623-8599a8b4f596.json"); // Load the key file




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
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error on single client GET", error);
      res.sendStatus(500);
    });
});

// Service Choice router ------------------------------------------------------------------------------------------------------------------

router.put("/servicechoice/:id", (req, res) => {
  console.log("req.body is:", req.body);
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
    clientId, //7
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
    clientId, //6
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
    clientId, //4
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

/**
 * PUT - transaction type PUT for 2 queries!
 */

router.put("/changecontact/:id", rejectUnauthenticated, async (req, res) => {
  const clientId = Number(req.params.id);
  console.log("clientId:", clientId);
  console.log("req.body:", req.body);

  const clientQueryParams = [
    req.body.phone, //1
    clientId, //2
  ];
  const userQueryParams = [
    req.body.first_name, //1
    req.body.last_name, //2
    req.body.username, //3
    req.body.user_id, //4
  ];

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const clientSqlText = `
    UPDATE client
    SET 
      phone = $1
    WHERE id = $2;
  `;
    const userSqlText = `
    UPDATE "user"
    SET 
      first_name = $1,
      last_name = $2,
      username = $3
    WHERE id = $4;
  `;
    // first run query to update client
    await connection.query(clientSqlText, clientQueryParams);
    // then run query to update user table
    await connection.query(userSqlText, userQueryParams);
    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log("Transaction Error - Rolling back transfer", error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

// router.post('/upload', (req, res) => {
//   // console.log("My giphy api key:", process.env.CALENDLY_API_KEY)
//   const apiKey = process.env.CALENDLY_API_KEY

//   const options = {
//       method: 'GET',
//       url: 'https://api.calendly.com/users/me',
//       headers: {'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}`}
//     };

//   axios.request(options).then(function (response) {
//       console.log("here is the Data", response.data);
//       res.send(response.data)

//     }).catch(function (error) {
//       console.error(error);
//     });
// })

router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keyFile,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    // Use the 'auth' object for Google Drive authentication
    console.log(auth);

    const drive = google.drive({
      version: "v3",
      auth,
    });

    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      
      // Replace '156Ey1X37jwuVtcg7DgBmCAMrBljLJcaG' with the correct folder ID
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimetype,
          parents: ['156Ey1X37jwuVtcg7DgBmCAMrBljLJcaG'],
        },
        media: {
          body: fs.createReadStream(file.path),
        },
      });
      uploadedFiles.push(response.data);
    }
    
    // Respond to the client with a success message or other data
    res.json({ message: "Files uploaded successfully", files: uploadedFiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


module.exports = router;
