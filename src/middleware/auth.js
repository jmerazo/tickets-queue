const { config } = require('dotenv');
const jwt = require('jsonwebtoken')

//const verifyToken = (req, res, next) => {
//    const token = req.body.token || req.query.token || req.headers["x-access-token"];
//
//    if(!token){
//        return res.status(403).send('A token is required for authentication');
//    }
//
//    try{
//        const decoded = jwt.verify(token, config.TOKEN_KEY);
//        req.user = decoded;
//        next();
//    } catch (err) {
//        return res.status(401).send('Invalid Token');
//    }
//}

const verifyToken = async(req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        console.log("token: ", req.token);
        next();
    }else{
        res.sendStatus(403);
    }
}

module.exports = verifyToken;