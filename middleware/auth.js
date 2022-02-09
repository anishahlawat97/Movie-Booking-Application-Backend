module.exports = function (req, res, next){
    const token = req.headers['Authorization'];

    if(!token){
        return res.status(401).send({
            message: "Access Denied. No token provided"
        })
    }
    try{        
        next();
    }
    catch(exception){
        res.status(400).send("Invalid Token")
    }
}