// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json()); // <<<<<<<< to parse JSON

server.get('/', (req, res) => {
  res.send('Hello Universe!');
});

server.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

// GET /users
server.get('/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: 'The users information could not be retrieved.'
      });
    });
});

// POST /users
server.post('/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  if (newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(user => {
        res.status(201).json({ success: true, user });
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          error: err,
          message: 'Please provide name and bio for the user.'
        });
      });
  } else {
    res.status(500).json({
      success: false,
      error: err,
      message: 'There was an error while saving the user to the database.'
    });
  }
});

// GET /users/:id
server.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.findById(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          success: false,
          error: err,
          message: 'The user with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: 'The user information could not be retrieved.'
      });
    });
});

const port = process.env.PORT || 9090;
server.listen(port, () => {
  console.log(`\n*** Listening on port ${port} ***\n`);
});
