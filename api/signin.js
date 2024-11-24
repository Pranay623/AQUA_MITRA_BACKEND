import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Model.js';
import 'dotenv/config';

const signin = express.Router();

signin.post('/signin', async (req, res) => {
    let { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({
            status: "Failed",
            message: "Empty credentials",
        });
    }

    email = email.trim();
    password = password.trim();

    try {
        // Find the user with the given email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid credentials entered",
            });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid password",
            });
        }

        // Successful sign-in
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
