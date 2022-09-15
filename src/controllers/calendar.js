const calendarModel = require('../models/calendar');

const getCalendarUserController = async (req, res, next) => {
    const id = req.params.id;
    calendarModel.getCalendarUserModel(id, (err, data) => {
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.status(200).json(data);
        }
    });
}

const createUserDaysController = async (req, res, next) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    var days = []
    var daystoint = req.body.days;
    for(i=0;i<daystoint.length;i++){
        days[i] = parseInt(daystoint[i])
    }
    console.log(days)   

    //const userDays = {
    //    user_id : req.body.user_id,
    //    days : JSON.stringify(days)
    //}
    var user_id = req.body.user_id;
    var days = JSON.stringify(days);

    //console.log("User data: ", userDays);

    await calendarModel.createUsersDaysModel(user_id, days, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}

const updateStatusTimeController = async (req, res) => {
    try {        
        var {status} = req.body;     
        if(!status) res.status(400).send('All input is required')
        const tid = req.params.id;

        status = req.body;

        calendarModel.updateStatusTimeModel(tid, status, (err, stat) => {
            if(!tid){
                res.status(400).send({
                    message: `User not found with id ${tid}`
                })
            }
            if(err){
                res.status(500).send({
                    message: `Error updating User with id ${tid}`
                })
            }else res.send(stat).status(200);                            
        });       
    } catch (err) {
        console.log(err);        
    }
}

module.exports = {
    getCalendarUserController,
    updateStatusTimeController,
    createUserDaysController
}