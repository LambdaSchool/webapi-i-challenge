const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
	//1st arg: route where a resource can be interacted with
	//2nd arg: callback to deal with sending responses, and handling incoming
  res.send('Hello from express');
})

server.post('/api/users', (req, res) => {
	const{ name, bio } = req.body;
	db.insert({ name, bio }).then(response => {
		res.send(response);
	})
		.catch(error => {
			res.json(error);
		});
});

server.get('/api/users/', (req, res) => {
	db.find().then(users => {
		res.json({ users });
	})
		.catch(error => {
			res.json(error);
		})
});


server.get('/api/users/:id', (req, res) => {
	// pull id off of req.params;
	// invoke proper db.method(id) passing it the id.
	// handle the promise like above
	const { id } = req.params
	db.findById(req.params.id).then(users => {
		res.json({ users });
	})
		.catch(error => {
			res.json(error);
	})
});

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params
	db.remove(req.params.id).then(users => {
		res.json({ users });
	})
		.catch(error => {
			res.json(error);
		})
});

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params
	const { name } = req.body.name
	db.update(req.params.id, req.body).then(success => {
		res.json({ success });
	})
		.catch(error=> {
			res.json(error);
		})
});


server.listen(port, () => console.log(`Server running on port ${port}`));


