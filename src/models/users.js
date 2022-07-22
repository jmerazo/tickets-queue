const connection = require('../db/con_db');

//List users all
 const getUsersModel = async function(result) {
    await connection.query('SELECT * FROM users', (error, users) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, users);
		}
	});
}
 
//List user by Id
const getUserById = async function(id, result){
	await connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, user) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, user);
		}
	});
}

const getUserByDIDModel = async function(sdid, result){
	await connection.query(`SELECT id, names, last_names, dependence_id, subdependence_id, status FROM users WHERE subdependence_id = ${sdid} AND status = 1`, (error, users) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, users);
		}
	});
}

//Add new user
const createUserModel = async (userData,result) => {
	await connection.query('INSERT INTO users SET ?', userData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
		}
	});
}
 
//Update user
const updateUserModel = async (id, userData, result) => {
	await connection.query(`UPDATE users SET ? WHERE id = ${id}`, userData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
//Delete user by Id
const deleteUserModel = async (id, result) => {
	await connection.query(`DELETE FROM users WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

module.exports = {
    getUsersModel,
    getUserById,
	getUserByDIDModel,
    createUserModel,
    updateUserModel,
    deleteUserModel
};