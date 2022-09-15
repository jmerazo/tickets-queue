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

//Add new days
const createUsersDaysModel = async (id, days, result) => {
	console.log("ID Calendar model: ", id);
	console.log("Days calendar model: ", days);
	await connection.query(`UPDATE user_days SET days = JSON_MERGE_PATCH(days, ${days})) WHERE user_id = ${id}`, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
		}
	});
}

//Add new user_id
const createUserDaysModel = async (id,result) => {
	console.log("user_id model calendar: ", id)
	await connection.query(`INSERT INTO user_days SET user_id = ${id}`, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
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
    updateStatusTimeModel,
	createUsersDaysModel,
	createUserDaysModel
}