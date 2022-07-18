const connection = require('../db/con_db');

// ======================= DEPENDENCES ================================ //

const getDependencesModel = async function(result) {
    await connection.query('SELECT * FROM dependences', (error, dependences) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, dependences);
		}
	});
}
 
const getDependenceByIdModel = async function(id, result){
	await connection.query(`SELECT * FROM dependences WHERE id = ${id}`, (error, dependence) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, dependence);
		}
	});
}

const createDependenceModel = async (depData,result) => {
	await connection.query('INSERT INTO dependences SET ?', depData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
		}
	});
}
 
const updateDependenceModel = async (id, depData, result) => {
	await connection.query(`UPDATE dependences SET ? WHERE id = ${id}`, depData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
const deleteDependenceModel = async (id, result) => {
	await connection.query(`DELETE FROM dependences WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

// ======================= SUBDEPENDENCES ================================ //
const getSubdependencesModel = async function(result) {
    await connection.query('SELECT * FROM subdependences', (error, dependences) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, dependences);
		}
	});
}
 
const getSubdependenceByIdModel = async function(id, result){
	await connection.query(`SELECT * FROM subdependences WHERE id = ${id}`, (error, dependence) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, dependence);
		}
	});
}

const createSubdependenceModel = async (depData,result) => {
	await connection.query('INSERT INTO subdependences SET ?', depData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
		}
	});
}
 
const updateSubdependenceModel = async (id, depData, result) => {
	await connection.query(`UPDATE subdependences SET ? WHERE id = ${id}`, depData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
const deleteSubdependenceModel = async (id, result) => {
	await connection.query(`DELETE FROM subdependences WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

module.exports = {
    getDependencesModel,
    getDependenceByIdModel,
    createDependenceModel,
    updateDependenceModel,
    deleteDependenceModel,
    getSubdependencesModel,
    getSubdependenceByIdModel,
    createSubdependenceModel,
    updateSubdependenceModel,
    deleteSubdependenceModel
};