require('dotenv').config();
const express = require('express')
const app = express();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 

const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const tokenRoutes = require('./routes/logoutRoutes');


const PORT = process.env.PORT || 8000;

app.use('/api/auth', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', tokenRoutes);

app.get('/', (req, res) =>{
    res.json({
        message: 'Task manager API is working!'
    })
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});