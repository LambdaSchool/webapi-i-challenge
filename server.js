const express = require('express');
const db = require('./data/db.js');

const port = 5000;
const server = express();
server.use(express.json());

// server.get('/', (req, res) => {
//     res.send('Hello from express');
// });


server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    db
        .insert({ name, bio })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        })
});

server.listen(port, () => console.log(`Server is running on port ${port}`));