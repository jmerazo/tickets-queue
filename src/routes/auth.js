const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

// Authentication
authRouter.post('/user/auth/create', authController.userLoginCreate);
authRouter.post('/user/auth', authController.userAuthLogin);
authRouter.get('/user/login', auth);
authRouter.put('/user/logout', authController.userAuthLogout);

module.exports = authRouter;