import uuid from 'uuid-random';

const usersMap = new Map();

//read
const _read = (req, res) => {
	const id = req.params.id;
	
	const user = usersMap.get(id);
	if (user && !user.isDeleted) {
		res.send("user = " + JSON.stringify(user));
	} else {
		res.status(500).send("user not found, id = " + id);
	}
};

//autosuggest
const _autosuggest = (req, res) => {
	const login = req.params.login;
	const limit = parseInt(req.params.limit);

	let count = 0;
	const userResult = [];
	const pattern = RegExp(".*" + login + ".*");
	for (const [id, user] of usersMap) {
		if (pattern.test(user.login) && !user.isDeleted) {
			userResult.push(user);
			count++;
			if (count === limit) {
				break;
			}
		}
	}

	if (userResult.length > 0) {
		userResult.sort((a, b) => {
			const loginA = a.login.toUpperCase();
			const loginB = b.login.toUpperCase();
	
			if (loginA < loginB) {
				return -1;
			}
			if (loginA > loginB) {
				return 1;
			}
	
			return 0;
		});
	
		res.send("user = " + JSON.stringify(userResult));
	} else {
		res.status(500).send("users not found");
	}
};

//create
const _create = (req, res) => {
	const id = uuid();

	const user = {
			id:id, 
			login:req.body.login, 
			password:req.body.password, 
			age:req.body.age, 
			isDeleted: false
	};
	usersMap.set(id, user);
	res.send("user created, id = " + id);
};

//delete
const _delete = (req, res) => {
	const id = req.params.id;
	
	const user = usersMap.get(id);
	if (user) {
		user.isDeleted = true;

		res.send("user removed, id = " + id);
	} else {
		res.status(500).send("user not found, id = " + id);
	}
};

//update
const _update = (req, res) => {
	const id = req.params.id;

	const user = usersMap.get(id);
	if (user && !user.isDeleted) {
		user.login = req.body.login;
		user.password = req.body.password;
		user.age = req.body.age;

		res.send("user updated, id = " + id);
	} else {
		res.status(500).send("user not found, id = " + id);
	}
};

export { _update, _delete, _create, _autosuggest, _read};
