const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET for all tasks
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "tasks";`;

  pool.query(queryText)
    .then((dbResponse) => {
      const tasksList = dbResponse.rows;
      res.send(tasksList);
    })
    .catch((err) => {
      console.log('GET Error:', err);
      res.sendStatus(500);
    });
});

// POST for adding new task
router.post('/', (req, res) => {});

// PUT for updating complete status
router.put('/', (req, res) => {});

// DELETE for task removal
router.delete('/', (req, res) => {});

module.exports = router;