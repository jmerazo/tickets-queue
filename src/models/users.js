const connection = require('../db/con_db');

//List users all
 const getUsersModel = async function(result) {
    await connection.query('SELECT u.id, u.document_type, u.document_number, u.names, u.last_names, u.phone, u.email, d.name AS dname, s.name AS sname, l.status FROM users u INNER JOIN dependences d ON u.dependence_id = d.id INNER JOIN subdependencies s ON u.subdependence_id = s.id INNER JOIN login l ON u.id = l.user_id', (error, users) => {
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

const getUserByEmailModel = async (email, result) => {
	await connection.query(`SELECT email FROM users WHERE email = ${email}`, (error, validation) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, validation);
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
	getUserByEmailModel,
    createUserModel,
    updateUserModel,
    deleteUserModel
};