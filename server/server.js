const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routers/tasks.router');

const app = express();
const PORT = 5000;

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
// accept JSON for postman
app.use(bodyParser.json());

app.use(express.static('server/public'));

// routes config
app.use('/api/tasks', tasksRouter);

// kick off the server
app.listen(PORT, () => {
  console.log('Server running on PORT', PORT);
})
