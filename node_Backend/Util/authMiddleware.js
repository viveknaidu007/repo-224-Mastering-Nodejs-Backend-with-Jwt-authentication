const jwt = require('jsonwebtoken');

const JWT_SECRET = 'vivek_here';

const validateJWT = (req,res,next) => {
    try {
        console.log(req)
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        if(!authHeader || !authHeader.startsWith('DSV ')){
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        const token = authHeader.split(' ')[1];  

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        console.log(req.user)
        req.user = decoded;
        next();

    } catch (error) {

        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        
    }
}


module.exports = validateJWT