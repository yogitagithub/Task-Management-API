// routes/auth.js
const express = require('express');
const router = express.Router();
const Token = require('../models/token');

router.post('/logout', async (req, res) => {
    try {
        
        const token = req.headers.auth.split('')[1];
        await Token.findOneAndDelete({ token });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ error: 'Failed to logout' });
    }
});

module.exports = router;
