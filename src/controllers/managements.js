const managementsModel = require('../models/managements');

const getManagementsController = async (req, res, next) => {
    await managementsModel.getManagementsModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getManagementByIdController = async (req, res, next) => {
    const id = req.params.id;
    await managementsModel.getManagementById(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const createManagementController = async (req, res, next) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    
    const userData = {
        state: req.body.state
    }

    await managementsModel.createManagementModel(userData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updateManagementController = async (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const userData = {
        state: req.body.state
    }
    
    const uid = req.params.id;
    await managementsModel.updateManagementModel(uid, userData, (err, data) => {
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

const deleteManagementController = async (req, res, next) => {
    const uid = req.params.id
    await managementsModel.deleteManagementModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting User with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

module.exports = {
    getManagementsController,
    getManagementByIdController,
    createManagementController,
    updateManagementController,
    deleteManagementController
}