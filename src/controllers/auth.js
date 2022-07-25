const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateEmailController = require('../controllers/users');
const userAuthModel = require('../models/auth');

const userAuthCreate = async (req, res, next) => {
    try {
        
        const {username, password} = req.body;
        
        if(!username || !password){
            res.status(400).send('All input is required');
        }

        const validateEmail = await userAuthModel.userAuthByEmail(username);

        if(validateEmail){
            return res.status(409).send('User already exist. Please login');
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const userAuthData = {
            username : req.body.username.toLowerCase(),
            password: encryptedPassword
        }
        const userAuth = await userAuthModel.createUserAuthModel(userAuthData, (error, data) => {
            if(error){
                res.status(500).json({message:'Error'})
            }else{
                res.send(data).status(200);
            }
        })

        const token = jwt.sign(
            { user_id : userAuth.id, username },
            process.env.TOKEN_KEY,
            {expiresIn: '2h'}
        )

        userAuth.token = token;

        res.status(201).json(userAuth);

    } catch (err) {
        console.log(err);        
    }
}

const userAuthLogin = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        if(!username && !password){
            res.status(400).send('All input is required');
        }

        const userAuth = await userAuthModel.userAuthByEmail(username);

        if(user &&(await bcrypt.compare(password, userAuth.password))){
            const token = jwt.sign(
                {user_id: userAuth.id, username},
                process.env.TOKEN_KEY,
                {expiresIn: "2h"}
            );

            userAuth.token = token;

            res.status(200).json(userAuth);
        }

        res.status(400).send('Invalid credentials');        
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    userAuthCreate,
    userAuthLogin
}