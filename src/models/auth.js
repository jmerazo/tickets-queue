const connection = require('../db/con_db');

//Add new user
const createUserAuthModel = async (userData,result) => {
	await connection.query('INSERT INTO login SET ?', userData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			return result(null, results.id);
		}
	});
}

const userAuthByEmail = async function(username, result){
	await connection.query(`SELECT * FROM login WHERE username = ${username}`, (error, validate) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, validate);
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

module.exports = {
    createUserAuthModel,
    updateUserAuthModel,
    deleteUserAuthModel,
    userAuthByEmail
};