const connection = require('../db/con_db');

const getDepartmentsModel = async function(result) {
    await connection.query('SELECT * FROM departments', (error, departments) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, departments);
		}
	});
}
 
const getDepartmentByIdModel = async function(id, result){
	await connection.query(`SELECT * FROM departments WHERE id = ${id}`, (error, department) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, department);
		}
	});
}

// ======================================================

const getCitiesModel = async function(result) {
    await connection.query('SELECT * FROM cities', (error, cities) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, cities);
		}
	});
}
 
const getCityByIdModel = async function(id, result){
	await connection.query(`SELECT * FROM cities WHERE id = ${id}`, (error, citie) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, citie);
		}
	});
}

const getCityByDIDModel = async function(id, result){
	await connection.query(`SELECT * FROM cities WHERE department_id = ${id}`, (error, citid) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, citid);
		}
	});
}
module.exports = {
    getDepartmentsModel,
    getDepartmentByIdModel,
    getCitiesModel,
    getCityByIdModel,
	getCityByDIDModel
}