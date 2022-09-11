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
        count : req.body.count[0,0].count+1,
        dependence_id : req.body.dependence_id,
        subdependence_id : req.body.dependence_id,
        user_id : req.body.user_id,
        person_id: req.body.person_id,
        subject_id : req.body.subject_id,        
        description : req.body.description
    }

    await ticketsModel.createTicketModel(ticketData, (error, data) => {
        if(error){
            res.status(500).json({message:'Error'})
        }else{
            res.send(data).status(200);
        }
    })
}