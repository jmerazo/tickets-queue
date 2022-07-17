const connection = require('../db/con_db');

 
//Obtenemos todos los usuarios
 const getUsers = async (req, res) => {
    await connection.query('SELECT * FROM users', (error, rows) => {
			if(error){
				throw error;
			}else{
				callback(null, rows);
			}
		});
}
 
//Obtenemos un usuario por su id
const getUserById = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}
}

//Añadir un nuevo usuario
const insertUser = function(userData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO users SET ?', userData, function(error, result) 
		{
			if(error)
			{
				
				throw error;
			}
			else
			{
				//devolvemos el id del usuario insertado
				callback(null, result.insertId);
			}
		});
	}
}
 
//Actualizar un usuario
const updateUser = function(userData, callback)
{
	
	if(connection)
	{
		var sql = 'UPDATE users SET names = ' + connection.escape(userData.names)  +' WHERE id = ' + userData.id;
		connection.query(sql, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,{"mensaje":"Actualizado"});
			}
		});
	}
}
 
//Eliminar un usuario por su id
const deleteUser = function(id, callback)
{
	if(connection)
	{
		var sql = 'DELETE FROM users WHERE id = ' + connection.escape(id);
		connection.query(sql, function(error, result) 
			{
				if(error)
					{
						throw error;
					}
				else
					{
						callback(null,{"mensaje":"Borrado"});
					}
			});
	}
			
}

module.exports = {
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
};