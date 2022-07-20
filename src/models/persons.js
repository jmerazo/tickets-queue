const connection = require('../db/con_db');

 const getPersonsModel = async function(result) {
    await connection.query('SELECT * FROM persons', (error, persons) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, persons);
		}
	});
}
 
const getPersonById = async function(id, result){
	await connection.query(`SELECT * FROM persons WHERE id = ${id}`, (error, person) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, person);
		}
	});
}

const createPersonModel = async (userData,result) => {
	await connection.query('INSERT INTO persons SET ?', userData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
		}
	});
}
 
const updatePersonModel = async (id, userData, result) => {
	await connection.query(`UPDATE persons SET ? WHERE id = ${id}`, userData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
const deletePersonModel = async (id, result) => {
	await connection.query(`DELETE FROM persons WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

module.exports = {
    getPersonsModel,
    getPersonById,
    createPersonModel,
    updatePersonModel,
    deletePersonModel
};