const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateEmailController = require('../controllers/users')

const loginCreate = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        
        if(!username || !password){
            res.status(400).send('All input is required');
        }

        const validateEmail = await validateEmailController.getUserByEmailController(username);

        if(validateEmail){
            return res.status(409).send('User already exist. Please login');
        }

        encryptedPassword = await bcr
    } catch (error) {
        
    }

}

const loginAuth = async () => {

}

module.exports = {
    loginCreate,
    loginAuth
}