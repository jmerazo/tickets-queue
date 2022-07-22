const ticketsModel = require('../models/tickets');
//const prefixController = require('./prefix');
const prefixModel = require('../models/prefix');
const connection = require('../db/con_db');

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
    console.log("Date: ",req.body.date);
    console.log("Time: ",req.body.time);
    console.log("Prefix: ", req.body.prefix);
    console.log("Count: ", req.body.count);
    console.log("Dependence: ",req.body.dependence_id);
    console.log("Subdependence: ",req.body.subdependence_id);
    console.log("User: ",req.body.user_id);
    console.log("Subject: ",req.body.subject_id);
    console.log("Description: ",req.body.description);

    //const num = req.body.count;
    //console.log(num[0,0].count);

    const ticketData = {
        date : req.body.date,
        time : req.body.time,
        prefix : req.body.prefix,
        count : req.body.count[0,0].count+1,
        dependence_id : req.body.dependence_id,
        subdependence_id : req.body.dependence_id,
        user_id : req.body.user_id,
        subject_id : req.body.subject_id,
        description : req.body.description
    }
    console.log("Form");
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