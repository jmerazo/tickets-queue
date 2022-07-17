const { Router, response } = require('express');
const router = Router();
var usersModel = require('../models/users');

// Route information to connect API
router.get('/', function(req, res){
    res.status(200).json({ message: 'Connect to our API'})
})

router.get('/users', function(req, res){
    usersModel.getUsers(function(err, data){
        response.status(200).json(data);
    });
});

// Route upload file and send email
router.post('/tickets', async(req, res) => {
 
});

module.exports = router;