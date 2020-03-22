import jwt from 'jsonwebtoken';

const secret = 'secret';

const _checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'];

	if (token) {
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
	} else {
		return res.status(401).json({
			success: false,
			message: 'Auth token is not supplied'
		});
	}
};

const _login = (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	let mockedUsername = 'admin';
	let mockedPassword = 'password';

	if (username && password) {
		if (username === mockedUsername && password === mockedPassword) {
			let token = jwt.sign(
				{username: username},
				secret,
				{ expiresIn: '24h' }
			);

			res.json({
				success: true,
				message: 'Authentication successful!',
				token: token
			});
		} else {
			res.status(403).json({
				success: false,
				message: 'Incorrect username or password'
			});
		}
	} else {
		res.status(400).json({
			success: false,
			message: 'Authentication failed! Please check the request'
		});
	}
};

export { _checkToken, _login };
