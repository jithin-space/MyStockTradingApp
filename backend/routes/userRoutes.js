const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, password, email, firstName, lastName, phoneNumber } = req.body;
    try {

        const existingUser = await User.query().findOne({ username });

        console.log('username>>>', username);
        console.log(existingUser);
        
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.query().insert({
            username,
            password: hashedPassword,
            email,
            firstName,
            lastName,
            phoneNumber
        });

        res.status(201).json({
            id: newUser.id,
            username: newUser.username
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ error: "Error registering new user" });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);
    console.log('working node');
    try {
        const user = await User.query().findOne({ username });
        if(!user) {
            return res.status(404).json({ error: "user not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({error: "invalid credentials"})
        }

        const token = jwt.sign({ id: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '1h'});
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username
            }
         });
    } catch (error) {
        console.error('Login Error', error);
        res.status(500).json({ error: "Error during login" });
    }
});

module.exports = router;