const areasModel = require('../models/areas');

// ======================= DEPENDENCES ================================ //
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
                message: `Error updating dependence with id ${uid}`
            })
        }else res.send(data).status(200);   
    })
}

const deleteDependenceController = async (req, res, next) => {
    const uid = req.params.id
    await areasModel.deleteDependenceModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting dependence with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

// ======================= SUBDEPENDENCES ================================ //

const getSubdependencesController = function(req, res, next){
    areasModel.getSubdependenciesModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getSubdependenceByIdController = async (req, res, next) => {
    const id = req.params.id;
    areasModel.getSubdependenceByIdModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const getSubdependenceByDIDController = async (req, res, next) => {
    const id = req.params.id;
    areasModel.getSubdependenceByDIDModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Database error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const createSubdependenceController = async (req, res, next) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const depData = {
        name : req.body.name,
        dependence_id : req.body.dependence_id
    }

    await areasModel.createSubdependenceModel(depData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updateSubdependenceController = async (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const depData = {
        name : req.body.name,
        dependence_id : req.body.dependence_id
    }
    
    const uid = req.params.id;
    await areasModel.updateSubdependenceModel(uid, depData, (err, data) => {
        if(!uid){
            res.status(400).send({
                message: `User not found with id ${uid}`
            })
        }
        if(err){
            res.status(500).send({
                message: `Error updating subdependence with id ${uid}`
            })
        }else res.send(data).status(200);   
    })
}

const deleteSubdependenceController = async (req, res, next) => {
    const uid = req.params.id
    await areasModel.deleteSubdependenceModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting subdependence with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

module.exports = {
    getDependencesController,
    getDependenceByIdController,
    createDependenceController,
    updateDependenceController,
    deleteDependenceController,
    getSubdependencesController,
    getSubdependenceByIdController,
    getSubdependenceByDIDController,
    createSubdependenceController,
    updateSubdependenceController,
    deleteSubdependenceController
}