import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/model.js';
import 'dotenv/config';

const signin = express.Router();

signin.post('/signin', async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "Failed",
            message: "Empty credentials",
        });
    }

    email = email.trim();
    password = password.trim();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid credentials entered",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid password",
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: "Sign in successful",
            userID: user._id,
            email: user.email,
            name: user.name,
        });

    } catch (err) {
        console.error("Error during sign-in:", err);
        return res.status(500).json({
            status: "Failed",
            message: "An error occurred while checking credentials",
        });
    }
});

export default signin;
