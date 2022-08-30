const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

// Authentication
authRouter.post('/user/auth/create/:id', authController.userLoginCreate);
authRouter.post('/user/auth', authController.userAuthLogin);
authRouter.get('/user/login', auth, authController.userProtect);
authRouter.put('/user/logout', authController.userAuthLogout);
authRouter.put('/user/auth/password/update/:id', authController.updatePassAuthLogin);
authRouter.put('/user/status/update/:id', authController.updateStatusController);

module.exports = authRouter;