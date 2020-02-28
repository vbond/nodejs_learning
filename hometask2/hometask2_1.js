
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

const usersMap = new Map();
let uid = 1;

//read
app.get("/user/:id", (req, res) => {
	
	let id = req.params.id;
	
	let user = usersMap.get(id);
	if (user && !user.isDeleted) {
		res.send("user = " + JSON.stringify(user));
	} else {
		res.send("user not found, id = " + id);
	}
	
});

//autosuggest
app.get("/users/:login/:limit", (req, res) => {
	
	const login = req.params.login;
	let limit = parseInt(req.params.limit);

	let count = 0;
	let userResult = new Array();
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
			var loginA = a.login.toUpperCase();
			var loginB = b.login.toUpperCase();
	
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
		res.send("users not found");
	}
});

//create
app.post("/user", (req, res) => {
	let id = uid.toString();

	let user = {
			id:id, 
			login:req.body.login, 
			password:req.body.password, 
			age:req.body.age, 
			isDeleted: false
	};
	usersMap.set(id, user);
	res.send("user created, id = " + id);

	uid++;
});

//delete
app.delete("/user/:id", (req, res) => {
	
	let id = req.params.id;
	
	let user = usersMap.get(id);
	if (user) {
		user.isDeleted = true;

		res.send("user removed, id = " + id);
	} else {
		res.send("user not found, id = " + id);
	}
});

//update
app.put("/user/:id", (req, res) => {
	let id = req.params.id;

	let user = usersMap.get(id);
	if (user && !user.isDeleted) {
		user.login = req.body.login;
		user.password = req.body.password;
		user.age = req.body.age;

		res.send("user updated, id = " + id);
	} else {
		res.send("user not found, id = " + id);
	}
});

app.listen(3001, () => {
	console.log("Example app listening on port 3001!");
});
