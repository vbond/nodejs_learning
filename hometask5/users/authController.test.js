import "babel-polyfill";
import { _checkToken, _login } from "./controllers/authController.js";

const mockRequest =() => {
	const req = {};
	req.body = jest.fn().mockReturnValue(req);
	req.params = jest.fn().mockReturnValue(req);
	req.headers = jest.fn().mockReturnValue(req);
	return req;
};

const mockResponse = () => {
	const res = {};
	res.send = jest.fn().mockReturnValue(res);
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

const token = "token";
const decoded = "decoded";

jest.mock('jsonwebtoken', () => {
	const _token = "token";
	return {
		sign: (params) => {
			return _token;
		},
		verify: (token, secret, callback) => {
			const decoded = "decoded";
			if (token != _token) {
				callback(true, decoded);
			} else {
				callback(false, decoded);
			}
		}
	};
});

describe("Check method \'_login\' ", () => {
	
	test('should 200 and success auth', async () => {
		let req = mockRequest();
		req.body.username = "admin";
		req.body.password = "password";
		const res = mockResponse();

		await _login(req, res);

		expect(res.status).toHaveBeenCalledTimes(0);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith({
			success: true,
			message: 'Authentication successful!',
			token: token
		});
	});

	test('should 403 when username/password not correct', async () => {
		let req = mockRequest();
		req.body.username = "admin1";
		req.body.password = "password2";
		const res = mockResponse();

		await _login(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledTimes(1)
		expect(res.json).toHaveBeenCalledWith({
			success: false,
			message: 'Incorrect username or password'
		});
	});

	test('should 400 when username/password null', async () => {
		let req = mockRequest();
		const res = mockResponse();

		await _login(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledTimes(1)
		expect(res.json).toHaveBeenCalledWith({
			success: false,
			message: 'Authentication failed! Please check the request'
		});
	});
});

describe("Check method \'_checkToken\' ", () => {
	
	test('should successfully check token', async () => {
		let req = mockRequest();
		req.headers['x-access-token'] = token;
		const res = mockResponse();

		await _checkToken(req, res);

		expect(res.status).toHaveBeenCalledTimes(0);
		expect(res.json).toHaveBeenCalledTimes(0);
		expect(req.decoded).toEqual(decoded);
	});

	test('should 401 when token empty', async () => {
		let req = mockRequest();
		req.headers['x-access-token'] = "";
		const res = mockResponse();

		await _checkToken(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledTimes(1)
		expect(res.json).toHaveBeenCalledWith({
			success: false,
			message: 'Auth token is not supplied'
		});
	});

	test('should 403 when token invalid', async () => {
		let req = mockRequest();
		req.headers['x-access-token'] = "dummy";
		const res = mockResponse();

		await _checkToken(req, res);

		expect(res.status).toHaveBeenCalledTimes(1)
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledTimes(1)
		expect(res.json).toHaveBeenCalledWith({
			success: false,
			message: 'Token is not valid'
		});
	});
});
