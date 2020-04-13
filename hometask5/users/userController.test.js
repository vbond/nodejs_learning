import "babel-polyfill";
import retus from "retus";
import { _update, _delete, _create, _autosuggest, _read, usersMap } from "./controllers/userController.js";

const mockRequest =() => {
	const req = {};
	req.body = jest.fn().mockReturnValue(req);
	req.params = jest.fn().mockReturnValue(req);
	return req;
};

const mockResponse = () => {
	const res = {};
	res.send = jest.fn().mockReturnValue(res);
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};


usersMap.set("1", {
	id:"1", 
	login:"login", 
	password:"password", 
	age:20, 
	isDeleted: false,
	groupId: "groupId"
});

usersMap.set("2", {
	id:"2", 
	login:"login2", 
	password:"password", 
	age:20, 
	isDeleted: false
});

usersMap.set("3", {
	id:"3", 
	login:"login3", 
	password:"password", 
	age:20, 
	isDeleted: true,
	groupId: "groupId2"
});

jest.mock('retus', () => {
	return {get: () => {
			return {
				body: "{id:\"3\", name:\"name\", permissions:[\"WRITE\"]}"
			};
		}
	};
});

describe("Check method \'_read\' ", () => {
	
	test('should 200 and return user with group', async () => {
		let req = mockRequest();
		req.params.id = "1";
		const res = mockResponse();

		await _read(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user = {\"id\":\"1\",\"login\":\"login\",\"password\":\"password\",\"age\":20,\"isDeleted\":false,\"groupId\":\"groupId\"} " + 
				"group = {id:\"3\", name:\"name\", permissions:[\"WRITE\"]}");
	});

	test('should 200 and return user without group', async () => {
		let req = mockRequest();
		req.params.id = "2";
		const res = mockResponse();

		await _read(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user = {\"id\":\"2\",\"login\":\"login2\",\"password\":\"password\",\"age\":20,\"isDeleted\":false}");
	});

	test('should 500 when dummy user id', async () => {
		let req = mockRequest();
		req.params.id = "dummy";
		const res = mockResponse();

		await _read(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user not found, id = dummy");
	});
	
	test('should 500 when user is deleted', async () => {
		let req = mockRequest();
		req.params.id = "3";
		const res = mockResponse();

		await _read(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user not found, id = 3");
	});
});

describe("Check method \'_autosuggest\' ", () => {
	test('should 200 and return 2 users when limit 10', async () => {
		const req = mockRequest();
		req.params.login = "log";
		req.params.limit = 10;
		const res = mockResponse();

		await _autosuggest(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user = [{\"id\":\"1\",\"login\":\"login\",\"password\":\"password\",\"age\":20,\"isDeleted\":false," +
				"\"groupId\":\"groupId\"},{\"id\":\"2\",\"login\":\"login2\",\"password\":\"password\",\"age\":20,\"isDeleted\":false}]");
	});

	test('should 200 and return 1 users when limit 1', async () => {
		const req = mockRequest();
		req.params.login = "log";
		req.params.limit = 1;
		const res = mockResponse();

		await _autosuggest(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user = [{\"id\":\"1\",\"login\":\"login\",\"password\":\"password\",\"age\":20,\"isDeleted\":false,\"groupId\":\"groupId\"}]");
	});

	test('should 500 when users not found', async () => {
		const req = mockRequest();
		req.params.login = "log1";
		req.params.limit = 10;
		const res = mockResponse();

		await _autosuggest(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("users not found");
	});
});


describe("Check method \'_update\' ", () => {

	test('should 200 and return correct value', async () => {
		let req = mockRequest();
		req.params.id = "2";
		req.body.login = "l123"; 
		req.body.password = "p132" 
		req.body.age = 25;
		req.body.groupId = "g132";
		const res = mockResponse();

		await _update(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user updated, id = 2");
		expect(usersMap.get("2").login).toEqual("l123");
		expect(usersMap.get("2").password).toEqual("p132");
		expect(usersMap.get("2").age).toEqual(25);
		expect(usersMap.get("2").groupId).toEqual("g132");
	});

	test('should 500 when user id does not exist', async () => {
		let req = mockRequest();
		req.params.id = "dummy";
		const res = mockResponse();

		await _update(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user not found, id = dummy");
	});
	
	test('should 500 when user is deleted', async () => {
		let req = mockRequest();
		req.params.id = "3";
		req.body.login = "l123"; 
		req.body.password = "p132" 
		req.body.age = 25;
		req.body.groupId = "g132";
		const res = mockResponse();

		await _update(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user not found, id = 3");
	});
	
});

describe("Check method \'_delete\' ", () => {

	test('should 200 and return correct value', async () => {
		let req = mockRequest();
		req.params.id = "1";
		const res = mockResponse();

		await _delete(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith('user removed, id = 1');
		expect(usersMap.get("1").isDeleted).toEqual(true);
	});

	test('should 500 when user id does not exist', async () => {
		let req = mockRequest();
		req.params.id = "dummy";
		const res = mockResponse();

		await _delete(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("user not found, id = dummy");
	});
});


describe("Check method \'_create\' ", () => {
	test('should 200 and return correct value', async () => {
		usersMap.clear();
		const req = mockRequest();
		req.body.login = "login123"; 
		req.body.password = "password132" 
		req.body.age = 25;
		req.body.groupId = "groupId132";
		const res = mockResponse();

		await _create(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		const user = usersMap.values().next().value;
		expect(user.login).toEqual("login123");
		expect(user.password).toEqual("password132");
		expect(user.age).toEqual(25);
		expect(user.groupId).toEqual("groupId132");
		expect(res.send).toHaveBeenCalledWith("user created, id = " + user.id);
	});

});

