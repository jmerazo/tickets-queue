const connection = require('../db/con_db');

 const getSubjectsModel = async function(result) {
    await connection.query('SELECT * FROM subjects', (error, subjects) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, subjects);
		}
	});
}
 
const getSubjectByIdModel = async function(id, result){
	await connection.query(`SELECT * FROM subjects WHERE id = ${id}`, (error, subject) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, subject);
		}
	});
}

const createSubjectModel = async (subData,result) => {
	await connection.query('INSERT INTO subjects SET ?', subData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			return result(null, results.id);
		}
	});
}
 
const updateSubjectModel = async (id, subData, result) => {
	await connection.query(`UPDATE subjects SET ? WHERE id = ${id}`, subData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
const deleteSubjectModel = async (id, result) => {
	await connection.query(`DELETE FROM subjects WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

module.exports = {
    getSubjectsModel,
    getSubjectByIdModel,
    createSubjectModel,
    updateSubjectModel,
    deleteSubjectModel
};