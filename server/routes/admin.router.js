const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

router.get("/", (req, res) => {
  const query = `SELECT * FROM client`;
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
  const deleteQuery3 = 'DELETE FROM "user" WHERE id = $1;';
  const deleteQuery4 = "DELETE FROM client_product WHERE client_id = $1;"; // New query

  // Execute the first DELETE query
  pool
    .query(deleteQuery1, [clientId])
    .then(() => {
      // Execute the second DELETE query
      return pool.query(deleteQuery2, [clientId]);
    })
    .then(() => {
      // Execute the third DELETE query
      return pool.query(deleteQuery3, [clientId]);
    })
    .then(() => {
      // Execute the fourth DELETE query
      return pool.query(deleteQuery4, [clientId]);
    })
    .then(() => {
      // All four DELETE operations were successful
      res.status(200).json({ message: "Data deleted successfully" });
    })
    .catch((error) => {
      console.log("Error DELETE /api/recipe", error);
      res.sendStatus(500);
    });
});



module.exports = router;
