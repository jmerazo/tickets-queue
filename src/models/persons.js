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

const getPersonByDocument = async function(nd, result){
	await connection.query(`SELECT p.id AS pid, p.document_type AS pdt, document_number AS pdn, p.names, p.last_names, p.phone, p.email, p.city_id AS pci, c.name AS cityname, p.department_id AS pdi, d.name AS depname FROM persons p INNER JOIN departments d ON p.department_id = d.code INNER JOIN cities c ON p.city_id = c.id WHERE document_number = ${nd}`, (error, person) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, person);
		}
	});
}

const getId = async function(result){
	await connection.query(`SELECT id FROM persons ORDER BY ID DESC LIMIT 1`, (error, id) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, id);
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
    deletePersonModel,
	getPersonByDocument,
	getId
};