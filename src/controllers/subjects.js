const subjectsModel = require('../models/subjects');

const getSubjectsController = async (req, res, next) => {
    await subjectsModel.getSubjectsModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getSubjectByIdController = async (req, res, next) => {
    const id = req.params.id;
    await subjectsModel.getSubjectByIdModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const createSubjectController = async (req, res, next) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    
    const subjectData = {
        subject : req.body.subject
    }

    await subjectsModel.createSubjectModel(subjectData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updateSubjectController = async (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const subjectData = {
        subject : req.body.subject
    }
    
    const uid = req.params.id;
    await subjectsModel.updateSubjectModel(uid, subjectData, (err, data) => {
        if(!uid){
            res.status(400).send({
                message: `User not found with id ${uid}`
            })
        }
        if(err){
            res.status(500).send({
                message: `Error updating ticket with id ${uid}`
            })
        }else res.send(data).status(200);   
    })
}

const deleteSubjectController = async (req, res, next) => {
    const uid = req.params.id
    await subjectsModel.deleteSubjectModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting ticket with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

module.exports = {
    getSubjectsController,
    getSubjectByIdController,
    createSubjectController,
    updateSubjectController,
    deleteSubjectController
}