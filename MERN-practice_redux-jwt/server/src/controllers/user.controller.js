import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		return next(errorHandler(403, 'You can only update your own account'));
	}

	try {
		//optional update password
		if (req.body.password) {
			req.body.password = await bcryptjs.hashSync(req.body.password, 10);
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				//$set operator used in MongoDB to update value of a field in a document. Replaces the value of a field with the specified value. If the field does not exist, $set will add a new field with the specified value.
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
					profilePicture: req.body.profilePicture,
				},
			},
			{ new: true },
		);
		const { password, ...rest } = updatedUser._doc;
		res.status(200).json({ message: 'Account updated', user: rest });
	} catch (err) {
		next(err);
	}
};
export const deleteUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		return next(errorHandler(403, 'You can only delete your own account'));
	}
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Account deleted' });
	} catch (err) {
		next(err);
	}
};
