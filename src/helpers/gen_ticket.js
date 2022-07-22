const connection = require('../db/con_db');
const ticketsController = require('../controllers/tickets');

const numTicket = async (idd, ids) => {

    const prefix = "";

    const cd = await connection.query(`SELECT code FROM dependences WHERE id = ${idd}`);
    const cidd = cd;
    const cs = await connection.query(`SELECT code FROM subdependences WHERE id = ${ids}`);
    const cids = cs;

    prefix = cidd+"-"+cids+"-";
}

module.exports = {
    numTicket
}