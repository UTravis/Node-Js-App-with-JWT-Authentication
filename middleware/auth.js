const jwt = require("jsonwebtoken")


module.exports = async (req, res, next) => {

    const token = req.header('Authorization');
    if(! token) return res.status(404).json({AuthError: "Access Denied"});

    try {
        const isTokenVerified = await jwt.verify(token, process.env.SECRET_KEY);
        req.payload = isTokenVerified;
        next();
    } catch (error) {
        res.status(404).json({AuthError: "Invalid Access"})
    }
    
}