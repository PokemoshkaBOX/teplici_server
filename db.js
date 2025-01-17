const {Sequelize} =require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, //Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, //Пароль
    {
        dialect: 'mssql',
        host: process.env.DB_HOST, // хост
        port: process.env.DB_PORT, // порт

    }
)