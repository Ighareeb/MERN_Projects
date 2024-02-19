import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.route';
import authRoutes from './src/routes/auth.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log(err);
	});

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	return res.status(statusCode).json({
		success: false,
		message,
		statusCode,
	});
});
