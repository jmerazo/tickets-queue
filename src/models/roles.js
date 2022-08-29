const connection = require('../db/con_db');

//List users all
 const getRolesModel = async function(result) {
    await connection.query('SELECT * FROM roles', (error, roles) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, roles);
		}
	});
}
 
//List user by Id
const getRolById = async function(id, result){
	await connection.query(`SELECT * FROM roles WHERE id = ${id}`, (error, rol) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, rol);
		}
	});
}

//Add new user
const createRolModel = async (rolData, result) => {
	await connection.query('INSERT INTO users SET ?', rolData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
		}
	});
}
 
//Update user
const updateRolModel = async (id, rolData, result) => {
	await connection.query(`UPDATE users SET ? WHERE id = ${id}`, rolData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
//Delete user by Id
const deleteRolModel = async (id, result) => {
	await connection.query(`DELETE FROM users WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

module.exports = {
    getRolesModel,
    getRolById,
	createRolModel,
	updateRolModel,
    deleteRolModel
};