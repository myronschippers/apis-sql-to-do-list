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
router.post('/', (req, res) => {
  const newTask = req.body;
  const queryText = `INSERT INTO "tasks" ("complete", "description")
  VALUES ($1, $2);`;

  pool.query(queryText, [
    false,
    newTask.description
  ])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('POST Error:', err);
      res.sendStatus(500);
    });
});

// PUT for updating complete status
router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const queryText = `UPDATE "tasks" SET "complete" = $1 WHERE "id" = $2;`;

  pool.query(queryText, [
    req.body.complete,
    taskId
  ])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('PUT Error:', err);
      res.sendStatus(500);
    });
});

// DELETE for task removal
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;

  pool.query(queryText, [
    taskId
  ])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('PUT Error:', err);
      res.sendStatus(500);
    });
});

module.exports = router;