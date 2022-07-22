const prefixModel = require('../models/prefix');

const getCodeDepController = async (req, res, next) => {
    const id = req.params.id;
    await prefixModel.getCodeDepModel(id, function(err, data){
        res.status(200).json(data);
    });    
}

const getCodeSubdController = async (req, res, next) => {
    const id = req.params.id;
    await prefixModel.getCodeSubdModel(id, function(err, data){
        res.status(200).json(data);
    });    
}

const getCountController = async (req, res, next) => {
    await prefixModel.getCountModel(function(err, data){
        res.status(200).json(data);
    });    
}

module.exports = {
    getCodeDepController,
    getCodeSubdController,
    getCountController
}