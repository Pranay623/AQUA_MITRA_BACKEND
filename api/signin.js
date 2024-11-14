import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Model.js';
import 'dotenv/config';

const signin = express.Router();

signin.post('/signin', async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            status: "Failed",
            message: "Empty credentials",
        });
    }

    email = email.trim();
    password = password.trim();

    try {
        const user = await User.find({ email });
        
        if (user.length > 0) {
            const hashedPassword = user[0].password;
            const isMatch = await bcrypt.compare(password, hashedPassword);
    
            if (isMatch) {
                return res.json({
                    status: "SUCCESS",
                    message: "Sign in successful",
                    data: user[0],
                });
            } else {
                return res.json({
                    status: "Failed",
                    message: "Invalid password",
                });
            }
        } else {
            return res.json({
                status: "Failed",
                message: "Invalid credentials entered",
            });
        }
    } catch (err) {
        console.error("Error during sign-in:", err);
        return res.json({
            status: "Failed",
            message: "An error occurred while checking credentials",
        });
    }
});

export default signin;
