const areasModel = require('../models/areas');

const getDependencesController = function(req, res, next){
    areasModel.getDependencesModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getDependenceByIdController = async (req, res, next) => {
    const id = req.params.id;
    areasModel.getDependenceByIdModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const createDependenceController = async (req, res, next) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const depData = {
        name : req.body.name
    }

    await areasModel.createDependenceModel(depData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updateDependenceController = async (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const depData = {
        name : req.body.name
    }
    
    const uid = req.params.id;
    await areasModel.updateDependenceModel(uid, depData, (err, data) => {
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

const deleteDependenceController = async (req, res, next) => {
    const uid = req.params.id
    await areasModel.deleteDependenceModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting User with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

module.exports = {
    getDependencesController,
    getDependenceByIdController,
    createDependenceController,
    updateDependenceController,
    deleteDependenceController
}