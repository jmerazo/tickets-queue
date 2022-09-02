const connection = require('../db/con_db');

 const getTicketsModel = async function(result) {
    await connection.query('SELECT * FROM tickets', (error, persons) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, persons);
		}
	});
}
 
const getTicketByIdModel = async function(id, result){
	await connection.query(`SELECT * FROM tickets WHERE id = ${id}`, (error, person) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, person);
		}
	});
}

const getTicketsByUIdModel = async function(id, result){
	await connection.query(`SELECT * FROM tickets INNER JOIN persons ON tickets.id = persons.id WHERE user_id = ${id}`, (error, tickets) =>{
		if(error){
			return result(error, null);
		}else{
			return result(null, tickets);
		}
	});
}

const createTicketModel = async (ticketData,result) => {
	await connection.query('INSERT INTO tickets SET ?', ticketData, (error, results) => {
		if(error){			
			return result(error, null);
		}else{
			//devolvemos el id del usuario insertado
			return result(null, results.id);
		}
	});
}
 
const updateTicketModel = async (id, ticketData, result) => {
	await connection.query(`UPDATE tickets SET ? WHERE id = ${id}`, ticketData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}
 
const deleteTicketModel = async (id, result) => {
	await connection.query(`DELETE FROM tickets WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

module.exports = {
    getTicketsModel,
    getTicketByIdModel,
    createTicketModel,
    updateTicketModel,
    deleteTicketModel,
	getTicketsByUIdModel
};