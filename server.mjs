//Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.mjs';
import loginRoutes from './routes/login.mjs'
import signupRoutes from './routes/signup.mjs'


dotenv.config();

//Initialize app variable with express
const app = express();

//Connect DB
connectDB();

//Initialize middleware
app.use(express.json({extended: false}));
app.use(cors());

//Root to test 
app.get('/', (req, res)=>{
    res.send('Test for GET at root working...')
})

//Define routes
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);


//Environmetal variables
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));






