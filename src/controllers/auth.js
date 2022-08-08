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
        console.log("Username: ", username," - Password: ",password);

        if(!username && !password){
            res.status(400).send('All input is required');
        }

        userAuthModel.userAuthByEmail(username, async (user, err) => {
            if(user == ""){
                console.log(`User ${username} not found`, err);
                res.sendStatus(403);
            }else{
                const userData = {
                    id : user[0,0].id,
                    username : user[0,0].username,
                    password : user[0,0].password
                }
                if(userData &&(await bcrypt.compare(password, userData.password))){
                    const token = jwt.sign(
                        {user_id: userData.id, username},
                        process.env.TOKEN_KEY,
                        {expiresIn: "2h"}
                    );        
                    userData.token = token;        
                    res.json(userData);
                }else{
                    res.status(400).send('Invalid credentials'); 
                }          
            }
            
        });       
    } catch (error) {
        console.log(error);        
    }
}

const userProtect = async (req, res, next) => {
    res.send({msg: "Welcome to protect"});
}

const userAuthLogout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    jwt.sign(authHeader, "", {expiresIn: 1}, (logout, err) => {
        if(logout){
            res.send({msg: 'User logout'});
        }else{
            res.send({msg: 'Error'});
        }
    })
}

module.exports = {
    userLoginCreate,
    userAuthLogin,
    userAuthLogout,
    userProtect
}