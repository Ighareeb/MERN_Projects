import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		//check if user and password is valid
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(400, 'Invalid email or password'));
		}
		const validPassword = await bcrypt.compare(password, validUser.password);
		if (!validPassword) {
			return next(errorHandler(400, 'Invalid email or password'));
		}

		//sign JWT with user id & secret key + set expiry --> response === JWT in cookie; user object (without password) in res.body
		//process.env.JWT_SECRET should be used
		const token = jwt.sign({ id: validUser._id }, 'secret');
		const { password: hashedPassword, ...rest } = validUser._doc;
		const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
		res
			.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
			.status(200)
			.json(rest);
	} catch (err) {
		next(err);
	}
};

export const signUp = async (req, res, next) => {
	const { username, email, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);
	const newUser = new User({ username, email, password: hashedPassword });
	try {
		await newUser.save();
		res
			.status(201)
			.json({ message: `User: ${username} created successfully!` });
	} catch (err) {
		next(err);
	}
};

//handle user authentication with google sign-in
export const google = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			//process.env.JWT_SECRET should be used
			const token = jwt.sign({ id: user._id }, 'secret');
			const { password: hashedPassword, ...rest } = user._doc;
			const expiryData = new Date(Date.now() + 60 * 60 * 1000);

			res
				.cookie('access_token', token, { httpOnly: true, expires: expiryData })
				.status(200)
				.json(rest);
		} else {
			//random 16-character alphanumeric string
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
			const newUser = new User({
				username: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				profilePicture: req.body.photo,
			});
			await newUser.save();
			const token = jwt.sign({ id: newUser._id }, 'secret');
			const { password: hashedPassword2, ...rest } = newUser._doc;
			const expiryData = new Date(Date.now() + 60 * 60 * 1000);
			res
				.cookie('access_token', token, {
					httpOnly: true,
					expires: expiryData,
				})
				.status(200)
				.json(rest);
		}
	} catch (err) {
		next(err);
	}
};

export const signOut = async (req, res, next) => {
	res
		.clearCookie('access_token')
		.status(200)
		.json({ message: 'You have signed out successfully' });
};
