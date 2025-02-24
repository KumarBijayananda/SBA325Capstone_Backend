//Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.mjs';
import loginRoutes from './routes/login.mjs'
import signupRoutes from './routes/signup.mjs'
import dashboardRoutes from './routes/dashboard.mjs'
import draftRoutes from './routes/draft.mjs'
import archiveRoutes from './routes/archive.mjs'


dotenv.config();

//Initialize app variable with express
const app = express();

//Connect DB
connectDB();

//Initialize middleware
app.use(express.urlencoded());
app.use(express.json({extended: false}));
app.use(cors());

//Root to test 
app.get('/', (req, res)=>{
    res.send('Test for GET at root working...')
})

//Define routes
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/draft', draftRoutes);
app.use('/archive', archiveRoutes)

//Error handling middleware---------------
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });
  
  //If no endpoints are found use this to let the user know
  app.use((req, res) => {
    res.status(404).json({
      error: "Endpoint not found",
      path: req.originalUrl,
      method: req.method,
    });
  });


//Environmetal variables
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));






