const connection = require('../db/con_db');

 const getManagementsModel = async function(result) {
    await connection.query('SELECT * FROM managements', (error, managements) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, managements);
		}
	});
}
 
const getManagementById = async function(id, result){
	await connection.query(`SELECT * FROM managements WHERE id = ${id}`, (error, management) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, management);
		}
	});
}

const createManagementModel = async (managData,result) => {
	await connection.query('INSERT INTO managements SET ?', managData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
		}
	});
}
 
const updateManagementModel = async (id, managData, result) => {
	await connection.query(`UPDATE managements SET ? WHERE id = ${id}`, managData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
const deleteManagementModel = async (id, result) => {
	await connection.query(`DELETE FROM managements WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

module.exports = {
    getManagementsModel,
    getManagementById,
    createManagementModel,
    updateManagementModel,
    deleteManagementModel
};