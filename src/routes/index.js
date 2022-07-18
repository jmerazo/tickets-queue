const { Router, response } = require('express');
const router = Router();
const usersController = require('../controllers/users')
const areasController = require('../controllers/areas')

// Route information to connect API
router.get('/', function(req, res){res.status(200).json({ message: 'Connect to our API'})});

// Routes Users
router.get('/users', usersController.getUsersController);
router.get('/user/search/:id', usersController.getUserByIdController);
router.post('/user/create', usersController.createUsersController);
router.put('/user/update/:id', usersController.updateUserController);
router.delete('/user/delete/:id', usersController.deleteUserController);

// Routes Areas
router.get('/dependences', areasController.getDependencesController);
router.get('/dependence/search/:id', areasController.getDependenceByIdController);
router.post('/dependence/create', areasController.createDependenceController);
router.put('/dependence/update/:id', areasController.updateDependenceController);
router.delete('/dependence/delete/:id', areasController.deleteDependenceController);

// Route upload file and send email
router.post('/tickets', async(req, res) => {
 
});

module.exports = router;