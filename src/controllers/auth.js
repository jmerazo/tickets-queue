const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userAuthModel = require('../models/auth');

const userLoginCreate = async (req, res) => {
    try {        
        var {username, password} = req.body;
        console.log("Username: ",username);
        console.log("Password: ",password);
        
        if(!username || !password){
            res.status(400).send('All input is required');
        }

        var validateEmail = userAuthModel.userAuthByEmail(username);

        console.log("Check email: ",validateEmail);

        if(validateEmail){
            return res.status(409).send('User already exist. Please login');
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        console.log("Pass encyrpt: ", encryptedPassword);

        const userAuthData = {
            username : req.body.username.toLowerCase(),
            password: encryptedPassword
        }
        const userAuth = await userAuthModel.createUserAuthModel(userAuthData);

        console.log("User data: ",userAuth);

        const token = jwt.sign(
            { user_id : userAuth, username },
            process.env.TOKEN_KEY,
            {expiresIn: '2h'}
        )

        console.log("Token: ",token);

        userAuth.token = token;

        res.status(201).json(userAuth);

    } catch (err) {
        console.log(err);        
    }
}

const userAuthLogin = async (req, res) => {
    try {
        const {username, password} = req.body;

        if(!username && !password){
            res.status(400).send('All input is required');
        }

        const findUser = await userAuthModel.userAuthByEmail(username);

        if(user &&(await bcrypt.compare(password, findUser.password))){
            const token = jwt.sign(
                {user_id: findUser.id, username},
                process.env.TOKEN_KEY,
                {expiresIn: "2h"}
            );

            findUser.token = token;

            res.status(200).json(findUser);
        }

        res.status(400).send('Invalid credentials');        
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    userLoginCreate,
    userAuthLogin
}