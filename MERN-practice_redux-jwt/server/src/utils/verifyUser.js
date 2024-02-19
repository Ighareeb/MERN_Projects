import jwt from 'jsonwebtoken';
import { errorHandler } from './error';

export const verifyUser = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		return next(errorHandler(401, 'You need to login first'));
	}

	//process.env.JWT_SECRET should be used in .env file
	jwt.verify(token, 'secret', (err, user) => {
		if (err) {
			return next(errorHandler(403, 'Invalid token'));
		}
		req.user = user;
		next();
	});
};
