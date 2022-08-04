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

        encryptedPassword = await bcrypt.hash(password, 10);
        console.log("Pass encyrpt: ", encryptedPassword);

        await userAuthModel.userAuthByEmail(username, (data, err) => {
            if(err){
                console.log("error validate: ",err)
            }else{
                if(data.length > 0){
                    console.log("desde validate: ",data[0,0].username)
                    return res.status(409).send(`User ${data[0,0].username} already exist. Please login`);
                    //return `${data[0,0].username}`;
                }else{
                    const userAuthData = {
                        username : req.body.username.toLowerCase(),
                        password: encryptedPassword
                    }
                    userAuthModel.createUserAuthModel(userAuthData, (err, login) => {
                        if(err){
                            console.log("Rta no id", err)
                        }else{
                            console.log("Id creado en model: ", login)
                            const token = jwt.sign(
                                { user_id : login, username },
                                process.env.TOKEN_KEY,
                                {expiresIn: '2h'}
                            )
        
                            console.log("Token: ",token);
        
                            login.token = token;
        
                            res.status(201).json(login);
                        }
                    });                    
                }
            }
        });       
    } catch (err) {
        console.log(err);        
    }
}

const userAuthLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
        console.log("Username: ", username," - Password",password);

        if(!username && !password){
            res.status(400).send('All input is required');
        }

        await userAuthModel.userAuthByEmail(username, (user, err) => {
            if(err){
                console.log("User not found");
            }else{
                console.log("User login found: ",user);
                if(user &&(bcrypt.compare(password, user.password))){
                    const token = jwt.sign(
                        {user_id: user.id, username},
                        process.env.TOKEN_KEY,
                        {expiresIn: "2h"}
                    );
        
                    user.token = token;
        
                    res.status(200).json(user);
                }
        
                res.status(400).send('Invalid credentials'); 
            }

        });       
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    userLoginCreate,
    userAuthLogin
}