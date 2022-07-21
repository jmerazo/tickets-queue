const locationsModel = require('../models/locations');

const getDepartmentsController = async (req, res, next) => {
    await locationsModel.getDepartmentsModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getDepartmentByIdController = async (req, res, next) => {
    const id = req.params.id;
    await locationsModel.getDepartmentByIdModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

// ==================================================

const getCitiesController = async (req, res, next) => {
    await locationsModel.getCitiesModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getCityByIdController = async (req, res, next) => {
    const id = req.params.id;
    await locationsModel.getCityByIdModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const getCityByDIDController = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    await locationsModel.getCityByDIDModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

module.exports = {
    getDepartmentsController,
    getDepartmentByIdController,
    getCitiesController,
    getCityByIdController,
    getCityByDIDController
}