import jwt from 'jsonwebtoken';

const secret = 'secret';

const _checkToken = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Auth token is not supplied'
		});
	}
	
	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			return res.status(403).json({
				success: false,
				message: 'Token is not valid'
			});
		} else {
			req.decoded = decoded;
			next();
		}
	});
};

const _login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const mockedUsername = 'admin';
	const mockedPassword = 'password';

	if (!username || !password) {
		return res.status(400).json({
			success: false,
			message: 'Authentication failed! Please check the request'
		});
	}
	
	if (username !== mockedUsername || password !== mockedPassword) {
		return res.status(403).json({
			success: false,
			message: 'Incorrect username or password'
		});
	}
	
	const token = jwt.sign(
		{username: username},
		secret,
		{ expiresIn: '24h' }
	);

	return res.json({
		success: true,
		message: 'Authentication successful!',
		token: token
	});
};

const whitelist = ['http://example1.com', 'http://example2.com'];
const corsOptions = {
	origin: (origin, callback) => {
		if (origin && whitelist.indexOf(origin) === -1) {
			callback(new Error('Not allowed by CORS'));
			return;
		}

		callback(null, true);
	}
};

export { _checkToken, _login, corsOptions };
