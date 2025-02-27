import jwt from 'jsonwebtoken'

//middleware to authenticate user data
export default (req, res, next)=>{
    const token = req.header('x-auth-token');

    //check if token exits
    if(!token){
        return res.status(401).json({errors: [{msg: 'No Token, denied'}]})
    }
    try {
        //decode the token using the secret key vaiable from .env file
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user
        next();
    } catch (error) {
        console.error(err)
        res.status(401).json({errors:[{msg: 'Token is not valid'}]})             
    }
}