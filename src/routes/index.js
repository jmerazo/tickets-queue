const { Router, response } = require('express');
const router = Router();
const usersController = require('../controllers/users')

// Route information to connect API
router.get('/', function(req, res){res.status(200).json({ message: 'Connect to our API'})});
router.get('/users', usersController.getUsersController);
router.get('/user/search/:id', usersController.getUserByIdController);
router.post('/user/create', usersController.createUsersController);
router.put('/user/update/:id', usersController.updateUserController);
router.delete('/user/delete/:id', usersController.deleteUserController);

// Route upload file and send email
router.post('/tickets', async(req, res) => {
 
});

module.exports = router;