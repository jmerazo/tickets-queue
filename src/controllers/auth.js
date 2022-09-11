const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userAuthModel = require('../models/auth');
const usersModel = require('../models/users');

const userLoginCreate = async (req, res) => {
    try {        
        var {user_id, username, password, rol_id} = req.body;
        console.log("Username: ",username);
        console.log("Password: ",password);
        console.log("user_id: ",user_id);
        console.log("rol_id: ",rol_id.id);
        
        if(!username || !password || !user_id || !rol_id){
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
                        password: encryptedPassword,
                        user_id : req.body.user_id,
                        rol_id : req.body.rol_id.id
                    }

                    const rol = req.body.rol_id.id

                    if(rol != 0 || rol != 1){
                        for(i=1;i<44;i++){
                            var user_id = userAuthData.user_id;
                            var time_id = i;

                            const timeData = {
                                user_id : user_id,
                                time_id : time_id
                            }
    
                            console.log('User times register: ', timeData)
                            usersModel.timeUserModel(timeData, (error, data) => {
                                if(error){
                                    res.status(500).json({message:'Error'})
                                }else{
                                    res.send(data).status(200);
                                }
                            })
                        }
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
        
                            res.send(data).status(201);
                        }
                    });                    
                }
            }
        });       
    } catch (err) {
        console.log(err);        
    }
}

const updatePassAuthLogin = async (req, res) => {
    try {        
        var {password} = req.body;
        console.log("Password: ",password);

        if(!password){
            res.status(400).send('All input is required');
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const userAuthData = {
            password: encryptedPassword
        }

        console.log("Password encrypted: ", userAuthData.password);
        const uid = req.params.id;
        console.log("Id User: ", uid)
        userAuthModel.updatePassAuthModel(uid, userAuthData, (err, login) => {
            if(!uid){
                res.status(400).send({
                    message: `User not found with id ${uid}`
                })
            }
            if(err){
                res.status(500).send({
                    message: `Error updating User with id ${uid}`
                })
            }else res.send(login).status(200);                            
        });       
    } catch (err) {
        console.log(err);        
    }
}

const updateStatusController = async (req, res) => {
    try {        
        var {status} = req.body;
        console.log("Status: ",status)       
        if(!status) res.status(400).send('All input is required')
        const uid = req.params.id;
        console.log("UID: ", uid)

        //const dataStatus = {
        //    status : req.body
        //}

        status = req.body;

        userAuthModel.updateStatusModel(uid, status, (err, stat) => {
            if(!uid){
                res.status(400).send({
                    message: `User not found with id ${uid}`
                })
            }
            if(err){
                res.status(500).send({
                    message: `Error updating User with id ${uid}`
                })
            }else res.send(stat).status(200);                            
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
                    password : user[0,0].password,
                    user_id : user[0,0].user_id,
                    rol_id : user[0,0].rol_id,
                    status : user[0,0].status
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
    userProtect,
    updatePassAuthLogin,
    updateStatusController
}