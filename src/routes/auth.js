const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

// Authentication
authRouter.post('/user/auth/create', authController.userLoginCreate);
authRouter.get('/user/auth', auth, authController.userAuthLogin);

module.exports = authRouter;