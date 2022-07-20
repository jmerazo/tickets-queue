const ticketsModel = require('../models/tickets');

const getTicketsController = async (req, res, next) => {
    await ticketsModel.getTicketsModel(function(err, data){
        res.status(200).json(data);
    });    
}

const getTicketByIdController = async (req, res, next) => {
    const id = req.params.id;
    await ticketsModel.getTicketByIdModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const createTicketController = async (req, res, next) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    
    const ticketData = {
        date : req.body.date,
        time : req.body.time,
        prefix : req.body.prefix,
        dependence_id : req.body.dependence_id,
        user_id : req.body.user_id,
        management_id : req.body.management_id,
        person_id : req.body.person_id,
        subject_id : req.body.subject_id,
        description : req.body.description,
        status: req.body.status
    }

    console.log(ticketData);

    await ticketsModel.createTicketModel(ticketData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updateTicketController = async (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const ticketData = {
        date : req.body.date,
        time : req.body.time,
        prefix : req.body.prefix,
        dependence_id : req.body.dependence_id,
        user_id : req.body.user_id,
        management_id : req.body.management_id,
        person_id : req.body.person_id,
        subject_id : req.body.subject_id,
        description : req.body.description,
        status: req.body.status
    }
    
    const uid = req.params.id;
    await ticketsModel.updateTicketModel(uid, ticketData, (err, data) => {
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

const deleteTicketController = async (req, res, next) => {
    const uid = req.params.id
    await ticketsModel.deleteTicketModel(uid, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error deleting ticket with id ${uid}`
            })
        }else res.send(data).status(200);   
    })  
}

module.exports = {
    getTicketsController,
    getTicketByIdController,
    createTicketController,
    updateTicketController,
    deleteTicketController
}