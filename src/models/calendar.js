const connection = require('../db/con_db');

//List users all
const getCalendarUserModel = async function(id, result){
	await connection.query(`SELECT ut.id, ut.user_id, ut.time_id, ut.status, t.times FROM user_times ut INNER JOIN times t ON ut.time_id = t.id WHERE user_id = ${id}`, (error, calendar) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, calendar);
		}
	});
}

//Update status user
const updateStatusTimeModel = async (id, status, result) => {
	await connection.query(`UPDATE user_times SET status = ${status.status} WHERE id = ${id}`, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id);
		}
	})
}

module.exports = {
    getCalendarUserModel,
    updateStatusTimeModel
}