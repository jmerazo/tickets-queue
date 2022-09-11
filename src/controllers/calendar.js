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
    updateStatusTimeController
}