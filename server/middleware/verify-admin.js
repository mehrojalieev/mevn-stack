const jwt = require("jsonwebtoken");
require("dotenv/config")

function verify_admin(req, res, next) {
    const adminToken = req.header("Authorization");

    if(!adminToken){
        return res.status(403).json({message: "You don't have access !"})
    }
    try {
        const decoded = jwt.verify(adminToken.split(" ")[1], process.env.JWT_SECRET);

        if(decoded.role !== "admin"){
            throw new Error("Token is not valid !")
        }

        req.user = decoded.user;
        next();
    } 

    catch (error) {
        res.status(401).json({message: error.message})    
    }
}


module.exports = verify_admin;