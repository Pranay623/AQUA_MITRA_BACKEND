import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/model.js';
import 'dotenv/config';



router.post('/signup', async (req, res) => {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    
    // Validation checks
    if (name === "" || email === "" || password === "") {
        return res.json({
            status: "Failed",
            message: "Empty fields",
        });
    }


    if (!/^[a-zA-Z ]*$/.test(name)) {
        return res.json({
            status: "Failed",
            message: "Invalid name",
        });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: "Failed",
            message: "Invalid e-mail",
        });
    }

    if (password.length < 8) {
        return res.json({
            status: "Failed",
            message: "Password is too short",
        });
    }

    try {
        const existingUser = await User.find({ email });

        if (existingUser.length) {
            return res.json({
                status: "Failed",
                message: "User with this email already exists",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const result = await newUser.save();
        res.json({
            status: "SUCCESS",
            message: "Signup successful",
            data: {
                result }});

    } catch (err) {
        console.error(err);
        res.json({
            status: "Failed",
            message: "An error occurred while processing your request",
        });
    }
});


export default router;