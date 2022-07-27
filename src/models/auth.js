const connection = require('../db/con_db');

//Add new user
const createUserAuthModel = async (userData, result) => {
	await connection.query('INSERT INTO login SET ?', userData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			console.log("User data model: ",results.insertId);
			return result(null, results.insertId);
		}
	});
}

//Update user
const updateUserAuthModel = async (id, userData, result) => {
	await connection.query(`UPDATE login SET ? WHERE id = ${id}`, userData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
//Delete user by Id
const deleteUserAuthModel = async (id, result) => {
	await connection.query(`DELETE FROM login WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

const userAuthByEmail = (email) => {
	console.log("Desde model: ", email)
	connection.query(`SELECT * FROM login WHERE username = "${email}" ORDER BY ID DESC LIMIT 1`, (error, validate) =>{
		if(error){
			return error, null;
		}else{
			console.log("Rta model: ", validate[0,0].username);
			return validate[0,0].username, null;
		}
	});
}

module.exports = {
    createUserAuthModel,
    updateUserAuthModel,
    deleteUserAuthModel,
	userAuthByEmail
};