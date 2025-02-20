//Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

//Initialize app variable with express
const app = express();

//Connect DB


//Initialize middleware
app.use(express.json({extended: false}));
app.use(cors());

//Root to test 
app.get('/', (req, res)=>{
    res.send('Test for GET at root working...')
})

//Define routes
const PORT=process.env.PORT||3000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));






