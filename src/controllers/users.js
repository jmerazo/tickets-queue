const usersModel = require('../models/users');

const getUsersController = function(req, res, next){
    usersModel.getUsersModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getUserByIdController = async (req, res, next) => {
    const id = req.params.id;
    usersModel.getUserById(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const getUserByDIDController = async (req, res, next) => {
    const id = req.params.id;
    usersModel.getUserByDIDModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const getUserByEmailController = async (req, res, next) => {
    const email = req.params.email;
    usersModel.getUserByEmailModel(email, (err, data) => {
        if(err){
            res.status(500).json({message:'Error database'})
        }else{
            res.status(200).json(data)
        }
    })
}

const createUsersController = async (req, res, next) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const userData = {
        document_type : req.body.document_type,
        document_number : req.body.document_number,
        names : req.body.names,
        last_names : req.body.last_names,
        phone : req.body.phone,
        email : req.body.email,
        dependence_id : req.body.dependence_id,
        subdependence_id : req.body.subdependence_id
    }

    await usersModel.createUserModel(userData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updateUserController = async (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const userData = {
        document_type : req.body.document_type,
        document_number : req.body.document_number,
        names : req.body.names,
        last_names : req.body.last_names,
        phone : req.body.phone,
        email : req.body.email,
        dependence_id : req.body.dependence_id,
        subdependence_id : req.body.subdependence_id
    }
    
    const uid = req.params.id;
    await usersModel.updateUserModel(uid, userData, (err, data) => {
        if(!uid){
            res.status(400).send({
                message: `User not found with id ${uid}`
            })
        }
        if(err){
            res.status(500).send({
                message: `Error updating User with id ${uid}`
            })
        }else res.send(data).status(200);   
    })
}

const deleteUserController = async (req, res, next) => {
    const uid = req.params.id
    await usersModel.deleteUserModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting User with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

module.exports = {
    getUsersController,
    getUserByIdController,
    getUserByDIDController,
    getUserByEmailController,
    createUsersController,
    updateUserController,
    deleteUserController
}