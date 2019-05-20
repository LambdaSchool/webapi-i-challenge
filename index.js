// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());

server.get('/api/users', (req, res) => {

    db
    .find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res
        .status(500)
        .json({message: 'The users information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
    const  { id } = req.params;
    db
    .findById(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res
        .status(404)
        .json({message: 'The user with the specified ID does not exist.'});
    });
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if (userInfo.name && userInfo.bio) {
    console.log('request body: ', userInfo);
    db
    .insert(userInfo)
    .then(user => {
        console.log('user from insert method')
        res
        .status(201)
        .json(user);
    })
    .catch(err => {
        res
        .status(500)
        .json({message: 'Please provide name and bio for the user.'});
    });
    } else {
        res
        .status(400)
        .json({message: 'missing name or bio'})
    }
    
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.
    remove(userId)
    .then(count => {
        if(count) {
            res.json({message: "successfully deleted"})
        } else {
            res
            .status(204)
            .json({message: "cannot delete/no such user id"})
            .end();
        }
    
    })
    .catch(err => {
        res
        .status(500)
        .json({message: 'Error deleting the user.'});
    });
});
 
server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const userInfo = req.body;
    if(userId && userInfo) {
    db.
    update(userId, userInfo)
    .then(count => {
        if(count) {
            db.findById(userId).then(user => {
                res.json(user);
            });
        } else {
            res
            .status(404)
            .json({message: 'Invalid Id'});
        }
    }).catch(err => {
        res
        .status(500)
        .json({message : 'The user information could not be modified.'});
    });
    } else {
        res.status(400)
        .json({message: 'Missing name or bio'})
    }
});

server.listen(port, () => console.log(`\n*** API running on port ${port} ***\n`));