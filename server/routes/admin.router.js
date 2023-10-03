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

  router.delete("/:id", rejectUnauthenticated, (req, res) => {
    const clientId = req.params.id;
  
    const deleteQuery = "DELETE FROM client WHERE client.id=$1";
  
    // Execute the first DELETE query
    pool
      .query(deleteQuery, [clientId])
      
      .then(() => {
        // Both DELETE operations were successful
        res.status(200).json({ message: "client and related data deleted" });
      })
      .catch((error) => {
        console.log("Error DELETE /api/client", error);
        res.sendStatus(500);
      });
  });

  module.exports = router;
