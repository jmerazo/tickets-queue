const { Router, response } = require('express');
const router = Router();
const usersController = require('../controllers/users');
const areasController = require('../controllers/areas');
const personsController = require('../controllers/persons');
const managementsController = require('../controllers/managements');
const ticketsController = require('../controllers/tickets');
const subjectsController = require('../controllers/subjects');

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
// ------------------------------------------------------------------------
router.get('/subdependencies', areasController.getSubdependencesController);
router.get('/subdependence/search/:id', areasController.getSubdependenceByIdController);
router.post('/subdependence/create', areasController.createSubdependenceController);
router.put('/subdependence/update/:id', areasController.updateSubdependenceController);
router.delete('/subdependence/delete/:id', areasController.deleteSubdependenceController);

// Routes Persons
router.get('/persons', personsController.getPersonsController);
router.get('/person/search/:id', personsController.getPersonByIdController);
router.post('/person/create', personsController.createPersonController);
router.put('/person/update/:id', personsController.updatePersonController);
router.delete('/person/delete/:id', personsController.deletePersonController);

// Routes Managements
router.get('/managements', managementsController.getManagementsController);
router.get('/management/search/:id', managementsController.getManagementByIdController);
router.post('/management/create', managementsController.createManagementController);
router.put('/management/update/:id', managementsController.updateManagementController);
router.delete('/management/delete/:id', managementsController.deleteManagementController);

// Route tickets
router.get('/tickets', ticketsController.getTicketsController);
router.get('/ticket/search/:id', ticketsController.getTicketByIdController);
router.post('/ticket/create', ticketsController.createTicketController);
router.put('/ticket/update/:id', ticketsController.updateTicketController);
router.delete('/ticket/delete/:id', ticketsController.deleteTicketController);

// Route subjects
router.get('/subjects', subjectsController.getSubjectsController);
router.get('/subject/search/:id', subjectsController.getSubjectByIdController);
router.post('/subject/create', subjectsController.createSubjectController);
router.put('/subject/update/:id', subjectsController.updateSubjectController);
router.delete('/subject/delete/:id', subjectsController.deleteSubjectController);

module.exports = router;