const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

// Authentication
authRouter.post('/user/auth/create', authController.userLoginCreate);
authRouter.post('/user/auth', auth, authController.userAuthLogin);
authRouter.get('/user/login', auth);

module.exports = authRouter;