const Sequelize = require('sequelize');

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql',
    port: process.env.DB_PORT
})

sequelize.authenticate()
    .then(() => {
        console.log('Connect database sequelize')
    })
    .catch(err => {
        console.log('Error connect database')
    })


const finByEmail = sequelize.define('login',{
    username: Sequelize.STRING(50),
    password: Sequelize.STRING(250),
    token: Sequelize.STRING(250),
    user_id: Sequelize.INTEGER,
    rol_id: Sequelize.INTEGER
}); 

module.exports = {
    finByEmail
}