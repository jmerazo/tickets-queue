const personsModel = require('../models/persons');

const getPersonsController = async (req, res, next) => {
    await personsModel.getPersonsModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getPersonByIdController = async (req, res, next) => {
    const id = req.params.id;
    await personsModel.getPersonById(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const getIdController = async (req, res, next) => {
    await personsModel.getId((err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const getPersonByDocumentController = async (req, res, next) => {
    const nd = req.params.nd;
    await personsModel.getPersonByDocument(nd, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const createPersonController = async (req, res, next) => {

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
        city_id : req.body.city_id,
        department_id : req.body.department_id
    }

    await personsModel.createPersonModel(userData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updatePersonController = async (req, res, next) => {
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
        city_id : req.body.city_id,
        department_id : req.body.department_id
    }
    
    const uid = req.params.id;
    await personsModel.updatePersonModel(uid, userData, (err, data) => {
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

const deletePersonController = async (req, res, next) => {
    const uid = req.params.id
    await personsModel.deletePersonModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting User with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

module.exports = {
    getPersonsController,
    getPersonByIdController,
    createPersonController,
    updatePersonController,
    deletePersonController,
    getPersonByDocumentController,
    getIdController
}