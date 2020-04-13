import "babel-polyfill";
import { _update, _delete, _create, _read, _readAll, groupsMap } from "./controllers/groupController.js";

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


describe("Check method \'_delete\' ", () => {
	
	groupsMap.set("1", {
		id:"1", 
		name:"name", 
		permissions:["DELETE"]
	});

	test('should 200 and return correct value', async () => {
		let req = mockRequest();
		req.params.id = "1";
		const res = mockResponse();

		await _delete(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith('group removed, id = 1');
	});

	test('should 500 and return correct value', async () => {
		let req = mockRequest();
		req.params.id = "dummy";
		const res = mockResponse();

		await _delete(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("group not found, id = dummy");
	});
});


describe("Check method \'_read\' ", () => {
	groupsMap.set("2", {
		id:"2", 
		name:"name", 
		permissions:["READ"]
	});

	
	test('should 200 and return correct value', async () => {
		let req = mockRequest();
		req.params.id = "2";
		const res = mockResponse();

		await _read(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("{\"id\":\"2\",\"name\":\"name\",\"permissions\":[\"READ\"]}");
	});

	test('should 500 and return correct value', async () => {
		let req = mockRequest();
		req.params.id = "dummy";
		const res = mockResponse();

		await _read(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("group not found, id = dummy");
	});
});

describe("Check method \'_readAll\' ", () => {
	test('should 200 and return correct value', async () => {
		const req = mockRequest();
		const res = mockResponse();

		await _readAll(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("[{\"id\":\"2\",\"name\":\"name\",\"permissions\":[\"READ\"]}]");
	});

	test('should 500 and return correct value', async () => {
		groupsMap.clear();
		const req = mockRequest();
		const res = mockResponse();

		await _readAll(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("groups not found");
	});
});


describe("Check method \'_create\' ", () => {
	test('should 200 and return correct value', async () => {
		const req = mockRequest();
		req.body.permissions = ["WRITE"] 
		const res = mockResponse();

		await _create(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		const group = groupsMap.values().next().value;
		expect(group.permissions).toEqual(["WRITE"]);
		expect(res.send).toHaveBeenCalledWith("group created, id = " + group.id);
	});

});

describe("Check method \'_update\' ", () => {

	test('should 200 and return correct value', async () => {
		groupsMap.set("3", {
			id:"3", 
			name:"name", 
			permissions:["WRITE"]
		});

		let req = mockRequest();
		req.params.id = "3";
		req.body.permissions = ["SHARE"];
		const res = mockResponse();

		await _update(req, res);

		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("group updated, id = 3");
		expect(groupsMap.get("3").permissions).toEqual(["SHARE"]);
	});

	test('should 500 and return correct value', async () => {
		let req = mockRequest();
		req.params.id = "dummy";
		const res = mockResponse();

		await _update(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledTimes(1)
		expect(res.send).toHaveBeenCalledWith("group not found, id = dummy");
	});
});
