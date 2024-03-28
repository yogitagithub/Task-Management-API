const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('User routes are working!');
});

router.post('/register', async (req, res) => {
    try {
    const data = req.body;

        const user = new User(data);
        await user.save();
        res.status(201).send({ user, message: "User Created Successfully" });
    }

    catch (err) {
        res.status(400).send({ error: err });
    }
});

router.post('/login', async (req, res) => {
   try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if(!user){
        throw new Error('Unable to login , invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login , invalid password credentials');
    }

    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET_KEY );

    res.send({ user, token , message: "Logged in successfully"});
   }
    catch (err) {
        res.status(400).send({ message: 'Incorrect username or password' });
    }
 });

module.exports = router;