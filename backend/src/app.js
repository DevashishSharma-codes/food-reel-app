const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const app = express();

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/food', foodRoutes);
app.use('/api/auth', authRoutes);

app.get('/',(req,res)=>{
    res.send("Hello World");
});
module.exports = app; 
