const rolesModel = require('../models/roles');

const getRolesController = function(req, res, next){
    rolesModel.getRolesModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getRolByIdController = async (req, res, next) => {
    const id = req.params.id;
    rolesModel.getRolById(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const createRolController = async (req, res, next) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const rolData = {
        name : req.body.name,
    }

    await rolesModel.createRolModel(rolData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updateRolController = async (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const rolData = {
        name : req.body.name,
    }
    
    const uid = req.params.id;
    await rolesModel.updateRolModel(uid, rolData, (err, data) => {
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

const deleteRolController = async (req, res, next) => {
    const uid = req.params.id
    await rolesModel.deleteRolModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting User with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

module.exports = {
    getRolesController,
    getRolByIdController,
    createRolController,
    updateRolController,
    deleteRolController
}