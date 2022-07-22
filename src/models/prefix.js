const connection = require('../db/con_db');

const getCodeDepModel = async (id, result) => {
    await connection.query(`SELECT code FROM dependences WHERE id = ${id}`, (error, code) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, code);
		}
	});
}

const getCodeSubdModel = async (id, result) => {
    await connection.query(`SELECT code FROM subdependencies WHERE id = ${id}`, (error, codes) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, codes);
		}
	});
    
}

const getCountModel = async (result) => {
    await connection.query("SELECT count FROM tickets ORDER BY ID DESC LIMIT 1", (error, count) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, count);
		}
	});   
}

module.exports = {
    getCodeDepModel,
    getCodeSubdModel,
    getCountModel
}