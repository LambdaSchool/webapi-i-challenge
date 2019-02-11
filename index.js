// implement your API here //
const express = require('express');

const db = require('./data/db.js');

const server = express();

// middleware
server.use(express.json());

// endpoints

// Initial endpoint to make sure code works
server.get('/', (req, res) => {
    res.send('<h2>Hello, I work!</h2>');
});

// Project Endpoints
// GET: returns array of all user objects in the db
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json({ success: true, users });
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message });
        });
});

// POST: creates user using info sent inside request body
server.post('/api/users', (req, res) => {
    const user = req.body;
    console.log('user', user);
    db
        .insert(user)
        .then(user => {
            res.status(201).json({ success: true, user });
        })
        .catch(({ code, message }) => {
            res.status(code).json({ success: false, message });
        });
});

// GET: returns user object with specified ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            res.status(200).json({ success: true, user });
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message });
        });
});

// DELETE: removes the user with specified id and returns the deleted user
server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db
        .remove(userId)
        .then(deletedUser => {
            res.status(204).end();
        })
        .catch(({ code, message }) => {
            res.status(code).json({ success: false, message });
        });
});

server.listen(4000, () => {
    console.log('\n *** Running on port 4000 *** \n');
});