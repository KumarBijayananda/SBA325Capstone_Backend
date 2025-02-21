import jwt from 'jsonwebtoken'

//middleware to authenticate user data
export default (req, res, next)=>{
    const token = req.header('x-auth-token');

    //check if token exits
    if(!token){
        return res.status(401).json({errors: [{msg: 'No Token, denied'}]})
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user
        console.log("user authenticated", req.user.id)
        next();
    } catch (error) {
        console.error(err)
        res.status(401).json({errors:[{msg: 'Token is not valid'}]})             
    }
}