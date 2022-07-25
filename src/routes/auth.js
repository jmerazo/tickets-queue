const { Router } = require('express');
const router = Router();
const authController = require('../controllers/auth');

// Authentication
router.get('/user/auth/create', authController.userAuthCreate);
router.get('/user/auth', authController.userAuthLogin);

module.exports = authRouter;